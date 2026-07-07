/**
 * Unit tests for the pure authorization predicates in lib/authorization.ts.
 *
 * Run with:  npx tsx --test lib/authorization.test.ts
 *
 * These guard against the privilege-escalation class of bugs the security audit
 * found, so the negative/deny cases are the important ones. Colocated here
 * because the /tests directory is gitignored.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AuthError,
  userIsAdmin,
  userIsQueryEditor,
  userIsSiteAdmin,
  userCanAccessSchool,
  assertSchoolAccess,
} from "./authorization";

test("userIsAdmin", async (t) => {
  await t.test("true for the admin flag", () => {
    assert.equal(userIsAdmin({ admin: true }), true);
  });
  await t.test("true for the SUPERADMIN role without the flag", () => {
    assert.equal(userIsAdmin({ admin: false, roles: ["SUPERADMIN"] }), true);
  });
  await t.test("false for a non-admin role", () => {
    assert.equal(userIsAdmin({ admin: false, roles: ["TEACHER"] }), false);
  });
  await t.test("false for site-admin/query-editor roles", () => {
    assert.equal(userIsAdmin({ roles: ["SITEADMIN", "QUERYEDITOR"] }), false);
  });
  await t.test("false for null/undefined/empty", () => {
    assert.equal(userIsAdmin(null), false);
    assert.equal(userIsAdmin(undefined), false);
    assert.equal(userIsAdmin({}), false);
  });
});

test("userIsQueryEditor", async (t) => {
  await t.test("true for admin, queryEdit flag, or the roles", () => {
    assert.equal(userIsQueryEditor({ admin: true }), true);
    assert.equal(userIsQueryEditor({ queryEdit: true }), true);
    assert.equal(userIsQueryEditor({ roles: ["QUERYEDITOR"] }), true);
    assert.equal(userIsQueryEditor({ roles: ["SUPERADMIN"] }), true);
  });
  await t.test("false for an ordinary user", () => {
    assert.equal(userIsQueryEditor({ admin: false, queryEdit: false, roles: ["TEACHER"] }), false);
    assert.equal(userIsQueryEditor(null), false);
  });
  await t.test("site admin alone is not a query editor", () => {
    assert.equal(userIsQueryEditor({ roles: ["SITEADMIN"] }), false);
  });
});

test("userIsSiteAdmin", async (t) => {
  await t.test("true for SITEADMIN or PRINCIPAL", () => {
    assert.equal(userIsSiteAdmin({ roles: ["SITEADMIN"] }), true);
    assert.equal(userIsSiteAdmin({ roles: ["PRINCIPAL"] }), true);
  });
  await t.test("false otherwise", () => {
    assert.equal(userIsSiteAdmin({ admin: true, roles: [] }), false);
    assert.equal(userIsSiteAdmin(null), false);
  });
});

test("userCanAccessSchool", async (t) => {
  await t.test("admins bypass the school list", () => {
    assert.equal(userCanAccessSchool({ admin: true, schools: [] }, "16"), true);
    assert.equal(userCanAccessSchool({ roles: ["SUPERADMIN"] }, 99), true);
  });
  await t.test("non-admin allowed only for schools in their list", () => {
    assert.equal(userCanAccessSchool({ schools: ["11", "16"] }, "16"), true);
    assert.equal(userCanAccessSchool({ schools: ["11", "16"] }, 11), true, "numeric sc coerced");
    assert.equal(userCanAccessSchool({ schools: ["11", "16"] }, "12"), false);
  });
  await t.test("non-admin with no schools is denied", () => {
    assert.equal(userCanAccessSchool({ schools: [] }, "16"), false);
    assert.equal(userCanAccessSchool({}, "16"), false);
    assert.equal(userCanAccessSchool(null, "16"), false);
  });
});

test("assertSchoolAccess", async (t) => {
  await t.test("throws AuthError when access is denied", () => {
    assert.throws(() => assertSchoolAccess({ schools: ["11"] }, "16"), AuthError);
    assert.throws(() => assertSchoolAccess(null, "16"), AuthError);
  });
  await t.test("does not throw when access is granted", () => {
    assert.doesNotThrow(() => assertSchoolAccess({ schools: ["16"] }, "16"));
    assert.doesNotThrow(() => assertSchoolAccess({ admin: true }, "16"));
  });
});
