'use server'
// Client-callable server actions for the session user's own preferences.
// Anything that syncs from Aeries or writes another user's roles/schools lives
// in lib/signinSync.ts (server-only, not an action) — keep it out of this file.
import prisma from "./db";
import { requireUser } from "./authGuard";
import { AuthError, userMaySetActiveSchool } from "./authorization";

export async function updateActiveSchool(_userId: string, activeSchool: number) {
    // Always act on the authenticated session user — never a caller-supplied id.
    const sessionUser = await requireUser()
    // Only a school the user holds (or 0 = district-wide when they hold at
    // least one); admins may pick anything. A tampered value cannot widen
    // scope (finding S2).
    if (!userMaySetActiveSchool(sessionUser, activeSchool)) {
        throw new AuthError("You do not have access to that school.")
    }
    await prisma.user.update({
        where: {
            id: sessionUser.id
        },
        data: {
            activeSchool
        }
    })
    // Deliberately no redirect() here. Next rejects a server action's promise
    // with a NEXT_REDIRECT error whenever the action redirects, so callers that
    // wrap the call in try/catch saw a "failed" switch even though it had
    // succeeded. The redirect only ever pointed back at the current path, so
    // callers refresh the route themselves instead.
}

export async function updateActiveDbYear(_userId: string, activeDbYear: number) {
    // Always act on the authenticated session user — never a caller-supplied id.
    const sessionUser = await requireUser()
    await prisma.user.update({
        where: {
            id: sessionUser.id
        },
        data: {
            activeDbYear
        }
    })
    // Deliberately no redirect() here. Next rejects a server action's promise
    // with a NEXT_REDIRECT error whenever the action redirects, so callers that
    // wrap the call in try/catch saw a "failed" switch even though it had
    // succeeded. The redirect only ever pointed back at the current path, so
    // callers refresh the route themselves instead.
}

