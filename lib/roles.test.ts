/**
 * Guards for the role catalogue helpers in lib/roles.ts.
 *
 * Run with:  npx tsx --test lib/roles.test.ts
 *
 * The code checks a handful of roles by name; if one of those is missing from
 * SYSTEM_ROLES it will never be seeded and the check can never pass.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SYSTEM_ROLES,
  SYSTEM_ROLE_NAMES,
  SITE_ADMIN_ASSIGNABLE_ROLES,
  isSystemRoleName,
  isValidRoleName,
  normalizeRoleName,
  formatRole,
} from "./roles";

// Every role name that appears in an authorization check or a layout guard.
const CODE_CHECKED_ROLES = [
  "SUPERADMIN",
  "SITEADMIN",
  "PRINCIPAL",
  "QUERYEDITOR",
  "AIQUERY",
  "GRADEDISTRIBUTION",
  "ASSESSMENT",
  "INTERVENTIONS",
  "SPED",
  "IEPUPLOAD",
];

// Targets of the Aeries title map in lib/signinSync.ts plus the default role.
const SIGNIN_ROLES = ["USER", "TEACHER", "PRINCIPAL", "COUNSELOR", "NURSE", "LIBRARIAN", "DIRECTOR", "SUPERADMIN", "STAFF"];

describe("SYSTEM_ROLES", () => {
  it("covers every role the code checks by name", () => {
    for (const role of [...CODE_CHECKED_ROLES, ...SIGNIN_ROLES]) {
      assert.ok(isSystemRoleName(role), `${role} must be a system role`);
    }
  });

  it("has unique, valid machine names and non-empty labels", () => {
    assert.equal(new Set(SYSTEM_ROLE_NAMES).size, SYSTEM_ROLES.length);
    for (const seed of SYSTEM_ROLES) {
      assert.ok(isValidRoleName(seed.role), `${seed.role} is not a valid name`);
      assert.ok(seed.label.length > 0, `${seed.role} needs a label`);
    }
  });
});

describe("SITE_ADMIN_ASSIGNABLE_ROLES", () => {
  it("only lists system roles", () => {
    for (const role of SITE_ADMIN_ASSIGNABLE_ROLES) {
      assert.ok(isSystemRoleName(role), `${role} is not a system role`);
    }
  });

  it("never lets a site admin hand out admin-level roles", () => {
    for (const reserved of ["ADMIN", "SUPERADMIN", "SITEADMIN", "QUERYEDITOR", "PRINCIPAL"]) {
      assert.ok(!SITE_ADMIN_ASSIGNABLE_ROLES.includes(reserved), `${reserved} must be super-admin only`);
    }
  });
});

describe("role name validation", () => {
  it("accepts upper-case identifiers", () => {
    for (const ok of ["BOARDMEMBER", "BOARD_MEMBER", "PARTNER2", "AB"]) {
      assert.ok(isValidRoleName(ok), ok);
    }
  });

  it("rejects lower case, spaces, punctuation, leading digits and bad lengths", () => {
    for (const bad of ["board", "BOARD MEMBER", "BOARD-MEMBER", "2FA", "A", "", "X".repeat(41)]) {
      assert.ok(!isValidRoleName(bad), JSON.stringify(bad));
    }
  });

  it("normalizes typed input into a machine name", () => {
    assert.equal(normalizeRoleName("  board member "), "BOARD_MEMBER");
    assert.equal(normalizeRoleName("Board-Member"), "BOARD_MEMBER");
    assert.equal(normalizeRoleName("boardmember"), "BOARDMEMBER");
  });
});

describe("formatRole", () => {
  it("shows the label with the name, or just the name", () => {
    assert.equal(formatRole({ role: "BOARDMEMBER", label: "Board Member" }), "Board Member (BOARDMEMBER)");
    assert.equal(formatRole({ role: "STAFF", label: "" }), "STAFF");
    assert.equal(formatRole({ role: "STAFF", label: "STAFF" }), "STAFF");
    assert.equal(formatRole({ role: "STAFF" }), "STAFF");
  });
});
