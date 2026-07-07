import { auth, SessionUser } from "@/auth";
import {
  AuthError,
  assertSchoolAccess,
  userIsAdmin,
  userIsQueryEditor,
} from "@/lib/authorization";

// Re-export so existing callers keep importing these from authGuard.
export { AuthError, assertSchoolAccess };

/**
 * Session-backed authorization for server actions and routes.
 *
 * Server actions are public POST endpoints, so every mutating action must gate
 * on one of these helpers — hiding a button in the UI is not access control.
 * The pure role logic lives in lib/authorization.ts (unit-tested there).
 */

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
  if (!userIsAdmin(user)) {
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
  if (!userIsQueryEditor(user)) {
    throw new AuthError("Query editor access required.");
  }
  return user;
}
