'use server';

/**
 * Promote an AI-generated query into the saved Query system (dashboards,
 * favorites, categories).
 *
 * Takes the PRE-security-injection SQL and injects the dynamic `@@sc`
 * school-scope variable instead of the hardcoded school list, so the saved
 * query scopes to whoever runs it (lib/aeries.ts runQuery substitutes @@sc
 * from the session).
 */

import prisma from '@/lib/db';
import { requireQueryEditor, AuthError } from '@/lib/authGuard';
import { viewQueryBuilder } from './view-query-builder';

export interface SaveAiQueryResult {
  success: boolean;
  id?: string;
  label?: string;
  error?: string;
}

export async function saveAiQuery(input: {
  name: string;
  description?: string;
  /** Pre-injection SQL (originalSql from the generate response) */
  sql: string;
}): Promise<SaveAiQueryResult> {
  try {
    const user = await requireQueryEditor();

    const name = input.name?.trim();
    const sql = input.sql?.trim();
    if (!name) return { success: false, error: 'A name is required.' };
    if (!sql) return { success: false, error: 'No SQL to save.' };

    // Swap in the dynamic scope variable using the same alias-aware,
    // parenthesizing injection the live query path uses
    const scopedSql = viewQueryBuilder.injectSecurityFilters(
      sql,
      [],
      (alias) => `${alias}.school_id = @@sc`
    );

    // Same label-slug convention as addQuery (lib/formActions.ts)
    const label = name
      .toLowerCase()
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll('%', '')
      .replaceAll(/\s+/g, '-');

    const query = await prisma.query.create({
      data: {
        query: scopedSql,
        name,
        label,
        createdBy: user.email ?? 'ai-query',
        description: input.description?.trim() || 'Created with the AI Query Builder',
        hiddenCols: '',
        chart: false,
      },
    });

    return { success: true, id: query.id, label: query.label };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
    // Unique constraint on label -> friendlier message
    if (error && typeof error === 'object' && 'code' in error && (error as { code?: string }).code === 'P2002') {
      return { success: false, error: 'A saved query with a similar name already exists - pick a different name.' };
    }
    console.error('[saveAiQuery] Error:', error);
    return { success: false, error: 'Failed to save query.' };
  }
}
