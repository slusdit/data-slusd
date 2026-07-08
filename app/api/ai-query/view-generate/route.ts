/**
 * View-Based AI Query Generation Endpoint
 *
 * Thin HTTP wrapper: auth + school-scope resolution + response shaping.
 * The actual generate -> validate -> repair -> execute pipeline lives in
 * lib/ai-query/generate-view-query.ts so it can also run outside HTTP
 * (eval harness, scripts).
 *
 * Two response modes:
 * - default: single JSON response (back-compat)
 * - body.stream === true: NDJSON stream of {type:'progress',...} events
 *   followed by one {type:'result', payload} line (payload = the same shape
 *   as the JSON response). Local models take 12-130s per query, so live
 *   stage feedback is essential UX.
 */

import { NextResponse } from 'next/server';
import { auth, SessionUser } from '@/auth';
import {
  generateViewQuery,
  GenerateViewQueryResult,
  GenerationProgressEvent,
  MAX_TOTAL_ATTEMPTS,
} from '@/lib/ai-query/generate-view-query';
import { viewQueryBuilder } from '@/lib/ai-query/view-query-builder';
import { SCHOOL_NAMES, getSchoolName } from '@/lib/constants/schools';

const DEBUG = process.env.AI_QUERY_DEBUG === 'true';

function buildResponsePayload(
  result: GenerateViewQueryResult,
  opts: {
    canSeeDebugInfo: boolean;
    activeSchool: number;
    allowedSchools: string[];
    schoolsToFilter: string[];
    durationMs: number;
  }
) {
  const debugInfo = opts.canSeeDebugInfo
    ? { attempts: result.attempts, totalAttempts: result.attempts.length }
    : undefined;

  if (!result.validation.valid) {
    return {
      status: 400,
      body: {
        success: false as const,
        error: 'Invalid SQL generated after multiple attempts',
        details: result.validation.errors,
        sql: result.originalSql,
        raw: result.raw,
        ...(debugInfo && { debugInfo }),
        metadata: {
          durationMs: opts.durationMs,
          attemptCount: result.attempts.length,
        },
      },
    };
  }

  return {
    status: 200,
    body: {
      success: true as const,
      sql: result.sql,
      originalSql: result.originalSql,
      formattedSql: viewQueryBuilder.formatSql(result.sql),
      data: result.data,
      rowCount: result.rowCount,
      executeError: result.executeError ?? null,
      ...(debugInfo && { debugInfo }),
      metadata: {
        mode: 'view',
        referencedViews: result.validation.referencedViews,
        selectedViews: result.selectedViews,
        warnings: result.validation.warnings,
        schoolScope: opts.activeSchool === 0
          ? (opts.allowedSchools.length > 0 ? `District (${opts.allowedSchools.length} schools)` : 'District (all schools)')
          : SCHOOL_NAMES[opts.activeSchool.toString()] || `School ${opts.activeSchool}`,
        appliedSchools: opts.schoolsToFilter,
        durationMs: opts.durationMs,
        llmUsage: result.llmUsage,
        attemptCount: result.attempts.length,
      },
    },
  };
}

export async function POST(request: Request) {
  const startTime = Date.now();

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

    if (DEBUG) {
      console.log(`[View AI Query] Processing: "${prompt}"`);
      console.log(`[View AI Query] User: ${user.email}`);
      console.log(`[View AI Query] Schools: ${schoolsToFilter.join(', ') || 'all'}`);
    }

    // Add school context to help the LLM understand the scope
    let contextPrompt = prompt;
    if (schoolsToFilter.length === 1) {
      contextPrompt = `${prompt}\n\n(Note: Query is scoped to ${getSchoolName(schoolsToFilter[0])})`;
    } else if (schoolsToFilter.length > 1 && schoolsToFilter.length < 5) {
      const schoolNames = schoolsToFilter.map(getSchoolName).join(', ');
      contextPrompt = `${prompt}\n\n(Note: Query is scoped to: ${schoolNames})`;
    }

    const generate = (onProgress?: (e: GenerationProgressEvent) => void) =>
      generateViewQuery({
        prompt,
        contextPrompt,
        schools: schoolsToFilter,
        execute: body.execute !== false,
        onProgress,
      });

    const logOutcome = (result: GenerateViewQueryResult, durationMs: number) => {
      console.log(
        `[View AI Query] attempts=${result.attempts.length}/${MAX_TOTAL_ATTEMPTS} valid=${result.validation.valid} executed=${result.executed} rows=${result.rowCount} durationMs=${durationMs}`
      );
    };

    const payloadOpts = { canSeeDebugInfo, activeSchool, allowedSchools, schoolsToFilter };

    // ---- Streaming mode ----
    if (body.stream === true) {
      const encoder = new TextEncoder();
      // The single LLM call can take ~100s and emits no bytes during that
      // window, so the browser/reverse-proxy may close the connection before
      // generate() resolves. Guard every write/close so a late enqueue on an
      // already-closed controller can't throw ERR_INVALID_STATE, and keep the
      // stream warm with a heartbeat so it doesn't idle-timeout.
      let closed = false;
      const stream = new ReadableStream({
        async start(controller) {
          const send = (obj: unknown) => {
            if (closed) return;
            try {
              controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
            } catch {
              closed = true; // client already disconnected
            }
          };
          const safeClose = () => {
            if (closed) return;
            closed = true;
            try {
              controller.close();
            } catch {
              /* already closed */
            }
          };

          const heartbeat = setInterval(() => send({ type: 'ping' }), 15000);
          try {
            const result = await generate((event) => send({ type: 'progress', ...event }));
            const durationMs = Date.now() - startTime;
            logOutcome(result, durationMs);
            const { body: payload } = buildResponsePayload(result, { ...payloadOpts, durationMs });
            send({ type: 'result', payload });
          } catch (error) {
            console.error('[View AI Query] Error:', error);
            send({
              type: 'error',
              error: error instanceof Error ? error.message : 'Query generation failed',
            });
          } finally {
            clearInterval(heartbeat);
            safeClose();
          }
        },
        cancel() {
          closed = true; // client went away; stop the heartbeat from writing
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
        },
      });
    }

    // ---- JSON mode (back-compat) ----
    const result = await generate();
    const durationMs = Date.now() - startTime;
    logOutcome(result, durationMs);
    const { status, body: responseBody } = buildResponsePayload(result, { ...payloadOpts, durationMs });
    return NextResponse.json(responseBody, { status });

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
