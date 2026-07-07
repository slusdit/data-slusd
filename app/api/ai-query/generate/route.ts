/**
 * Fragment-Based AI Query Generation Endpoint - RETIRED
 *
 * The fragment-composition engine has been replaced by the view-based
 * generator at /api/ai-query/view-generate, which is more reliable
 * (LLM writes T-SQL directly against documented llm_* views, with a
 * validation + execution repair loop).
 *
 * The fragment data (AIFragment/AIFragmentCategory tables, admin UI, and
 * lib/query-composer.ts) is retained for now and can be removed in a
 * future cleanup.
 */

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'Fragment mode has been retired. Use /api/ai-query/view-generate instead.',
    },
    { status: 410 }
  );
}
