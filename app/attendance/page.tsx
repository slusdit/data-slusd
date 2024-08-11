import { auth } from "@/auth";
import SchoolPicker from "../components/SchoolPicker";


export default async function AttendancePage() {
    const session = await auth();
    
    return (
        <div>
            <h1>Attendance</h1>
            {/* <SchoolPicker schools={session?.user?.school} /> */}

            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}