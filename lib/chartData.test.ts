import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { aggregateByCategory, toChartNumber } from "./chartData";

describe("toChartNumber", () => {
  it("parses numbers and numeric strings", () => {
    assert.equal(toChartNumber(12), 12);
    assert.equal(toChartNumber("12"), 12);
    assert.equal(toChartNumber(" 1,250 "), 1250);
    assert.equal(toChartNumber("87.5%"), 87.5);
  });
  it("returns undefined for blanks and text", () => {
    assert.equal(toChartNumber(""), undefined);
    assert.equal(toChartNumber(null), undefined);
    assert.equal(toChartNumber("Garfield"), undefined);
    assert.equal(toChartNumber(NaN), undefined);
  });
});

describe("aggregateByCategory", () => {
  const rows = [
    { Date: "08/13/2026", SC: "1", Tardy: 5, Absent: "2" },
    { Date: "08/13/2026", SC: "2", Tardy: 3, Absent: "1" },
    { Date: "08/14/2026", SC: "1", Tardy: 7, Absent: "" },
    { Date: "08/14/2026", SC: "2", Tardy: 1, Absent: "4" },
    { Date: "", SC: "3", Tardy: 99, Absent: "99" },
  ];

  it("sums every y key per category in first-seen order", () => {
    const out = aggregateByCategory(rows, "Date", ["Tardy", "Absent"]);
    assert.deepEqual(
      out.map((r) => [r.Date, r.Tardy, r.Absent]),
      [
        ["08/13/2026", 8, 3],
        ["08/14/2026", 8, 4],
      ]
    );
  });

  it("keeps the first row's other columns", () => {
    const out = aggregateByCategory(rows, "Date", ["Tardy"]);
    assert.equal(out[0].SC, "1");
  });

  it("returns the input untouched when categories are unique", () => {
    const single = rows.filter((r) => r.SC === "1");
    assert.equal(aggregateByCategory(single, "Date", ["Tardy"]), single);
  });

  it("leaves non-numeric y values alone when nothing numeric is summed", () => {
    const text = [
      { Date: "a", Label: "x" },
      { Date: "a", Label: "y" },
    ];
    assert.deepEqual(aggregateByCategory(text, "Date", ["Label"]), [{ Date: "a", Label: "x" }]);
  });

  it("is a no-op without an x key or y keys", () => {
    assert.equal(aggregateByCategory(rows, "", ["Tardy"]), rows);
    assert.equal(aggregateByCategory(rows, "Date", []), rows);
  });
});
