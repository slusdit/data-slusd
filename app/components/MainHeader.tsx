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

const prisma = new PrismaClient();

export default async function MainHeader({ session }: { session: Session | null }) {

  const queries: QueryWithCategory[] = await prisma.query.findMany({
    include: {
      category: {
        select: {
          id: true,
          label: true,
          value: true
        }
      },
    }
  })
  console.log({ queries })

  return (
    <div className="w-full">
      <nav
        className={`
            flex
            h-[4.5rem]
            items-center
            justify-between
            
            bg-title
            text-title-foreground

          mx-auto
          md:py-0
          
          mb-6
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
        {session && (
          
            <div className="">
              <QueryBar queries={queries} />
            </div>
          
        )}
        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
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
          <div className="py-3 px-4">
            <LoginButton user={session?.user} />
          </div>
        </div>
      </nav>
    </div>
  );
}
