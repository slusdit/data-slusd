import { NextResponse } from 'next/server';
import { createLLMClient } from '@/lib/llm-client';
import { QueryComposer } from '@/lib/query-composer';
import { buildSystemPrompt, parseInterpretation } from '@/lib/prompt-builder';
import { auth, SessionUser } from '@/auth';
import { getFragmentLibrary } from '@/lib/fragment-service';
import { FragmentLibrary, Fragment } from '@/lib/types/query-builder';
import { checkRateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

// Map school codes to fragment IDs (same as in page.tsx)
const schoolCodeToFragmentId: Record<string, string> = {
  '2': 'school_garfield',
  '3': 'school_jefferson',
  '4': 'school_madison',
  '5': 'school_mckinley',
  '6': 'school_monroe',
  '7': 'school_roosevelt',
  '8': 'school_washington',
  '9': 'school_halkin',
  '11': 'school_bancroft',
  '12': 'school_muir',
  '15': 'school_lincoln',
  '16': 'school_slhs',
  '60': 'school_slva_elementary',
  '61': 'school_slva_middle',
  '62': 'school_slva_high',
};

// Reverse mapping: fragment ID to school code
const fragmentIdToSchoolCode: Record<string, string> = Object.fromEntries(
  Object.entries(schoolCodeToFragmentId).map(([code, id]) => [id, code])
);

/**
 * Filters the fragment library to only include school fragments the user has access to.
 * Also filters out school fragments entirely if user is scoped to a single school.
 */
function filterFragmentsByAccess(
  library: FragmentLibrary,
  activeSchool: number,
  allowedSchools: string[]
): FragmentLibrary {
  const filteredFragments: Record<string, Record<string, Fragment[]>> = {};

  for (const [categoryName, subcategories] of Object.entries(library.fragments)) {
    filteredFragments[categoryName] = {};

    for (const [subcatName, fragments] of Object.entries(subcategories)) {
      // Filter school fragments based on user access
      const filtered = (fragments as Fragment[]).filter(fragment => {
        // If not a school filter, keep it
        if (!fragment.id.startsWith('school_')) {
          return true;
        }

        // Get the school code for this fragment
        const schoolCode = fragmentIdToSchoolCode[fragment.id];
        if (!schoolCode) return true; // Keep unknown fragments

        // If activeSchool is 0 (district-wide), check allowedSchools
        if (activeSchool === 0) {
          return allowedSchools.length === 0 || allowedSchools.includes(schoolCode);
        }

        // If specific school is active, only allow that school's fragment
        return schoolCode === activeSchool.toString();
      });

      if (filtered.length > 0) {
        filteredFragments[categoryName][subcatName] = filtered;
      }
    }
  }

  return {
    ...library,
    fragments: filteredFragments,
  };
}

/**
 * Validates that the generated SQL only accesses allowed schools.
 * Returns the school codes found in the query.
 */
function extractSchoolCodesFromSql(sql: string): string[] {
  // Match patterns like: s.SC = 2, s.SC IN (2, 3, 4), SC = '2', etc.
  const patterns = [
    /s\.SC\s*=\s*['"]?(\d+)['"]?/gi,
    /s\.SC\s+IN\s*\(\s*([^)]+)\s*\)/gi,
    /SC\s*=\s*['"]?(\d+)['"]?/gi,
    /SC\s+IN\s*\(\s*([^)]+)\s*\)/gi,
  ];

  const codes: string[] = [];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(sql)) !== null) {
      const value = match[1];
      // Handle IN clause values
      if (value.includes(',')) {
        const inCodes = value.split(',').map(s => s.trim().replace(/['"]/g, ''));
        codes.push(...inCodes);
      } else {
        codes.push(value.replace(/['"]/g, ''));
      }
    }
  }

  return [...new Set(codes)];
}

/**
 * Injects a school scope filter into the SQL if needed.
 * This ensures the query is always scoped to allowed schools.
 */
function injectSchoolScope(
  sql: string,
  activeSchool: number,
  allowedSchools: string[]
): string {
  // If no WHERE clause, add one with school filter
  // If WHERE clause exists, add the school filter

  let scopeFilter: string;

  if (activeSchool === 0) {
    // District-wide: filter to allowed schools if specified
    if (allowedSchools.length > 0) {
      scopeFilter = `s.SC IN (${allowedSchools.join(', ')})`;
    } else {
      // User has access to all schools, no filter needed
      return sql;
    }
  } else {
    // Single school scope
    scopeFilter = `s.SC = ${activeSchool}`;
  }

  // Check if query already has a school filter
  const existingSchoolCodes = extractSchoolCodesFromSql(sql);
  if (existingSchoolCodes.length > 0) {
    // Validate that existing school codes are within allowed scope
    const invalidCodes = existingSchoolCodes.filter(code => {
      if (activeSchool === 0) {
        return allowedSchools.length > 0 && !allowedSchools.includes(code);
      }
      return code !== activeSchool.toString();
    });

    if (invalidCodes.length > 0) {
      // Replace existing school filter with scoped one
      // Remove existing school conditions and add our scoped one
      let modifiedSql = sql
        .replace(/\bAND\s+s\.SC\s*(=|IN)\s*[^AND\n]*/gi, '')
        .replace(/\bWHERE\s+s\.SC\s*(=|IN)\s*[^AND\n]*\s*AND/gi, 'WHERE ')
        .replace(/\bWHERE\s+s\.SC\s*(=|IN)\s*[^AND\n]*/gi, 'WHERE 1=1');

      // Now inject the proper scope
      if (modifiedSql.match(/WHERE/i)) {
        modifiedSql = modifiedSql.replace(/(WHERE\s+)/i, `$1${scopeFilter} AND `);
      } else if (modifiedSql.match(/FROM\s+/i)) {
        modifiedSql = modifiedSql.replace(/(FROM\s+\S+)/i, `$1\nWHERE ${scopeFilter}`);
      }
      return modifiedSql;
    }
    // Existing codes are valid, keep the query as-is
    return sql;
  }

  // No school filter exists, inject one
  if (sql.match(/WHERE/i)) {
    return sql.replace(/(WHERE\s+)/i, `$1${scopeFilter} AND `);
  } else if (sql.match(/FROM\s+/i)) {
    // Find the FROM clause and add WHERE after it
    return sql.replace(/(FROM\s+[^\n]+)/i, `$1\nWHERE ${scopeFilter}`);
  }

  return sql;
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as unknown as SessionUser;

    // Rate limiting: 10 requests per 10 seconds per user
    const identifier = await getRateLimitIdentifier(request, user.id);
    const rateLimit = checkRateLimit(identifier, {
      maxRequests: 10,
      windowSeconds: 10,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again after ${new Date(rateLimit.reset).toLocaleTimeString()}`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const activeSchool = user.activeSchool ?? -1; // -1 means no access
    const allowedSchools = user.schools || [];

    // Deny access if no active school set
    if (activeSchool === -1 || (activeSchool === undefined && activeSchool !== 0)) {
      return NextResponse.json({
        error: 'No school access. Please select a school from the school picker.'
      }, { status: 403 });
    }

    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    console.log(`[AI Query] Processing prompt: "${prompt}"`);
    console.log(`[AI Query] User: ${user.email}`);
    console.log(`[AI Query] Active School: ${activeSchool}, Allowed Schools: ${allowedSchools.join(', ')}`);

    // Create LLM client
    const llm = createLLMClient();

    // Fetch fragments from database and filter by user's school access
    const allFragments = await getFragmentLibrary();
    const fragments = filterFragmentsByAccess(allFragments, activeSchool, allowedSchools);

    // Build the system prompt with available fragments
    const systemPrompt = buildSystemPrompt(fragments);

    // Call LLM for interpretation
    console.log('[AI Query] Calling LLM...');
    const llmResponse = await llm.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ]);

    console.log('[AI Query] LLM response received');
    console.log('[AI Query] Raw response:', llmResponse.content.slice(0, 500));

    // Parse the JSON response from LLM (pass fragments for dynamic base validation)
    const interpretation = parseInterpretation(llmResponse.content, fragments);

    if (!interpretation) {
      return NextResponse.json({
        success: false,
        error: 'Failed to parse AI response',
        raw: llmResponse.content
      }, { status: 500 });
    }

    console.log('[AI Query] Interpretation:', JSON.stringify(interpretation, null, 2));

    // Handle clarifications if confidence is low
    if (interpretation.clarifications?.length > 0 && interpretation.confidence < 0.7) {
      return NextResponse.json({
        success: false,
        needsClarification: true,
        clarifications: interpretation.clarifications,
        partialInterpretation: interpretation
      });
    }

    // Compose the SQL query from fragments
    const composer = new QueryComposer(fragments);
    const result = composer.compose(interpretation);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.errors?.[0]?.message || 'Query composition failed',
        errors: result.errors
      }, { status: 400 });
    }

    // Inject school scope filter to ensure data security
    // This is a safety net in case the LLM-generated query doesn't properly scope to allowed schools
    const scopedSql = injectSchoolScope(result.query!, activeSchool, allowedSchools);
    const scopedFormattedSql = result.formattedQuery
      ? injectSchoolScope(result.formattedQuery, activeSchool, allowedSchools)
      : undefined;

    console.log('[AI Query] Original SQL:', result.query);
    console.log('[AI Query] Scoped SQL:', scopedSql);

    // Return the generated SQL with school scope applied
    return NextResponse.json({
      success: true,
      sql: scopedSql,
      formattedSql: scopedFormattedSql,
      explanation: result.explanation,
      metadata: {
        ...result.metadata,
        schoolScope: activeSchool === 0
          ? (allowedSchools.length > 0 ? `District (${allowedSchools.length} schools)` : 'District (all schools)')
          : `School ${activeSchool}`,
      },
      interpretation
    });

  } catch (error) {
    console.error('[AI Query] Generation error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed'
    }, { status: 500 });
  }
}
