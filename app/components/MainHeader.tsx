'use client'
import Link from "next/link";
import LoginButton from "./LoginButton";
import { Button } from "@/components/ui/button";
import { SignIn } from "./GoogleSignIn";
import { SignOut } from "./GoogleSignOut";
import GoogleAuthButton from "./GoogleAuthButton";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import type { Session } from "next-auth"
export default function MainHeader({ session }: {session:Session | null}) { 
    
    return (
        <nav
            className="
          flex flex-wrap
          items-center
          justify-between
          bg-title
          text-title-foreground
          w-full
          md:py-0
          px-4
          text-xl
          font-bold
          border-b-2
          border-primary
          

        "
        >
            <div>
                <Button asChild variant="link" className="text-xl text-title-foreground font-bold hover">

                    <Link href="/">
                        Data V2.0
                    </Link>
                </Button>
            </div>
            
            <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                <ul
                    className="
              text-base 
              text-title-foreground
              md:flex
              md:pt-0"
                >
                </ul>
                <div className="py-3">
                    <LoginButton user={session?.user}/>
                </div>
            </div>
        </nav>
    )
}