import { NextResponse } from 'next/server';
import { createLLMClient } from '@/lib/llm-client';
import { QueryComposer } from '@/lib/query-composer';
import { buildSystemPrompt, parseInterpretation } from '@/lib/prompt-builder';
import { auth } from '@/auth';
import { getFragmentLibrary } from '@/lib/fragment-service';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    console.log(`[AI Query] Processing prompt: "${prompt}"`);
    console.log(`[AI Query] User: ${session.user.email}`);

    // Create LLM client
    const llm = createLLMClient();

    // Fetch fragments from database
    const fragments = await getFragmentLibrary();

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

    console.log('[AI Query] Generated SQL:', result.query);

    // Return the generated SQL
    return NextResponse.json({
      success: true,
      sql: result.query,
      formattedSql: result.formattedQuery,
      explanation: result.explanation,
      metadata: result.metadata,
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
