import { auth } from "@/auth";
import GoogleAuthButton from "@/app/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import { Link } from "next/link";

export default async function Profile() {

    const session = await auth()
    console.log({session})

    return (
        <div>
            <h1>Profile</h1>
            <GoogleAuthButton />
            
                {/* <Link href="/">Query List</Link> */}

            {session?.user?.admin  &&
            <pre>{JSON.stringify(session, null, 2)}</pre>
            }
        </div>
    );
}