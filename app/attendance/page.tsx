import { auth } from "@/auth";

export default async function AttendancePage() {
    const session = await auth();
    
    return (
        <div>
            <h1>Attendance</h1>

            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}