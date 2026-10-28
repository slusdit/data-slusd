/**
 * Role catalogue helpers.
 *
 * Roles are rows in the `Role` table (prisma/schema.prisma). A role's `role`
 * column is its machine name, e.g. "SUPERADMIN"; that string is what sits in
 * the session's `roles` array and what the authorization predicates compare.
 *
 * Two kinds of role exist:
 *
 *   - System roles (`SYSTEM_ROLES` below, `isSystem = true` in the table). The
 *     code checks these by name, or the Aeries sign-in sync assigns them from a
 *     job title, so they must always exist. lib/roleRecords.ts seeds them on
 *     admin page load and the Roles tab refuses to delete them.
 *
 *   - Data roles. Everything else, created by a super admin on the admin Roles
 *     tab. They matter only for report-category access and carry no behaviour
 *     in code. Board members, outside partners and other people with no Aeries
 *     account get their access this way.
 *
 * This module has no Prisma or server imports so client components can use it.
 */

export type RoleSeed = {
  role: string;
  label: string;
  description: string;
};

/** A Role row as the admin Roles tab sees it (produced by lib/roleRecords.ts). */
export type RoleRow = {
  id: string;
  role: string;
  label: string;
  description: string | null;
  isSystem: boolean;
  userCount: number;
  primaryUserCount: number;
  categoryCount: number;
  queryCount: number;
};

/** Roles the code depends on by name. Keep in step with the checks they describe. */
export const SYSTEM_ROLES = [
  { role: "USER", label: "User", description: "Default role for every signed-in account." },
  { role: "SUPERADMIN", label: "Super Admin", description: "Full access to every school, report and admin tool." },
  { role: "SITEADMIN", label: "Site Admin", description: "Manages users at their own schools from the admin Users tab." },
  { role: "PRINCIPAL", label: "Principal", description: "Aeries title role; also grants site-admin access and grade distribution." },
  { role: "QUERYEDITOR", label: "Query Editor", description: "Creates and edits saved reports, categories and AI fragments." },
  { role: "AIQUERY", label: "AI Query", description: "May use the AI query builder." },
  { role: "GRADEDISTRIBUTION", label: "Grade Distribution", description: "May open the grade distribution analysis." },
  { role: "ASSESSMENT", label: "Assessment", description: "May open the assessment pages." },
  { role: "INTERVENTIONS", label: "Interventions", description: "May open student intervention tracking." },
  { role: "SPED", label: "Special Education", description: "May upload IEP documents through the SPED tools." },
  { role: "IEPUPLOAD", label: "IEP Upload", description: "May upload IEP documents." },
  { role: "TEACHER", label: "Teacher", description: "Aeries title role. Class rosters are synced at sign-in." },
  { role: "COUNSELOR", label: "Counselor", description: "Aeries title role." },
  { role: "NURSE", label: "Nurse", description: "Aeries title role." },
  { role: "LIBRARIAN", label: "Librarian", description: "Aeries title role." },
  { role: "DIRECTOR", label: "Director", description: "Aeries title role (directors and assistant superintendents)." },
  { role: "STAFF", label: "Staff", description: "Aeries title role for any other district employee." },
] as const satisfies readonly RoleSeed[];

export type SystemRoleName = (typeof SYSTEM_ROLES)[number]["role"];

export const SYSTEM_ROLE_NAMES: readonly SystemRoleName[] = SYSTEM_ROLES.map((r) => r.role);

/**
 * Roles a Site Admin may give or take away. Everything else (district-wide,
 * admin-level and hand-created roles) is reserved for super admins.
 */
export const SITE_ADMIN_ASSIGNABLE_ROLES: readonly string[] = [
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

/** Machine names: upper-case letters, digits and underscores, 2 to 40 characters, starting with a letter. */
export const ROLE_NAME_PATTERN = /^[A-Z][A-Z0-9_]{1,39}$/;

/** Upper-cases and trims a typed name so "board member" becomes "BOARD_MEMBER". */
export function normalizeRoleName(input: string): string {
  return input.trim().toUpperCase().replace(/[\s-]+/g, "_");
}

export function isValidRoleName(name: string): boolean {
  return ROLE_NAME_PATTERN.test(name);
}

export function isSystemRoleName(name: string): name is SystemRoleName {
  return (SYSTEM_ROLE_NAMES as readonly string[]).includes(name);
}

/** "Board Member (BOARDMEMBER)" when a label exists, else the bare name. */
export function formatRole(role: { role: string; label?: string | null }): string {
  const label = role.label?.trim();
  return label && label !== role.role ? `${label} (${role.role})` : role.role;
}
