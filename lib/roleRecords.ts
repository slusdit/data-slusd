import "server-only";
import prisma from "@/lib/db";
import { ROLE } from "@prisma/client";

/**
 * Make sure every value of the ROLE enum has a base `Role` row (one with no
 * `queryId`), so it shows up in the admin role pickers and can be linked to a
 * user through `UserRole`.
 *
 * Historically rows were only created lazily: the Aeries sign-in sync created a
 * row the first time a staff member with that job title logged in, and the
 * report editor created query-scoped rows. Roles that never come from Aeries
 * (BOARDMEMBER and any future hand-assigned role) would therefore never exist
 * and could not be assigned. Calling this before listing roles closes that gap.
 *
 * Idempotent and cheap: one SELECT, and an INSERT only when something is missing.
 */
export async function ensureBaseRoleRecords(): Promise<void> {
  const existing = await prisma.role.findMany({
    where: { queryId: null },
    select: { role: true },
  });
  const present = new Set(existing.map((r) => r.role));
  const missing = Object.values(ROLE).filter((role) => !present.has(role));
  if (missing.length === 0) return;

  await prisma.role.createMany({
    data: missing.map((role) => ({ role })),
  });
}
