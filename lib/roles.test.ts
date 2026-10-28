/**
 * Keeps lib/roles.ts in step with the Prisma ROLE enum.
 *
 * Run with:  npx tsx --test lib/roles.test.ts
 *
 * The admin role pickers render from ROLE_NAMES while the database column is
 * typed by the enum, so a role missing from either side is either unassignable
 * or rejected at save time. Requires `npx prisma generate` to have run.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ROLE } from "@prisma/client";
import { ROLE_NAMES, SITE_ADMIN_ASSIGNABLE_ROLES, isRoleName } from "./roles";

describe("ROLE_NAMES", () => {
  it("matches the Prisma ROLE enum exactly", () => {
    const fromPrisma = Object.values(ROLE).sort();
    const fromModule = [...ROLE_NAMES].sort();
    assert.deepEqual(fromModule, fromPrisma);
  });

  it("has no duplicates", () => {
    assert.equal(new Set(ROLE_NAMES).size, ROLE_NAMES.length);
  });

  it("includes the non-Aeries BOARDMEMBER role", () => {
    assert.ok(isRoleName("BOARDMEMBER"));
  });
});

describe("SITE_ADMIN_ASSIGNABLE_ROLES", () => {
  it("only lists real roles", () => {
    for (const role of SITE_ADMIN_ASSIGNABLE_ROLES) {
      assert.ok(isRoleName(role), `${role} is not a ROLE`);
    }
  });

  it("never lets a site admin hand out admin-level or non-Aeries roles", () => {
    for (const reserved of ["ADMIN", "SUPERADMIN", "SITEADMIN", "QUERYEDITOR", "BOARDMEMBER"]) {
      assert.ok(!SITE_ADMIN_ASSIGNABLE_ROLES.includes(reserved as never), `${reserved} must be super-admin only`);
    }
  });
});
