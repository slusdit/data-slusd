import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SchoolPicker from "../components/SchoolPicker";

export default async function Profile() {

    const session = await auth()
    if (!session?.user) {
        redirect("/");
    }

    return (
        <div>
            <h1>Profile</h1>
            <SchoolPicker
                schools={session?.user?.UserSchool}
                initialSchool={session?.user?.activeSchool}
                label={"Select School"}
            />
            {/* <RenewSchools email={session?.user?.email} /> */}
            
                {/* <Link href="/">Query List</Link> */}

            {/* {session?.user?.admin  &&
            <pre>{JSON.stringify(session, null, 2)}</pre>
            } */}
        </div>
    );
}