"use server";

import prisma from "@/lib/db";
import { requireUser } from "@/lib/authGuard";
import { userCanRunQuery } from "@/lib/authorization";
import { runQueryWithMeta, formatQueryErrorForUser } from "@/lib/aeries";

/**
 * The only server action that runs report SQL for client components
 * (finding S1). It accepts a saved Query id, never SQL text, and enforces the
 * report's role requirements before running it as the signed-in user.
 */
export async function runSavedQuery(queryId: string): Promise<{
  rows: any[];
  truncated: boolean;
  error?: string;
}> {
  const user = await requireUser();
  if (typeof queryId !== "string" || !queryId) {
    return { rows: [], truncated: false, error: "Report not found" };
  }

  const query = await prisma.query.findUnique({
    where: { id: queryId },
    select: {
      id: true,
      query: true,
      publicQuery: true,
      roles: { select: { role: true } },
      category: { select: { roles: { select: { role: true } } } },
    },
  });

  // An unknown id and a forbidden id look the same to the caller.
  if (!query || !userCanRunQuery(user, query)) {
    return { rows: [], truncated: false, error: "Report not found" };
  }

  try {
    const result = await runQueryWithMeta(query.query);
    return { rows: result.rows, truncated: result.truncated };
  } catch (error) {
    return { rows: [], truncated: false, error: formatQueryErrorForUser(error, user) };
  }
}
