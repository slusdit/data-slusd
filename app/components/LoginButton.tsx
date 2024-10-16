'use client'

// import { signIn, signOut, auth } from "@/auth"
import { SignOutGoogle } from "./GoogleSignOut";
import { SignInGoogle } from "./GoogleSignIn";

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/router";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import SchoolPicker from "./SchoolPicker";

const HandleSignOut = async () => {
    await SignOutGoogle()
    window.location.href = '/'
}

const HandleSignIn = async () => {
    await SignInGoogle()


}

export default function LoginButton({
    user
}: {
    user: User | null
}) {
    const [imgUrl, setImgUrl] = useState<string | null>()

    useEffect(() => {

        setImgUrl(user?.image)
    }, [])

    if (user) {
        if (!imgUrl) {
            setImgUrl(user.image)



        }


        const userInitials = user ? user?.name?.split(" ").map((initial) => initial[0]).join('') : "NA"
        // const userInitials = "NA"

        return (
            <div className="" >
                <Popover>
                    <PopoverTrigger>
                        <Avatar className=" hover:shadow-md hover:shadow-primary border border-secondary">
                            <AvatarImage src={imgUrl} />
                            <AvatarFallback className="bg-popover text-popover-foreground">{userInitials}</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col items-center justify-items-center w-80 bg-popover sm:mr-10 sm:mt-2">
                        <p>Welcome, {user.name}</p>
                        <p className="text-card-foreground/750 font-thin text-sm">{user.email}</p>
                        <div >
                            <div className="w-full">
                            <SchoolPicker schools={user.UserSchool} initialSchool={user.activeSchool} />
                            </div>

                            <div className="flex w-full justify-center my-1 ">

                                {user.admin &&
                                    <Button asChild variant="link" >
                                        <Link href="/admin" className="text-popover-foreground">Admin</Link>
                                    </Button>
                                }

                            </div>
                        </div>
                        <div className="flex w-full justify-between ">
                            <ModeToggle />

                            <Button
                                onClick={HandleSignOut}
                                className=" w-24 mr-24 bg-destructive text-destructive-foreground hover:bg-muted hover:text-muted-foreground "
                            >
                                Sign out
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
    return (
        <div className="m-auto">
            <Button className="bg-primary hover:bg-muted text-primary-foreground hover:text-muted-foreground" onClick={HandleSignIn}>Sign in</Button>
        </div>
    )
}

