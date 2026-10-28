/**
 * Application role catalogue.
 *
 * The Prisma `ROLE` enum in prisma/schema.prisma is the source of truth. This
 * module repeats it as a plain array so client components (which cannot import
 * the Prisma runtime) can render role pickers. lib/roles.test.ts fails whenever
 * the two drift apart, so adding a role is a two-line change: the enum and
 * `ROLE_NAMES`. Then run `npx prisma generate` and `npx prisma db push`.
 *
 * Roles reach a user in one of two ways:
 *   - Aeries sync (lib/signinSync.ts) maps the staff member's job title to a
 *     base role on every sign-in. It only ever adds; it never removes.
 *   - An admin assigns roles on the admin Users tab. This is the only path for
 *     people with no Aeries account (board members, outside partners, and so on),
 *     who still sign in with an @slusd.us Google account.
 *
 * Role rows in the database are created on demand by lib/roleRecords.ts so a
 * newly added role is pickable in the admin UI without a seed step.
 */

export const ROLE_NAMES = [
  "USER",
  "ADMIN",
  "SUPERADMIN",
  "HR",
  "TEACHER",
  "SITEADMIN",
  "STAFF",
  "BUSINESS",
  "IT",
  "DISCIPLINE",
  "SECONDARYTEACHER",
  "ELEMENTARYTEACHER",
  "ASSESSMENT",
  "GRADEDISTRIBUTION",
  "DIRECTOR",
  "PRINCIPAL",
  "COUNSELOR",
  "NURSE",
  "LIBRARIAN",
  "INTERVENTIONS",
  "IEPUPLOAD",
  "SPED",
  "AIQUERY",
  "QUERYEDITOR",
  // Non-Aeries roles: assigned by hand only.
  "BOARDMEMBER",
] as const;

export type RoleName = (typeof ROLE_NAMES)[number];

/**
 * Roles a Site Admin may give or take away. Everything else (district-wide,
 * admin-level and non-Aeries roles) is reserved for super admins.
 */
export const SITE_ADMIN_ASSIGNABLE_ROLES: readonly RoleName[] = [
  "USER",
  "TEACHER",
  "STAFF",
  "COUNSELOR",
  "NURSE",
  "LIBRARIAN",
  "GRADEDISTRIBUTION",
  "INTERVENTIONS",
  "AIQUERY",
];

export function isRoleName(value: unknown): value is RoleName {
  return typeof value === "string" && (ROLE_NAMES as readonly string[]).includes(value);
}
