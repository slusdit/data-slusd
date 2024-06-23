import { auth } from "@/auth";
import {  SignIn } from "./GoogleSignIn";
import { Button } from "@/components/ui/button";
import SessionLogger from "./SessionLogger";
import { SignOut } from "./GoogleSignOut";
const GoogleAuthButton = async () => {

    const session = await auth()
    if (session) {
        return (
            <div>

            <SignOut />
            {/* <SessionLogger session={session} /> */}
            </div>
        )
    }
        
    return (
        <SignIn />
    );
};

export default GoogleAuthButton