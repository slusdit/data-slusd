import Link from "next/link";
import LoginButton from "./LoginButton";
import { Button } from "@/components/ui/button";
import { SignIn } from "./GoogleSignIn";
import { SignOut } from "./GoogleSignOut";
import GoogleAuthButton from "./GoogleAuthButton";
import { auth } from "@/auth";
import { PrismaClient, QueryCategory } from "@prisma/client";
import type { Session } from "next-auth";
import QueryBar, { QueryWithCategory } from "./QueryBar";
import { NavigationMenuDemo } from "./NavMenuDemo";
import prisma from "@/lib/db";
import SchoolPicker from "./SchoolPicker";
import ActiveSchool from "./ActiveSchool";

// const prisma = new PrismaClient();

export default async function MainHeader({ session }: { session: Session | null }) {

  const queries: QueryWithCategory[] = await prisma.query.findMany({
    select: {
      
        id: true,
        name: true,
        description: true,
        
      
      category: {
        select: {
          id: true,
          label: true,
          value: true
        }
      },
    }
  })
  let schoolInfo;
  if (session?.user) {
  schoolInfo = await prisma.schoolInfo.findUnique({
    where: {
      sc: session?.user?.activeSchool.toString()
    }
  })
} 

  // console.log(session.user)
  return (
    <header className="w-full">
      <nav
        className={`
            flex
            h-[4.5rem]
            items-center
            justify-between
            
            bg-title
            text-title-foreground

          mx-auto
          
          

          text-xl
          font-bold
          border-b
          border-title-foreground/60
          `}
      >
        <div>

          <Button
            asChild
            variant="link"
            className="text-xl text-mainTitle-foreground font-bold hover"
          >
            <Link href="/">Data V2.0</Link>
          </Button>
        </div>
        {schoolInfo && 
        <ActiveSchool activeSchool={schoolInfo} /> 
        // <SchoolPicker schools={session?.user?.UserSchool} initialSchool={session?.user?.activeSchool}/>
        }
       
        <div
          className="w-full justify-end md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul
            className="
                    text-base 
                    text-title-foreground
                    md:flex
                    md:pt-0"
          >
          </ul>
          <div className="py-3 px-4 ">
            <LoginButton user={session?.user} />
          </div>
        </div>
      </nav>
    </header>
  );
}
