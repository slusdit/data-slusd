/**
 * Pure authorization predicates.
 *
 * Deliberately free of any session/DB/NextAuth imports so the role logic can be
 * unit-tested in isolation (see tests/authorization.test.ts). lib/authGuard.ts
 * layers `auth()` on top of these to gate server actions and routes.
 */

export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

/** Minimal shape needed for authorization decisions. */
export type AuthzUser =
  | {
      admin?: boolean | null;
      queryEdit?: boolean | null;
      roles?: readonly string[] | null;
      schools?: readonly string[] | null;
    }
  | null
  | undefined;

/** Full admin: the admin flag or the SUPERADMIN role. */
export function userIsAdmin(user: AuthzUser): boolean {
  if (!user) return false;
  return Boolean(user.admin) || (user.roles ?? []).includes("SUPERADMIN");
}

/** May create/edit queries and query categories. */
export function userIsQueryEditor(user: AuthzUser): boolean {
  if (!user) return false;
  const roles = user.roles ?? [];
  return (
    Boolean(user.admin) ||
    Boolean(user.queryEdit) ||
    roles.includes("QUERYEDITOR") ||
    roles.includes("SUPERADMIN")
  );
}

/** May reach the admin dashboard (any admin tier). */
export function userIsSiteAdmin(user: AuthzUser): boolean {
  if (!user) return false;
  const roles = user.roles ?? [];
  return roles.includes("SITEADMIN") || roles.includes("PRINCIPAL");
}

/** Whether the user may access data for a given school code. Admins bypass. */
export function userCanAccessSchool(user: AuthzUser, sc: string | number): boolean {
  if (!user) return false;
  if (userIsAdmin(user)) return true;
  return (user.schools ?? []).includes(String(sc));
}

/** Throwing variant of userCanAccessSchool. */
export function assertSchoolAccess(user: AuthzUser, sc: string | number): void {
  if (!userCanAccessSchool(user, sc)) {
    throw new AuthError("You do not have access to this school.");
  }
}
