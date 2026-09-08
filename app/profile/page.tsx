import { auth, SessionUser } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ActiveSchool from "../components/ActiveSchool";
import YearSelector from "../components/YearSelector";

/**
 * Profile: the same school picker as the header, fed from the user's
 * effective schools (UserSchool rows plus admin overrides), so the two
 * pickers can no longer disagree (finding U3).
 */
export default async function Profile() {
    const session = await auth()
    if (!session?.user) {
        redirect("/");
    }
    const user = session.user as SessionUser;
    const allowedSchoolCodes = user.schools ?? [];

    const [schools, current] = await Promise.all([
        prisma.schoolInfo.findMany({
            where: { sc: { in: allowedSchoolCodes } },
            select: { sc: true, name: true, logo: true },
            orderBy: { name: "asc" },
        }),
        prisma.schoolInfo.findUnique({
            where: { sc: String(user.activeSchool) },
            select: { sc: true, name: true, logo: true },
        }),
    ]);

    const activeSchool = current ?? { sc: String(user.activeSchool), name: user.activeSchool === 0 ? "All schools" : `School ${user.activeSchool}`, logo: null };

    return (
        <div className="container mx-auto py-6">
            <h1 className="mb-6 text-3xl font-bold">Profile</h1>
            <div className="bg-card max-w-md rounded-lg border p-6 space-y-6">
                <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium">Active school</p>
                    <ActiveSchool activeSchool={activeSchool} schools={schools} userId={user.id} variant="card" />
                    {schools.length <= 1 && (
                        <p className="text-muted-foreground text-xs">You have access to one school.</p>
                    )}
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium">School year</p>
                    <YearSelector activeDbYear={user.activeDbYear} userId={user.id} />
                </div>
            </div>
        </div>
    );
}
