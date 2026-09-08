/**
 * Session-less Aeries query runner for command-line scripts (the AI query eval
 * harness). It has NO school scoping and NO authentication on purpose, which is
 * why it lives under scripts/ and is never imported by app code (finding S1):
 * app code goes through lib/aeries.ts, which requires a signed-in session.
 *
 * Needs DB_USER / DB_PASSWORD / DB_SERVER in .env.
 */
import "dotenv/config";
import { getPoolForDatabase, closeAllPools } from "../../lib/aeries-pool";
import { validateQueryWhitelist } from "../../lib/sql-guard";
import { DEFAULT_DB_YEAR, getDatabaseName } from "../../lib/schoolYear";

export async function runStandaloneQuery(
  query: string,
  options?: { dbYear?: number }
): Promise<unknown[]> {
  validateQueryWhitelist(query);
  const pool = await getPoolForDatabase(getDatabaseName(options?.dbYear ?? DEFAULT_DB_YEAR));
  const result = await pool.request().query(query);
  return result.recordset ?? [];
}

export { closeAllPools };
