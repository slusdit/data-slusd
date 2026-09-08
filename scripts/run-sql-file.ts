/**
 * Run a read-only SQL file against Aeries and print the rows (dev tool).
 *
 * Usage: npx tsx scripts/run-sql-file.ts <file.sql> [--year 25]
 *
 * Goes through the same allow-list validator as the app (SELECT/WITH only,
 * no second statement, no dangerous keywords). No session scoping: this is
 * for verifying report SQL from the command line before saving it.
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { runStandaloneQuery, closeAllPools } from "./lib/standalone-query";

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: npx tsx scripts/run-sql-file.ts <file.sql> [--year 25]");
    process.exit(1);
  }
  const yearIdx = process.argv.indexOf("--year");
  const dbYear = yearIdx > -1 ? Number(process.argv[yearIdx + 1]) : undefined;
  const sql = readFileSync(file, "utf8");
  const started = Date.now();
  const rows = (await runStandaloneQuery(sql, { dbYear })) as Record<string, unknown>[];
  console.log(`${rows.length} row(s) in ${Date.now() - started} ms`);
  if (rows.length > 0) {
    console.log("columns:", Object.keys(rows[0]).join(" | "));
    console.table(rows.slice(0, 25));
  }
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => closeAllPools());
