"use server";
import { runQuery } from "./aeries";
import prisma from "./db";
import { requireUser } from "./authGuard";
import { userCanRunQuery } from "./authorization";

// Roles needed to decide userCanRunQuery (finding S5)
const authorizationInclude = {
  roles: { select: { role: true } },
  category: { include: { roles: { select: { role: true } } } },
} as const;

/** Load one saved report the signed-in user may run; null otherwise. */
export async function getQuery(queryId: string) {
  const user = await requireUser();
  if (typeof queryId !== "string" || !queryId) return null;
  const ret = await prisma.query.findUnique({
    where: { id: queryId },
    include: authorizationInclude,
  });
  if (!ret || !userCanRunQuery(user, ret)) return null;
  return ret;
}

/** Load and run one saved report by id or label, if the user may run it. */
export async function getQueryData({
  queryId,
  queryLabel,
}: {
  queryId?: string;
  queryLabel?: string;
}) {
  const user = await requireUser();

  const query =
    queryId && typeof queryId === "string"
      ? await prisma.query.findUnique({ where: { id: queryId }, include: authorizationInclude })
      : queryLabel && typeof queryLabel === "string"
        ? await prisma.query.findUnique({ where: { label: queryLabel }, include: authorizationInclude })
        : null;

  if (!query || !userCanRunQuery(user, query)) return;
  const data = await runQuery(query.query);

  return {
    data: data,
    query: query,
  };
}
