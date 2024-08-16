import { auth } from "@/auth";
import GoogleAuthButton from "@/app/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import { Link } from "next/link";
import RenewSchools from "../components/RenewSchools";
import SchoolPicker from "../components/SchoolPicker";

export default async function Profile() {

    const session = await auth()
    console.log({session})

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