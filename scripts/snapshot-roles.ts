/**
 * Print a deterministic JSON snapshot of who holds which role (read-only).
 *
 * Usage:
 *   npx tsx scripts/snapshot-roles.ts > before.json
 *   ... run prisma/manual-migrations/2026-10-28-role-catalogue.sql ...
 *   npx tsx scripts/snapshot-roles.ts > after.json
 *   diff before.json after.json          (expected: identical)
 *
 * Only selects columns that exist both before and after the role-catalogue
 * migration, so the same script verifies both sides.
 */
import prisma from "../lib/db";

async function main() {
  const [users, categories, roles] = await Promise.all([
    prisma.user.findMany({
      select: {
        email: true,
        primaryRole: true,
        admin: true,
        queryEdit: true,
        UserRole: { select: { role: { select: { role: true } } } },
      },
      orderBy: { email: "asc" },
    }),
    prisma.queryCategory.findMany({
      select: { label: true, roles: { select: { role: true } } },
      orderBy: { label: "asc" },
    }),
    prisma.role.findMany({ select: { role: true }, orderBy: { role: "asc" } }),
  ]);

  const snapshot = {
    roles: roles.map((r) => r.role),
    users: users.map((u) => ({
      email: u.email,
      primaryRole: u.primaryRole,
      admin: u.admin,
      queryEdit: u.queryEdit,
      roles: u.UserRole.map((ur) => ur.role.role).sort(),
    })),
    categories: categories.map((c) => ({
      label: c.label,
      roles: c.roles.map((r) => r.role).sort(),
    })),
  };
  console.log(JSON.stringify(snapshot, null, 2));
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
