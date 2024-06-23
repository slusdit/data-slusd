import { auth } from "@/auth";
import {  SignIn } from "./GoogleSignIn";
import { Button } from "@/components/ui/button";
import SessionLogger from "./SessionLogger";
const GoogleAuthButton = async () => {

    const session = await auth()
    return (
        <SessionLogger session={session} />
    );
};

export default GoogleAuthButton