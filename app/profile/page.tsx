import { auth } from "@/auth";
import GoogleAuthButton from "@/app/components/GoogleAuthButton";

export default async function Profile() {

    const session = await auth()
    console.log({session})

    return (
        <div>
            <h1>Profile</h1>
            <GoogleAuthButton />
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}