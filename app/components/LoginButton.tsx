'use client'

import { signIn, signOut, auth } from "@/auth"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function LoginButton() {
    const { data: session } = useSession();
    if (session) {
    
    const imgUrl = session?.user?.image ? session.user.image : undefined  

    const userInitials = session.user ? session?.user?.name?.split(" ").map((initial) => initial[0]).join('') : "NA"
    // const userInitials = "NA"
            
        return(
            <div >
                <Popover>
                    <PopoverTrigger>
                    <Avatar className=" hover:shadow-md hover:shadow-primary">
                        <AvatarImage src={imgUrl} />
                        <AvatarFallback className="text-foreground bg-background">{userInitials}</AvatarFallback>                  
                    </Avatar> 
                    </PopoverTrigger>
                    <PopoverContent className="grid justify-items-center w-80 bg-popover">
                        <p>Welcome, {session?.user?.name}</p>
                        <div className="py-2">

                        <ModeToggle />
                        <Button asChild variant="link" >
                        <Link href="/profile" className="text-popover-foreground">User Profile</Link>

                        </Button>
                        </div>
                        <Button  
                            onClick={() => signOut()}
                            className="m-auto bg-destructive text-destructive-foreground hover:bg-muted hover:text-muted-foreground "
                            >
                            Sign out
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
    return(
        <div className="m-auto">
            <Button className="bg-primary hover:bg-muted text-primary-foreground hover:text-muted-foreground" onClick={() => signIn()}>Sign in</Button>
        </div>
    )
}

