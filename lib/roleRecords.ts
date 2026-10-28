import "server-only";
import prisma from "@/lib/db";
import { SYSTEM_ROLES, type RoleRow } from "@/lib/roles";

/** Columns the admin Roles tab needs, with usage counts for the delete guard. */
export const roleSelect = {
  id: true,
  role: true,
  label: true,
  description: true,
  isSystem: true,
  _count: { select: { UserRole: true, QueryCategory: true, queries: true, primaryUsers: true } },
} as const;

type RoleRecord = {
  id: string;
  role: string;
  label: string;
  description: string | null;
  isSystem: boolean;
  _count: { UserRole: number; QueryCategory: number; queries: number; primaryUsers: number };
};

export function toRoleRow(r: RoleRecord): RoleRow {
  return {
    id: r.id,
    role: r.role,
    label: r.label,
    description: r.description,
    isSystem: r.isSystem,
    userCount: r._count.UserRole,
    primaryUserCount: r._count.primaryUsers,
    categoryCount: r._count.QueryCategory,
    queryCount: r._count.queries,
  };
}

/** Every role, alphabetical by machine name. */
export async function listRoles(): Promise<RoleRow[]> {
  const rows = await prisma.role.findMany({ select: roleSelect, orderBy: { role: "asc" } });
  return rows.map(toRoleRow);
}

export async function getRoleRow(id: string): Promise<RoleRow | null> {
  const row = await prisma.role.findUnique({ where: { id }, select: roleSelect });
  return row ? toRoleRow(row) : null;
}

/**
 * Make sure every system role has a `Role` row flagged `isSystem`, filling in
 * the label and description for rows that were created before those columns
 * existed. Data roles (created on the admin Roles tab) are left alone, so
 * deleting one does not bring it back on the next page load.
 *
 * Idempotent and cheap: one SELECT, then only the writes that are needed.
 */
export async function ensureSystemRoles(): Promise<void> {
  const existing = await prisma.role.findMany({
    where: { role: { in: SYSTEM_ROLES.map((r) => r.role) } },
    select: { role: true, label: true, description: true, isSystem: true },
  });
  const byName = new Map(existing.map((r) => [r.role, r]));

  const writes = [];
  for (const seed of SYSTEM_ROLES) {
    const row = byName.get(seed.role);
    if (!row) {
      writes.push(prisma.role.create({ data: { ...seed, isSystem: true } }));
      continue;
    }
    const data: { isSystem?: true; label?: string; description?: string } = {};
    if (!row.isSystem) data.isSystem = true;
    if (!row.label) data.label = seed.label;
    if (!row.description) data.description = seed.description;
    if (Object.keys(data).length > 0) {
      writes.push(prisma.role.update({ where: { role: seed.role }, data }));
    }
  }
  if (writes.length > 0) await prisma.$transaction(writes);
}
