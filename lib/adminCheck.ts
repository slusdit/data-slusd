'use server'

import { auth } from "@/auth"

export default async function adminCheck() {
    const session = await auth()
    if (!session?.user?.admin) {
        return null
    }
    return session
}