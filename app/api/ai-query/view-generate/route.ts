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
import { createLLMClient, LLMClient } from '@/lib/llm-client';
import { auth, SessionUser } from '@/auth';
import { runQuery } from '@/lib/aeries';
import { buildViewSystemPrompt, buildCompactViewPrompt } from '@/lib/ai-query/view-prompt-builder';
import { ViewQueryBuilder } from '@/lib/ai-query/view-query-builder';
import { ValidationResult } from '@/lib/ai-query/sql-validator';

// Maximum number of regeneration attempts when validation fails
const MAX_REGENERATION_ATTEMPTS = 2;

// Tracks each query generation attempt for debugging
interface QueryAttempt {
  attemptNumber: number;
  sql: string;
  rawResponse: string;
  validation: ValidationResult;
  correctionPrompt?: string;
}

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

/**
 * Build a correction prompt to help the LLM fix validation errors
 */
function buildCorrectionPrompt(originalPrompt: string, failedSql: string, errors: string[]): string {
  return `Your previous SQL query had validation errors. Please fix them and try again.

ORIGINAL REQUEST: ${originalPrompt}

YOUR PREVIOUS SQL (with errors):
${failedSql}

VALIDATION ERRORS:
${errors.map((e, i) => `${i + 1}. ${e}`).join('\n')}

IMPORTANT REMINDERS:
- Only use the EXACT view names listed in the schema (llm_student_demographics, llm_attendance_summary, etc.)
- Do NOT invent view names - if unsure, use llm_student_demographics as the base
- Use EXACT column names from the schema - do not abbreviate or modify them
- Return ONLY the corrected SQL query, no explanations

Please provide the corrected SQL query:`;
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const queryAttempts: QueryAttempt[] = [];

  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as unknown as SessionUser;
    const activeSchool = user.activeSchool ?? -1;
    const allowedSchools = user.schools || [];
    const canSeeDebugInfo = user.queryEdit === true;

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

    const builder = new ViewQueryBuilder();
    let sql = '';
    let validation: ValidationResult = { valid: false, errors: [], warnings: [], referencedViews: [] };
    let llmResponse: { content: string; usage?: any } = { content: '' };
    let attemptNumber = 0;
    let lastCorrectionPrompt: string | undefined;

    // Try to generate a valid query, with retries if validation fails
    while (attemptNumber <= MAX_REGENERATION_ATTEMPTS) {
      attemptNumber++;
      console.log(`[View AI Query] Attempt ${attemptNumber}/${MAX_REGENERATION_ATTEMPTS + 1}...`);

      // Build the message for this attempt
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemPrompt }
      ];

      if (attemptNumber === 1) {
        // First attempt: use the original prompt
        messages.push({ role: 'user', content: contextPrompt });
      } else {
        // Retry attempt: include the previous failed SQL and errors
        const previousAttempt = queryAttempts[queryAttempts.length - 1];
        lastCorrectionPrompt = buildCorrectionPrompt(
          prompt,
          previousAttempt.sql,
          previousAttempt.validation.errors
        );
        messages.push({ role: 'user', content: contextPrompt });
        messages.push({ role: 'assistant', content: previousAttempt.sql });
        messages.push({ role: 'user', content: lastCorrectionPrompt });
      }

      // Call LLM
      llmResponse = await llm.chat(messages);
      console.log(`[View AI Query] Attempt ${attemptNumber} - LLM response received`);

      // Clean up the response
      sql = builder.cleanLlmResponse(llmResponse.content);
      console.log(`[View AI Query] Attempt ${attemptNumber} - Cleaned SQL:`, sql);

      // Validate the SQL
      validation = builder.validate(sql);

      // Record this attempt
      queryAttempts.push({
        attemptNumber,
        sql,
        rawResponse: llmResponse.content,
        validation,
        correctionPrompt: attemptNumber > 1 ? lastCorrectionPrompt : undefined
      });

      // If valid, break out of the loop
      if (validation.valid) {
        console.log(`[View AI Query] Attempt ${attemptNumber} - Validation passed!`);
        break;
      }

      console.warn(`[View AI Query] Attempt ${attemptNumber} - Validation failed:`, validation.errors);
    }

    // If still invalid after all attempts, return error with all attempts for debugging
    if (!validation.valid) {
      console.error('[View AI Query] All attempts failed validation');
      const duration = Date.now() - startTime;

      return NextResponse.json({
        success: false,
        error: 'Invalid SQL generated after multiple attempts',
        details: validation.errors,
        sql: sql,
        raw: llmResponse.content,
        // Only include debug info for users with queryEdit permission
        ...(canSeeDebugInfo && {
          debugInfo: {
            attempts: queryAttempts,
            totalAttempts: attemptNumber
          }
        }),
        metadata: {
          durationMs: duration,
          attemptCount: attemptNumber
        }
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
    let data: any[] | null = null;
    let rowCount = 0;
    let executeError: string | null = null;

    if (body.execute !== false) {
      try {
        console.log('[View AI Query] Executing query...');
        const queryResult = await runQuery(sql);
        data = queryResult as any[] | null;
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
      // Only include debug info for users with queryEdit permission
      ...(canSeeDebugInfo && {
        debugInfo: {
          attempts: queryAttempts,
          totalAttempts: attemptNumber
        }
      }),
      metadata: {
        mode: 'view',
        referencedViews: validation.referencedViews,
        warnings: validation.warnings,
        schoolScope: activeSchool === 0
          ? (allowedSchools.length > 0 ? `District (${allowedSchools.length} schools)` : 'District (all schools)')
          : SCHOOL_NAMES[activeSchool.toString()] || `School ${activeSchool}`,
        durationMs: duration,
        llmUsage: llmResponse.usage,
        attemptCount: attemptNumber
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
