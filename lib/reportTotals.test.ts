/**
 * Unit tests for lib/reportTotals.ts. Run with: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseTotalColumns,
  computeTotalsRow,
  pickLabelColumn,
  inferNumericColumn,
  toNumber,
} from "./reportTotals";

const UPP_SPEC = "# UPP, # ELL, # FR, # FR (no PDC), Total, UPP %:ratio(# UPP,Total)";

test("parseTotalColumns", async (t) => {
  await t.test("bare names default to sum; ratio keeps its arguments", () => {
    assert.deepEqual(parseTotalColumns(UPP_SPEC), [
      { column: "# UPP", fn: "sum" },
      { column: "# ELL", fn: "sum" },
      { column: "# FR", fn: "sum" },
      { column: "# FR (no PDC)", fn: "sum" },
      { column: "Total", fn: "sum" },
      { column: "UPP %", fn: "ratio", numerator: "# UPP", denominator: "Total" },
    ]);
  });
  await t.test("explicit functions, case-insensitive, with odd spacing", () => {
    assert.deepEqual(parseTotalColumns(" Score : AVG ,Count:count, Low:min,High:MAX"), [
      { column: "Score", fn: "avg" },
      { column: "Count", fn: "count" },
      { column: "Low", fn: "min" },
      { column: "High", fn: "max" },
    ]);
  });
  await t.test("skips unknown functions and empty entries instead of throwing", () => {
    assert.deepEqual(parseTotalColumns("A:median,,B, :sum, C:ratio(x)"), [{ column: "B", fn: "sum" }]);
    assert.deepEqual(parseTotalColumns(""), []);
    assert.deepEqual(parseTotalColumns(null), []);
    assert.deepEqual(parseTotalColumns(undefined), []);
  });
});

test("toNumber", () => {
  assert.equal(toNumber(5), 5);
  assert.equal(toNumber("1,234"), 1234);
  assert.equal(toNumber("12.5%"), 12.5);
  assert.equal(toNumber("Lincoln"), null);
  assert.equal(toNumber(null), null);
  assert.equal(toNumber(""), null);
  assert.equal(toNumber(Number.NaN), null);
});

test("computeTotalsRow", async (t) => {
  const rows = [
    { "Sch#": 2, School: "Garfield", "# UPP": 100, Total: 400 },
    { "Sch#": 3, School: "Jefferson", "# UPP": 50, Total: 100 },
    { "Sch#": 4, School: "Madison", "# UPP": null, Total: 100 },
  ];
  await t.test("sums, ratio over sums, untotaled columns absent, label placed", () => {
    const totals = computeTotalsRow(rows, parseTotalColumns("# UPP, Total, UPP %:ratio(# UPP,Total)"), {
      column: "School",
      text: "Total",
    });
    assert.deepEqual(totals, { "# UPP": 150, Total: 600, "UPP %": 25, School: "Total" });
    assert.equal("Sch#" in totals!, false, "Sch# is deliberately not summed");
  });
  await t.test("avg/min/max/count ignore null cells", () => {
    const totals = computeTotalsRow(rows, parseTotalColumns("# UPP:avg, # UPP:count, Total:min, Total:max"));
    // the last spec for a column wins when the same column is listed twice
    assert.equal(totals!["# UPP"], 2);
    assert.equal(totals!.Total, 400);
  });
  await t.test("avg alone", () => {
    assert.deepEqual(computeTotalsRow(rows, parseTotalColumns("# UPP:avg")), { "# UPP": 75 });
  });
  await t.test("ratio with a zero denominator is null, empty column is null", () => {
    const totals = computeTotalsRow(
      [{ a: 1, b: 0 }, { a: 2, b: null }],
      parseTotalColumns("r:ratio(a,b), b:sum, missing:sum")
    );
    assert.deepEqual(totals, { r: null, b: 0, missing: null });
  });
  await t.test("numeric strings are summed, text is ignored", () => {
    assert.deepEqual(computeTotalsRow([{ n: "10" }, { n: "x" }, { n: "5" }], parseTotalColumns("n")), { n: 15 });
  });
  await t.test("no specs means no footer", () => {
    assert.equal(computeTotalsRow(rows, []), undefined);
  });
  await t.test("empty row set still produces a row with nulls (filtered-to-nothing)", () => {
    assert.deepEqual(computeTotalsRow([], parseTotalColumns("# UPP, UPP %:ratio(# UPP,Total)")), {
      "# UPP": null,
      "UPP %": null,
    });
  });
});

test("pickLabelColumn", () => {
  const rows = [{ "Sch#": 2, School: "Garfield", "# UPP": 1 }];
  const specs = parseTotalColumns("# UPP");
  assert.equal(pickLabelColumn(["Sch#", "School", "# UPP"], specs, rows), "School");
  assert.equal(pickLabelColumn(["Sch#", "# UPP"], specs, rows), "Sch#", "falls back to first untotaled column");
  assert.equal(pickLabelColumn(["# UPP"], specs, rows), "# UPP", "falls back to first column");
  assert.equal(pickLabelColumn([], specs, rows), undefined);
});

test("inferNumericColumn looks past a NULL first row", () => {
  const rows = [{ n: null, s: null }, { n: 3, s: "x" }];
  assert.equal(inferNumericColumn(rows, "n"), true);
  assert.equal(inferNumericColumn(rows, "s"), false);
  assert.equal(inferNumericColumn([], "n"), false);
});
