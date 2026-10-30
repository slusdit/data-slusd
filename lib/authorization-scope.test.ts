/**
 * Unit tests for lib/authorization-scope.ts. Run with: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveSchoolScope,
  userMaySetActiveSchool,
  userCanRunQuery,
  userCanSeeCategory,
  userCanAccessAI,
  userCanUploadIep,
  userCanUploadRfep,
} from "./authorization-scope";

test("resolveSchoolScope", async (t) => {
  await t.test("admin with picker 0 is unrestricted, admin with a school is that school", () => {
    assert.equal(resolveSchoolScope({ admin: true, schools: [], activeSchool: 0 }), null);
    assert.deepEqual(resolveSchoolScope({ roles: ["SUPERADMIN"], activeSchool: 16 }), ["16"]);
  });
  await t.test("non-admin with picker 0 gets only their own schools", () => {
    assert.deepEqual(resolveSchoolScope({ schools: ["11", "16"], activeSchool: 0 }), ["11", "16"]);
  });
  await t.test("non-admin active school is intersected with their schools", () => {
    assert.deepEqual(resolveSchoolScope({ schools: ["11", "16"], activeSchool: 16 }), ["16"]);
    assert.deepEqual(
      resolveSchoolScope({ schools: ["11", "16"], activeSchool: 15 }),
      [],
      "tampered picker denies"
    );
  });
  await t.test("non-admin with no schools is denied everywhere", () => {
    assert.deepEqual(resolveSchoolScope({ schools: [], activeSchool: 0 }), []);
    assert.deepEqual(resolveSchoolScope({ activeSchool: 16 }), []);
    assert.deepEqual(resolveSchoolScope(null), []);
  });
});

test("userMaySetActiveSchool", async (t) => {
  await t.test("admins may pick anything non-negative", () => {
    assert.equal(userMaySetActiveSchool({ admin: true }, 0), true);
    assert.equal(userMaySetActiveSchool({ admin: true }, 99), true);
  });
  await t.test("non-admins may pick only their schools, or 0 when they have at least one", () => {
    assert.equal(userMaySetActiveSchool({ schools: ["15"] }, 15), true);
    assert.equal(userMaySetActiveSchool({ schools: ["15"] }, 16), false);
    assert.equal(userMaySetActiveSchool({ schools: ["15"] }, 0), true);
    assert.equal(userMaySetActiveSchool({ schools: [] }, 0), false);
  });
  await t.test("rejects junk values", () => {
    assert.equal(userMaySetActiveSchool({ admin: true }, -1), false);
    assert.equal(userMaySetActiveSchool({ admin: true }, 1.5), false);
    assert.equal(userMaySetActiveSchool(null, 0), false);
  });
});

test("userCanRunQuery", async (t) => {
  const hrQuery = { roles: [{ role: "HR" }], category: { roles: [] } };
  const disciplineCategory = { roles: [], category: { roles: [{ role: "DISCIPLINE" }] } };
  await t.test("admins may run anything", () => {
    assert.equal(userCanRunQuery({ admin: true }, hrQuery), true);
  });
  await t.test("public reports are open to any signed-in user", () => {
    assert.equal(
      userCanRunQuery({ roles: ["TEACHER"] }, { publicQuery: true, roles: [{ role: "HR" }] }),
      true
    );
  });
  await t.test("report roles and category roles both grant access", () => {
    assert.equal(userCanRunQuery({ roles: ["HR"] }, hrQuery), true);
    assert.equal(userCanRunQuery({ roles: ["DISCIPLINE"] }, disciplineCategory), true);
  });
  await t.test("users without a matching role are denied", () => {
    assert.equal(userCanRunQuery({ roles: ["TEACHER"] }, hrQuery), false);
    assert.equal(userCanRunQuery({ roles: ["TEACHER"] }, disciplineCategory), false);
    assert.equal(userCanRunQuery({}, hrQuery), false);
  });
  await t.test("legacy reports with no roles anywhere stay open to signed-in users", () => {
    assert.equal(userCanRunQuery({ roles: ["TEACHER"] }, { roles: [], category: { roles: [] } }), true);
    assert.equal(userCanRunQuery({ roles: ["TEACHER"] }, { roles: [], category: null }), true);
  });
  await t.test("no user or no query is denied", () => {
    assert.equal(userCanRunQuery(null, hrQuery), false);
    assert.equal(userCanRunQuery({ admin: true }, null), false);
  });
});

test("userCanSeeCategory", () => {
  assert.equal(userCanSeeCategory({ roles: ["TEACHER"] }, { roles: [] }), true);
  assert.equal(userCanSeeCategory({ roles: ["TEACHER"] }, { roles: [{ role: "HR" }] }), false);
  assert.equal(userCanSeeCategory({ roles: ["HR"] }, { roles: [{ role: "HR" }] }), true);
  assert.equal(userCanSeeCategory({ admin: true }, { roles: [{ role: "HR" }] }), true);
  assert.equal(userCanSeeCategory(null, { roles: [] }), false);
});

test("userCanAccessAI / userCanUploadIep", () => {
  assert.equal(userCanAccessAI({ admin: true }), true);
  assert.equal(userCanAccessAI({ roles: ["AIQUERY"] }), true);
  assert.equal(userCanAccessAI({ roles: ["SUPERADMIN"] }), true);
  assert.equal(userCanAccessAI({ roles: ["TEACHER"] }), false);
  assert.equal(userCanAccessAI(null), false);
  assert.equal(userCanUploadIep({ roles: ["SPED"] }), true);
  assert.equal(userCanUploadIep({ roles: ["IEPUPLOAD"] }), true);
  assert.equal(userCanUploadIep({ admin: true }), true);
  assert.equal(userCanUploadIep({ roles: ["TEACHER"] }), false);
});

test("userCanUploadRfep", () => {
  assert.equal(userCanUploadRfep({ roles: ["RFEPUPLOAD"] }), true);
  assert.equal(userCanUploadRfep({ admin: true }), true);
  assert.equal(userCanUploadRfep({ roles: ["IEPUPLOAD"] }), false);
  assert.equal(userCanUploadRfep(null), false);
});
