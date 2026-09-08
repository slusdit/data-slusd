/**
 * One-off content change for the "Projected CALPADS UPP(%)" report
 * (Phase 3 of docs/handoff-2026-09-08-review.md):
 *
 *   - fix the name to "Projected CALPADS UPP (%)"
 *   - add a numeric "UPP %" column (100 * # UPP / Total) to the SQL
 *   - set totalColumns so the report shows a totals footer with UPP % as
 *     SUM(# UPP) / SUM(Total)
 *
 * Usage: npx tsx scripts/dangerous/update-upp-report.ts            (dry run: prints the diff)
 *        npx tsx scripts/dangerous/update-upp-report.ts --confirm  (applies; prints the old values for rollback)
 *
 * Verify the patched SQL first:  npx tsx scripts/run-sql-file.ts <patched.sql> --year 25
 */
import "dotenv/config";
import { writeFileSync } from "fs";
import prisma from "../../lib/db";

const QUERY_ID = "cm2du2rlf0009e6fvkoogt3ze";
const NEW_NAME = "Projected CALPADS UPP (%)";
const TOTAL_COLUMNS = "# UPP, # ELL, # FR, # FR (no PDC), Total, UPP %:ratio(# UPP,Total)";

// The existing '# UPP' CASE expression, reused verbatim for the percentage.
const UPP_CASE = `Sum(CASE
             WHEN all_stu.lf = '3' THEN 1
             WHEN cur_fre.esd >= '20' + Substring(Db_name(), 4, 2) + '-07-01'
                  AND cur_fre.cd NOT IN ( 'N', 'P' ) THEN 1
             ELSE 0
           END)`;

const TOTAL_LINE = "       Count(all_stu.id) AS 'Total'";
const UPP_PCT_LINES =
  `${TOTAL_LINE},\n` +
  `       CAST(100.0 * ${UPP_CASE} / NULLIF(Count(all_stu.id), 0) AS DECIMAL(5, 1)) AS 'UPP %'`;

export function patchUppSql(sql: string): string {
  const lf = sql.replace(/\r\n/g, "\n");
  if (lf.includes("AS 'UPP %'")) return lf; // already patched
  const count = lf.split(TOTAL_LINE + "\n").length - 1;
  if (count !== 1) {
    throw new Error(`expected exactly one Total column line, found ${count}`);
  }
  return lf.replace(TOTAL_LINE + "\n", UPP_PCT_LINES + "\n");
}

async function main() {
  const confirm = process.argv.includes("--confirm");
  const q = await prisma.query.findUnique({ where: { id: QUERY_ID } });
  if (!q) throw new Error(`query ${QUERY_ID} not found`);

  const patched = patchUppSql(q.query);
  console.log(`name:         ${JSON.stringify(q.name)} -> ${JSON.stringify(NEW_NAME)}`);
  console.log(`totalColumns: ${JSON.stringify(q.totalColumns)} -> ${JSON.stringify(TOTAL_COLUMNS)}`);
  console.log(`query:        ${patched === q.query.replace(/\r\n/g, "\n") ? "unchanged" : "adds the UPP % column"}`);

  // --out <file>: write the patched SQL so it can be verified with scripts/run-sql-file.ts
  const outIdx = process.argv.indexOf("--out");
  if (outIdx > -1 && process.argv[outIdx + 1]) {
    writeFileSync(process.argv[outIdx + 1], patched);
    console.log(`patched SQL written to ${process.argv[outIdx + 1]}`);
  }

  if (!confirm) {
    console.log("\nDry run. Re-run with --confirm to apply.");
    return;
  }

  console.log("\n--- previous values (keep for rollback) ---");
  console.log(JSON.stringify({ id: q.id, name: q.name, totalColumns: q.totalColumns, query: q.query }));
  await prisma.query.update({
    where: { id: QUERY_ID },
    data: { name: NEW_NAME, totalColumns: TOTAL_COLUMNS, query: patched },
  });
  console.log("\nApplied.");
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
