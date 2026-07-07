import { auth, SessionUser } from "@/auth";
import { ROLE } from "@prisma/client";

/**
 * Thrown when a server action / route is invoked without the required
 * authentication or authorization. Server actions are public POST endpoints,
 * so every mutating action must gate on one of these helpers — hiding a button
 * in the UI is not access control.
 */
export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

/** Returns the current session user, or null if not signed in. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  return (session?.user as SessionUser | undefined) ?? null;
}

/** Require a signed-in user. Throws AuthError otherwise. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new AuthError("You must be signed in.");
  }
  return user;
}

/** Require full admin (user.admin or SUPERADMIN role). */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  const roles = user.roles ?? [];
  if (!user.admin && !roles.includes("SUPERADMIN" as ROLE)) {
    throw new AuthError("Admin access required.");
  }
  return user;
}

/**
 * Require permission to create/edit queries and query categories.
 * Admins, users with the queryEdit flag, or the QUERYEDITOR role qualify.
 */
export async function requireQueryEditor(): Promise<SessionUser> {
  const user = await requireUser();
  const roles = user.roles ?? [];
  if (
    !user.admin &&
    !user.queryEdit &&
    !roles.includes("QUERYEDITOR" as ROLE) &&
    !roles.includes("SUPERADMIN" as ROLE)
  ) {
    throw new AuthError("Query editor access required.");
  }
  return user;
}

/**
 * Assert the given user may access data for a specific school code.
 * Admins bypass; everyone else must have the school in their resolved list.
 */
export function assertSchoolAccess(user: SessionUser, sc: string | number): void {
  if (user.admin) return;
  const schools = user.schools ?? [];
  if (!schools.includes(String(sc))) {
    throw new AuthError("You do not have access to this school.");
  }
}
