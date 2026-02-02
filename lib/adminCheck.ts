'use server'

import { auth, SessionUser } from "@/auth"

export type AdminCheckResult = {
    session: { user: SessionUser } | null
    isSuperAdmin: boolean
    isSiteAdmin: boolean
    isQueryEditor: boolean
    canAccessAdmin: boolean
    userSchools: string[]
}

/**
 * Checks admin permissions for the current user
 * Returns detailed permission info for different admin levels:
 * - SuperAdmin: Full access to everything
 * - SiteAdmin: Can manage users at their assigned schools only
 * - QueryEditor: Can access Query and AI Fragment tabs
 */
export default async function adminCheck(): Promise<AdminCheckResult | null> {
    const session = await auth()

    if (!session?.user) {
        return null
    }

    const user = session.user as unknown as SessionUser
    const roles = user.roles || []
    const userSchools = user.schools || []

    const isSuperAdmin = user.admin || roles.includes('SUPERADMIN')
    const isSiteAdmin = roles.includes('SITEADMIN') || roles.includes('PRINCIPAL')
    const isQueryEditor = user.queryEdit || roles.includes('QUERYEDITOR')

    // Only users with admin=true can access admin page
    const canAccessAdmin = user.admin === true

    if (!canAccessAdmin) {
        return null
    }

    return {
        session: session as { user: SessionUser },
        isSuperAdmin,
        isSiteAdmin,
        isQueryEditor,
        canAccessAdmin,
        userSchools
    }
}

/**
 * Simple check for legacy compatibility - returns session if user has any admin access
 */
export async function simpleAdminCheck() {
    const result = await adminCheck()
    return result?.session || null
}
