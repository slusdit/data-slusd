import { auth, SessionUser } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/emulate
 * Start emulating another user (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const user = session?.user as SessionUser | undefined;

    // Only admins can emulate
    if (!user?.admin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Verify the target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get the real user ID (in case we're already emulating)
    const realUserId = user.realUser?.id || user.id;

    // Update the real user's emulatingId using raw SQL to avoid Prisma type issues
    // until prisma generate is run with the new schema
    await prisma.$executeRaw`UPDATE User SET emulatingId = ${userId} WHERE id = ${realUserId}`;

    return NextResponse.json({
      success: true,
      message: `Now viewing as ${targetUser.name}`,
      emulatingUser: targetUser,
    });
  } catch (error) {
    console.error("Emulation error:", error);
    return NextResponse.json(
      { error: "Failed to start emulation" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/emulate
 * Stop emulating and return to own account
 */
export async function DELETE() {
  try {
    const session = await auth();
    const user = session?.user as SessionUser | undefined;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the real user ID
    const realUserId = user.realUser?.id || user.id;

    // Clear the emulatingId using raw SQL to avoid Prisma type issues
    await prisma.$executeRaw`UPDATE User SET emulatingId = NULL WHERE id = ${realUserId}`;

    return NextResponse.json({
      success: true,
      message: "Returned to your account",
    });
  } catch (error) {
    console.error("Stop emulation error:", error);
    return NextResponse.json(
      { error: "Failed to stop emulation" },
      { status: 500 }
    );
  }
}
