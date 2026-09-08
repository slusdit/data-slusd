/**
 * Column totals footer for reports (Phase 3 of docs/handoff-2026-09-08-review.md).
 *
 * A report's `Query.totalColumns` is a comma-separated list of entries:
 *   <column>                 sum of that column
 *   <column>:<fn>            fn = sum | avg | min | max | count
 *   <column>:ratio(<num>,<den>)   100 * sum(num) / sum(den), rendered under <column>
 *
 * Example for the UPP report:
 *   # UPP, # ELL, # FR, # FR (no PDC), Total, UPP %:ratio(# UPP,Total)
 *
 * Pure functions, no DOM or DB imports, unit-tested in lib/reportTotals.test.ts.
 */

export type SimpleTotalFn = "sum" | "avg" | "min" | "max" | "count";

export type TotalSpec =
  | { column: string; fn: SimpleTotalFn }
  | { column: string; fn: "ratio"; numerator: string; denominator: string };

export type TotalsRow = Record<string, number | string | null>;

const SIMPLE_FNS: ReadonlySet<string> = new Set(["sum", "avg", "min", "max", "count"]);

/** Split on commas that are not inside parentheses. */
function splitTopLevel(input: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of input) {
    if (ch === "(") depth++;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  parts.push(current);
  return parts.map((p) => p.trim()).filter((p) => p.length > 0);
}

/**
 * Parse a `totalColumns` string. Malformed entries are skipped rather than
 * thrown so a typo in the admin form never breaks the report page.
 */
export function parseTotalColumns(input: string | null | undefined): TotalSpec[] {
  if (!input) return [];
  const specs: TotalSpec[] = [];
  for (const entry of splitTopLevel(input)) {
    const colon = entry.indexOf(":");
    if (colon === -1) {
      specs.push({ column: entry, fn: "sum" });
      continue;
    }
    const column = entry.slice(0, colon).trim();
    const fnText = entry.slice(colon + 1).trim();
    if (!column) continue;
    const ratio = fnText.match(/^ratio\s*\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)$/i);
    if (ratio) {
      specs.push({ column, fn: "ratio", numerator: ratio[1], denominator: ratio[2] });
      continue;
    }
    const fn = fnText.toLowerCase();
    if (SIMPLE_FNS.has(fn)) {
      specs.push({ column, fn: fn as SimpleTotalFn });
    }
  }
  return specs;
}

/** Numeric value of a cell, or null for null/undefined/non-numeric text. */
export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") {
    const n = Number(value.replace(/[,%$\s]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function numericValues(rows: ReadonlyArray<Record<string, unknown>>, column: string): number[] {
  const out: number[] = [];
  for (const row of rows) {
    const n = toNumber(row[column]);
    if (n !== null) out.push(n);
  }
  return out;
}

function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

/**
 * Compute one footer row. Columns not covered by a spec are left out (the
 * grid renders them blank). Ratios return null when the denominator sums to
 * zero. The optional label lands in `label.column`.
 */
export function computeTotalsRow(
  rows: ReadonlyArray<Record<string, unknown>>,
  specs: ReadonlyArray<TotalSpec>,
  label?: { column: string; text: string }
): TotalsRow | undefined {
  if (specs.length === 0) return undefined;
  const totals: TotalsRow = {};
  for (const spec of specs) {
    if (spec.fn === "ratio") {
      const num = sum(numericValues(rows, spec.numerator));
      const den = sum(numericValues(rows, spec.denominator));
      totals[spec.column] = den === 0 ? null : (100 * num) / den;
      continue;
    }
    const values = numericValues(rows, spec.column);
    if (spec.fn === "count") {
      totals[spec.column] = values.length;
      continue;
    }
    if (values.length === 0) {
      totals[spec.column] = null;
      continue;
    }
    switch (spec.fn) {
      case "sum":
        totals[spec.column] = sum(values);
        break;
      case "avg":
        totals[spec.column] = sum(values) / values.length;
        break;
      case "min":
        totals[spec.column] = Math.min(...values);
        break;
      case "max":
        totals[spec.column] = Math.max(...values);
        break;
    }
  }
  if (label) totals[label.column] = label.text;
  return totals;
}

/**
 * Pick where the footer label goes: the first column that is not totaled and
 * holds text in the data (e.g. "School"), otherwise the first column.
 */
export function pickLabelColumn(
  columns: ReadonlyArray<string>,
  specs: ReadonlyArray<TotalSpec>,
  rows: ReadonlyArray<Record<string, unknown>>
): string | undefined {
  if (columns.length === 0) return undefined;
  const totaled = new Set(specs.map((s) => s.column));
  const sample = rows.slice(0, 50);
  for (const column of columns) {
    if (totaled.has(column)) continue;
    const firstNonNull = sample.find((r) => r[column] !== null && r[column] !== undefined);
    if (firstNonNull && typeof firstNonNull[column] === "string" && toNumber(firstNonNull[column]) === null) {
      return column;
    }
  }
  return columns.find((c) => !totaled.has(c)) ?? columns[0];
}

/**
 * Infer whether a column is numeric from the first non-null value in up to
 * 50 rows (a NULL in the first row must not demote a numeric column to text).
 */
export function inferNumericColumn(
  rows: ReadonlyArray<Record<string, unknown>>,
  column: string
): boolean {
  for (const row of rows.slice(0, 50)) {
    const v = row[column];
    if (v === null || v === undefined) continue;
    return typeof v === "number";
  }
  return false;
}
