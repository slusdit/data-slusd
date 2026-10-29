/**
 * Pure SQL guard helpers.
 *
 * Shared by the saved-report runner (lib/aeries.ts), the AI/custom-query
 * validator (lib/ai-query/sql-validator.ts) and the standalone script runner
 * (scripts/lib/standalone-query.ts). Deliberately free of session, DB and Next
 * imports so it is unit-testable (lib/sql-guard.test.ts) and usable from scripts.
 */

/** Statements and functions that must never appear in a read-only query. */
export const DANGEROUS_SQL_KEYWORDS = [
  "drop", "delete", "insert", "update", "alter", "create", "truncate", "merge",
  "exec", "execute", "xp_cmdshell", "sp_executesql",
  "grant", "revoke", "deny", "backup", "restore", "bulk",
  "openrowset", "openquery", "opendatasource", "waitfor", "shutdown",
] as const;

/**
 * Remove `-- line` and block comments while leaving string literals untouched
 * (a `--` inside '...' is data, not a comment).
 */
export function stripSqlComments(sql: string): string {
  let out = "";
  let i = 0;
  let inString = false;
  while (i < sql.length) {
    const ch = sql[i];
    const next = sql[i + 1];
    if (inString) {
      out += ch;
      if (ch === "'") {
        if (next === "'") {
          out += next; // escaped quote inside the literal
          i += 2;
          continue;
        }
        inString = false;
      }
      i++;
      continue;
    }
    if (ch === "'") {
      inString = true;
      out += ch;
      i++;
      continue;
    }
    if (ch === "-" && next === "-") {
      while (i < sql.length && sql[i] !== "\n" && sql[i] !== "\r") i++;
      continue;
    }
    if (ch === "/" && next === "*") {
      const end = sql.indexOf("*/", i + 2);
      i = end === -1 ? sql.length : end + 2;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

/** True when a `;` occurs outside string literals. Strip comments first. */
export function hasStatementSeparator(sql: string): boolean {
  let inString = false;
  for (const ch of sql) {
    if (ch === "'") inString = !inString;
    else if (ch === ";" && !inString) return true;
  }
  return false;
}

/** Split on `;` outside string literals, dropping empty statements. Strip comments first. */
export function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = "";
  let inString = false;
  for (const ch of sql) {
    if (ch === "'") inString = !inString;
    if (ch === ";" && !inString) {
      statements.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  statements.push(current);
  return statements.map((s) => s.trim()).filter(Boolean);
}

/** Dangerous keywords present in the SQL (word-boundary, case-insensitive). */
export function findDangerousKeywords(sql: string): string[] {
  return DANGEROUS_SQL_KEYWORDS.filter((keyword) =>
    new RegExp(`\\b${keyword}\\b`, "i").test(sql)
  );
}

/**
 * Allow-list validation for saved report SQL: one SELECT (or WITH ... SELECT,
 * UNIONs included), optionally preceded by `DECLARE @variable ...;` statements
 * (each ended with `;`), no other statement, no dangerous keywords anywhere.
 * A single trailing `;` is tolerated because many saved reports end with one.
 * @throws Error describing the first violation
 */
export function validateQueryWhitelist(query: string): void {
  const normalized = stripSqlComments(query).replace(/\s+/g, " ").trim().toLowerCase();
  if (!normalized) {
    throw new Error("Query is empty or contains only comments");
  }
  const body = normalized.replace(/[\s;]+$/, "");
  const statements = splitSqlStatements(body);
  const main = statements[statements.length - 1] ?? "";
  if (statements.slice(0, -1).some((s) => !/^declare\s+@/.test(s))) {
    throw new Error(
      "Query validation failed: multiple statements are not allowed (only DECLARE @variable statements may come before the SELECT)"
    );
  }
  if (!/^(select|with)\s/.test(main)) {
    throw new Error(
      `Query validation failed: Only SELECT and UNION queries are allowed. Found: ${main.substring(0, 50)}...`
    );
  }
  const found = findDangerousKeywords(body);
  if (found.length > 0) {
    throw new Error(`Query validation failed: Dangerous keywords detected: ${found.join(", ")}`);
  }
}

/**
 * Validate school codes are integers before they are interpolated into SQL.
 * @returns the codes as numbers
 * @throws Error on the first non-integer value
 */
export function validateSchoolCodes(
  schoolCodes: string | number | ReadonlyArray<string | number> | null | undefined
): number[] {
  if (schoolCodes === undefined || schoolCodes === null) return [];
  const list: ReadonlyArray<string | number> = Array.isArray(schoolCodes)
    ? schoolCodes
    : [schoolCodes as string | number];
  return list.map((code) => {
    const n =
      typeof code === "string"
        ? /^\s*-?\d+\s*$/.test(code)
          ? Number.parseInt(code, 10)
          : Number.NaN
        : code;
    if (typeof n !== "number" || !Number.isInteger(n)) {
      throw new Error(`Invalid school code: ${code}. School codes must be integers.`);
    }
    return n;
  });
}
