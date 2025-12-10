/**
 * View-Based AI Query Generation Endpoint
 *
 * This endpoint uses the simplified llm_* views approach instead of
 * the fragment-based query composition. The LLM generates SQL directly
 * against pre-built database views.
 *
 * Benefits:
 * - Simpler SQL generation (no fragment assembly)
 * - Smaller prompt size
 * - More predictable results
 * - Leverages pre-optimized views
 */

import { NextResponse } from 'next/server';
import { createLLMClient } from '@/lib/llm-client';
import { auth, SessionUser } from '@/auth';
import { runQuery } from '@/lib/aeries';
import { buildViewSystemPrompt, buildCompactViewPrompt } from '@/lib/ai-query/view-prompt-builder';
import { ViewQueryBuilder } from '@/lib/ai-query/view-query-builder';

// School code mapping for context
const SCHOOL_NAMES: Record<string, string> = {
  '2': 'Garfield Elementary',
  '3': 'Jefferson Elementary',
  '4': 'Madison Elementary',
  '5': 'McKinley Elementary',
  '6': 'Monroe Elementary',
  '7': 'Roosevelt Elementary',
  '8': 'Washington Elementary',
  '9': 'Halkin Elementary',
  '11': 'Bancroft Middle School',
  '12': 'Muir Middle School',
  '15': 'Lincoln High School',
  '16': 'San Leandro High School',
  '60': 'SLVA Elementary',
  '61': 'SLVA Middle',
  '62': 'SLVA High',
};

export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as SessionUser;
    const activeSchool = user.activeSchool ?? -1;
    const allowedSchools = user.schools || [];

    // Deny access if no active school set
    if (activeSchool === -1 || (activeSchool === undefined && activeSchool !== 0)) {
      return NextResponse.json({
        error: 'No school access. Please select a school from the school picker.'
      }, { status: 403 });
    }

    // Get the prompt from request body
    const body = await request.json();
    const prompt = body.prompt || body.question; // Support both param names

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Determine which schools to filter by
    const schoolsToFilter: string[] = activeSchool === 0
      ? allowedSchools
      : [activeSchool.toString()];

    console.log(`[View AI Query] Processing: "${prompt}"`);
    console.log(`[View AI Query] User: ${user.email}`);
    console.log(`[View AI Query] Schools: ${schoolsToFilter.join(', ') || 'all'}`);

    // Create LLM client
    const llm = createLLMClient();

    // Build context-aware prompt
    // Add school context to help LLM understand the scope
    let contextPrompt = prompt;
    if (schoolsToFilter.length === 1) {
      const schoolName = SCHOOL_NAMES[schoolsToFilter[0]] || `School ${schoolsToFilter[0]}`;
      contextPrompt = `${prompt}\n\n(Note: Query is scoped to ${schoolName})`;
    } else if (schoolsToFilter.length > 1 && schoolsToFilter.length < 5) {
      const schoolNames = schoolsToFilter.map(s => SCHOOL_NAMES[s] || `School ${s}`).join(', ');
      contextPrompt = `${prompt}\n\n(Note: Query is scoped to: ${schoolNames})`;
    }

    // Use compact prompt for smaller models, full prompt for larger ones
    const useCompactPrompt = process.env.LLM_COMPACT_PROMPT === 'true';
    const systemPrompt = useCompactPrompt ? buildCompactViewPrompt() : buildViewSystemPrompt();

    // Call LLM to generate SQL
    console.log('[View AI Query] Calling LLM...');
    const llmResponse = await llm.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: contextPrompt }
    ]);

    console.log('[View AI Query] LLM response received');

    // Clean up the response (remove markdown code blocks, etc.)
    const builder = new ViewQueryBuilder();
    let sql = builder.cleanLlmResponse(llmResponse.content);

    console.log('[View AI Query] Cleaned SQL:', sql);

    // Validate the SQL
    const validation = builder.validate(sql);

    if (!validation.valid) {
      console.error('[View AI Query] Validation failed:', validation.errors);
      return NextResponse.json({
        success: false,
        error: 'Invalid SQL generated',
        details: validation.errors,
        sql: sql,
        raw: llmResponse.content
      }, { status: 400 });
    }

    // Log warnings if any
    if (validation.warnings.length > 0) {
      console.warn('[View AI Query] Warnings:', validation.warnings);
    }

    // Store original SQL before security injection
    const originalSql = sql;

    // Inject school security filter
    sql = builder.injectSecurityFilters(sql, schoolsToFilter);

    console.log('[View AI Query] Secured SQL:', sql);

    // Optionally execute the query
    let data = null;
    let rowCount = 0;
    let executeError = null;

    if (body.execute !== false) {
      try {
        console.log('[View AI Query] Executing query...');
        data = await runQuery(sql);
        rowCount = data?.length || 0;
        console.log(`[View AI Query] Query returned ${rowCount} rows`);
      } catch (execError: any) {
        console.error('[View AI Query] Execution error:', execError);
        executeError = execError.message || 'Query execution failed';
      }
    }

    const duration = Date.now() - startTime;

    // Return success response
    return NextResponse.json({
      success: true,
      sql: sql,
      originalSql: originalSql,
      formattedSql: builder.formatSql(sql),
      data: data,
      rowCount: rowCount,
      executeError: executeError,
      metadata: {
        mode: 'view',
        referencedViews: validation.referencedViews,
        warnings: validation.warnings,
        schoolScope: activeSchool === 0
          ? (allowedSchools.length > 0 ? `District (${allowedSchools.length} schools)` : 'District (all schools)')
          : SCHOOL_NAMES[activeSchool.toString()] || `School ${activeSchool}`,
        durationMs: duration,
        llmUsage: llmResponse.usage
      }
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[View AI Query] Error:', error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Query generation failed',
      durationMs: duration
    }, { status: 500 });
  }
}
