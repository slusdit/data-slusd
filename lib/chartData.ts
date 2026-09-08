/**
 * Chart data helpers shared by the dashboard favourites and the report chart tab.
 *
 * Reports scoped to the whole district return one row per school per category
 * value (for example one row per school per date). A category axis plots every
 * row, so repeated categories draw a zig-zag back and forth over the same
 * x position and area/line charts turn into overlapping noise. Charts want one
 * point per category, so duplicate categories are summed here.
 */

export type ChartRow = Record<string, unknown>;

/** Parse a cell into a number; returns undefined for blanks and non-numeric text. */
export function toChartNumber(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    const parsed = Number(trimmed.replace(/[,%$]/g, ""));
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

/**
 * Collapse rows that share the same `xKey` value into one row per category,
 * summing every `yKey`. Category order is the order of first appearance.
 * Rows without an x value are dropped. Non-numeric y cells count as 0 when a
 * category has any numeric value, and stay untouched when none do. Other
 * columns keep the first row's value.
 *
 * Rows are returned unchanged when there are no duplicate categories, so
 * single-school reports keep their original rows (and any extra columns
 * used by tooltips).
 */
export function aggregateByCategory(rows: ChartRow[], xKey: string, yKeys: string[]): ChartRow[] {
  if (!xKey || !yKeys.length || rows.length < 2) return rows;

  const groups = new Map<string, { row: ChartRow; sums: Map<string, number | undefined> }>();
  let duplicates = false;

  for (const row of rows) {
    const rawX = row[xKey];
    if (rawX === null || rawX === undefined || rawX === "") continue;
    const x = String(rawX);
    const existing = groups.get(x);
    if (!existing) {
      const sums = new Map<string, number | undefined>();
      for (const key of yKeys) sums.set(key, toChartNumber(row[key]));
      groups.set(x, { row, sums });
      continue;
    }
    duplicates = true;
    for (const key of yKeys) {
      const n = toChartNumber(row[key]);
      if (n === undefined) continue;
      existing.sums.set(key, (existing.sums.get(key) ?? 0) + n);
    }
  }

  if (!duplicates) return rows;

  return Array.from(groups.values()).map(({ row, sums }) => {
    const out: ChartRow = { ...row };
    for (const key of yKeys) {
      const sum = sums.get(key);
      if (sum !== undefined) out[key] = sum;
    }
    return out;
  });
}
