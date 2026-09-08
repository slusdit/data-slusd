"use server";

/**
 * Bulk and destructive admin actions (finding U8): one round trip per
 * operation instead of a client-side loop, gated server-side, audited.
 */
import prisma from "@/lib/db";
import { requireAdmin, requireQueryEditor } from "@/lib/authGuard";
import { recordAudit } from "@/lib/auditLog";
import { invalidateReportCatalogue } from "@/lib/reportCatalogue";
import { queryCache } from "@/lib/queryCache";

function cleanIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter((id): id is string => typeof id === "string" && id.length > 0))];
}

/** Delete several saved reports. Returns how many were removed. */
export async function deleteQueries(ids: string[]): Promise<{ deleted: number }> {
  const actor = await requireQueryEditor();
  const targetIds = cleanIds(ids);
  if (targetIds.length === 0) return { deleted: 0 };

  const before = await prisma.query.findMany({
    where: { id: { in: targetIds } },
    select: { id: true, name: true, label: true, categoryId: true, query: true },
  });
  const result = await prisma.query.deleteMany({ where: { id: { in: targetIds } } });
  queryCache.clear();
  invalidateReportCatalogue();
  await Promise.all(
    before.map((q) => recordAudit({ actor, action: "query.delete", entity: "Query", entityId: q.id, before: q }))
  );
  return { deleted: result.count };
}

/** Delete several AI SQL fragments. Returns how many were removed. */
export async function deleteFragments(ids: string[]): Promise<{ deleted: number }> {
  const actor = await requireQueryEditor();
  const targetIds = cleanIds(ids);
  if (targetIds.length === 0) return { deleted: 0 };

  const before = await prisma.aIFragment.findMany({
    where: { id: { in: targetIds } },
    select: { id: true, fragmentId: true, name: true, categoryId: true, snippet: true },
  });
  const result = await prisma.aIFragment.deleteMany({ where: { id: { in: targetIds } } });
  await Promise.all(
    before.map((f) =>
      recordAudit({ actor, action: "fragment.delete", entity: "AIFragment", entityId: f.id, before: f })
    )
  );
  return { deleted: result.count };
}

/**
 * Delete a user account and its auth/session rows. Role, school and class
 * links cascade in the schema; Account/Session/Authenticator do not, so they
 * are removed in the same transaction. Admins cannot delete themselves.
 */
export async function deleteUser(id: string): Promise<{ deleted: boolean; error?: string }> {
  const actor = await requireAdmin();
  if (typeof id !== "string" || !id) return { deleted: false, error: "User id is required" };
  if (id === actor.id) return { deleted: false, error: "You cannot delete your own account" };

  const before = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, admin: true, primaryRole: true, queryEdit: true },
  });
  if (!before) return { deleted: false, error: "User not found" };

  await prisma.$transaction(async (tx) => {
    await tx.session.deleteMany({ where: { userId: id } });
    await tx.authenticator.deleteMany({ where: { userId: id } });
    await tx.account.deleteMany({ where: { userId: id } });
    // anyone currently emulating this user stops doing so
    await tx.user.updateMany({ where: { emulatingId: id }, data: { emulatingId: null } });
    await tx.user.delete({ where: { id } });
  });
  await recordAudit({ actor, action: "user.delete", entity: "User", entityId: id, before });
  return { deleted: true };
}
