/**
 * Unit tests for lib/sql-guard.ts. Run with: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  stripSqlComments,
  hasStatementSeparator,
  findDangerousKeywords,
  validateQueryWhitelist,
  validateSchoolCodes,
} from "./sql-guard";

test("stripSqlComments", async (t) => {
  await t.test("removes line and block comments", () => {
    assert.equal(
      stripSqlComments("select 1 -- trailing\n/* block */ from t").replace(/\s+/g, " ").trim(),
      "select 1 from t"
    );
  });
  await t.test("leaves comment markers inside string literals alone", () => {
    const sql = "select '--not a comment', '/*keep*/', 'it''s' from t";
    assert.equal(stripSqlComments(sql), sql);
  });
  await t.test("does not swallow SQL after a comment the way the old regex did", () => {
    const out = stripSqlComments("select a, -- note\n b, c from t");
    assert.match(out, /select a,\s+b, c from t/);
  });
});

test("hasStatementSeparator", () => {
  assert.equal(hasStatementSeparator("select 1"), false);
  assert.equal(hasStatementSeparator("select ';' from t"), false);
  assert.equal(hasStatementSeparator("select 1; drop table t"), true);
});

test("findDangerousKeywords", () => {
  assert.deepEqual(findDangerousKeywords("select * from t where x = 1"), []);
  assert.deepEqual(findDangerousKeywords("select 1; waitfor delay '0:0:5'"), ["waitfor"]);
  assert.deepEqual(findDangerousKeywords("select * from openrowset(...)"), ["openrowset"]);
  assert.deepEqual(findDangerousKeywords("select updated_at from t"), [], "word boundary respected");
});

test("validateQueryWhitelist", async (t) => {
  await t.test("accepts SELECT, WITH and UNION queries", () => {
    assert.doesNotThrow(() => validateQueryWhitelist("SELECT sc FROM stu"));
    assert.doesNotThrow(() => validateQueryWhitelist("WITH c AS (SELECT 1 x) SELECT x FROM c"));
    assert.doesNotThrow(() => validateQueryWhitelist("SELECT 1 UNION ALL SELECT 2"));
  });
  await t.test("tolerates one trailing semicolon and comments", () => {
    assert.doesNotThrow(() => validateQueryWhitelist("-- report\nSELECT 1;\n"));
  });
  await t.test("rejects a second statement even after a comment or in odd casing", () => {
    assert.throws(() => validateQueryWhitelist("SELECT 1; DROP TABLE stu"), /multiple statements/);
    assert.throws(() => validateQueryWhitelist("SELECT 1; /* x */ SeLeCt 2"), /multiple statements/);
  });
  await t.test("accepts DECLARE @variable statements before the SELECT", () => {
    assert.doesNotThrow(() =>
      validateQueryWhitelist(
        "DECLARE @YearsBack INT = 4; -- note\nDECLARE @From DATE = DATEFROMPARTS(2022, 10, 1);\n" +
          "WITH c AS (SELECT 1 x) SELECT x FROM c WHERE x < @YearsBack;"
      )
    );
    assert.doesNotThrow(() => validateQueryWhitelist("DECLARE @a INT = 1, @b VARCHAR(3) = ';'; SELECT @a, @b"));
  });
  await t.test("still rejects other statements and dangerous keywords around DECLARE", () => {
    assert.throws(() => validateQueryWhitelist("DECLARE @a INT = 1; DELETE FROM stu"), /delete|Only SELECT/);
    assert.throws(() => validateQueryWhitelist("DECLARE @a INT = 1; SELECT 1; SELECT 2"), /multiple statements/);
    assert.throws(() => validateQueryWhitelist("DECLARE @s NVARCHAR(9) = 'x'; EXEC (@s)"), /Only SELECT|exec/);
    assert.throws(() => validateQueryWhitelist("DECLARE @a INT = 1; DECLARE @b INT = 2"), /Only SELECT/);
    assert.throws(() => validateQueryWhitelist("SELECT 1; DECLARE @a INT = 1; SELECT 2"), /multiple statements/);
  });
  await t.test("allows a semicolon inside a string literal", () => {
    assert.doesNotThrow(() => validateQueryWhitelist("SELECT ';' AS sep FROM stu"));
  });
  await t.test("rejects non-SELECT statements and dangerous keywords", () => {
    assert.throws(() => validateQueryWhitelist("DELETE FROM stu"), /Only SELECT/);
    assert.throws(() => validateQueryWhitelist("SELECT * FROM OPENQUERY(x, 'y')"), /openquery/);
    assert.throws(() => validateQueryWhitelist("SELECT 1 WAITFOR DELAY '0:0:5'"), /waitfor/);
    assert.throws(() => validateQueryWhitelist("SELECT 1 FROM OPENDATASOURCE('a','b').c"), /opendatasource/);
  });
  await t.test("rejects empty or comment-only input", () => {
    assert.throws(() => validateQueryWhitelist("  -- nothing\n"), /empty/);
  });
});

test("validateSchoolCodes", () => {
  assert.deepEqual(validateSchoolCodes(["16", 11, " 2 "]), [16, 11, 2]);
  assert.deepEqual(validateSchoolCodes("16"), [16]);
  assert.deepEqual(validateSchoolCodes(undefined), []);
  assert.throws(() => validateSchoolCodes(["16 OR 1=1"]), /Invalid school code/);
  assert.throws(() => validateSchoolCodes(["16abc"]), /Invalid school code/);
  assert.throws(() => validateSchoolCodes([1.5]), /Invalid school code/);
});
