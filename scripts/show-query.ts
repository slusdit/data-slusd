/**
 * Print one saved report definition (read-only).
 *
 * Usage: npx tsx scripts/show-query.ts <query id or label>
 */
import "dotenv/config";
import prisma from "../lib/db";

async function main() {
  const key = process.argv[2];
  if (!key) {
    console.error("usage: npx tsx scripts/show-query.ts <query id or label>");
    process.exit(1);
  }
  const q =
    (await prisma.query.findUnique({ where: { id: key }, include: { category: true, roles: true } })) ??
    (await prisma.query.findUnique({ where: { label: key }, include: { category: true, roles: true } }));
  if (!q) {
    console.log("not found:", key);
    return;
  }
  const { query, ...rest } = q;
  console.log(JSON.stringify({ ...rest, roles: q.roles.map((r) => r.role) }, null, 2));
  console.log("--- SQL ---");
  console.log(query);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
