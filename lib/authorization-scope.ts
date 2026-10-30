/**
 * Scope and report-level authorization predicates (Phase 2, findings S2/S4/S5/S6/S9).
 *
 * Pure like lib/authorization.ts: no session, DB or Next imports, unit-tested
 * in lib/authorization.test.ts. Re-exported from lib/authorization.ts so callers
 * have a single import.
 */
import { AuthzUser, userIsAdmin } from "./authorization";

/** AuthzUser plus the school picker value carried on the session. */
export type ScopedUser =
  | (NonNullable<AuthzUser> & { activeSchool?: number | null })
  | null
  | undefined;

/**
 * The school codes a query must be filtered to for this user.
 *
 * - `null`: unrestricted (an admin with the district-wide picker value 0)
 * - a list: filter to exactly these codes
 * - an empty list: the user may see nothing (deny)
 *
 * The active school is always intersected with the user's own schools, so a
 * tampered `activeSchool` cannot widen scope (findings S2/S10).
 */
export function resolveSchoolScope(user: ScopedUser): string[] | null {
  if (!user) return [];
  const active = user.activeSchool ?? 0;
  const schools = (user.schools ?? []).map(String);
  if (userIsAdmin(user)) {
    return active === 0 ? null : [String(active)];
  }
  if (active === 0) return schools;
  return schools.includes(String(active)) ? [String(active)] : [];
}

/** Whether the user may switch their school picker to `sc` (0 = district-wide). */
export function userMaySetActiveSchool(user: AuthzUser, sc: number): boolean {
  if (!user) return false;
  if (!Number.isInteger(sc) || sc < 0) return false;
  if (userIsAdmin(user)) return true;
  const schools = user.schools ?? [];
  if (sc === 0) return schools.length > 0;
  return schools.includes(String(sc));
}

/** Minimal shape of a saved report (Query) for authorization decisions. */
export type RunnableQuery = {
  publicQuery?: boolean | null;
  roles?: ReadonlyArray<{ role: string }> | null;
  category?: { roles?: ReadonlyArray<{ role: string }> | null } | null;
};

/** Roles that grant access to a report: its own roles plus its category's. */
export function queryRequiredRoles(query: RunnableQuery): string[] {
  return [
    ...(query.roles ?? []).map((r) => r.role),
    ...(query.category?.roles ?? []).map((r) => r.role),
  ];
}

/**
 * Whether the user may run a saved report. Admins always may; public reports
 * are open to any signed-in user; otherwise the user needs one of the roles on
 * the report or its category. A report with no roles anywhere stays open to
 * every signed-in user (legacy behaviour, so existing reports keep working).
 */
export function userCanRunQuery(
  user: AuthzUser,
  query: RunnableQuery | null | undefined
): boolean {
  if (!user || !query) return false;
  if (userIsAdmin(user)) return true;
  if (query.publicQuery) return true;
  const required = queryRequiredRoles(query);
  if (required.length === 0) return true;
  const roles = user.roles ?? [];
  return required.some((role) => roles.includes(role));
}

/** Whether a report category should be listed for the user. */
export function userCanSeeCategory(
  user: AuthzUser,
  category: { roles?: ReadonlyArray<{ role: string }> | null } | null | undefined
): boolean {
  if (!user || !category) return false;
  if (userIsAdmin(user)) return true;
  const required = (category.roles ?? []).map((r) => r.role);
  if (required.length === 0) return true;
  const roles = user.roles ?? [];
  return required.some((role) => roles.includes(role));
}

/** May use the AI query builder and the form-based custom query builder. */
export function userCanAccessAI(user: AuthzUser): boolean {
  if (!user) return false;
  if (userIsAdmin(user)) return true;
  return (user.roles ?? []).includes("AIQUERY");
}

/** May upload IEP documents through the SPED tools. */
export function userCanUploadIep(user: AuthzUser): boolean {
  if (!user) return false;
  if (userIsAdmin(user)) return true;
  const roles = user.roles ?? [];
  return roles.includes("SPED") || roles.includes("IEPUPLOAD");
}

/** May upload student RFEP (reclassification) documents. */
export function userCanUploadRfep(user: AuthzUser): boolean {
  if (!user) return false;
  if (userIsAdmin(user)) return true;
  return (user.roles ?? []).includes("RFEPUPLOAD");
}
