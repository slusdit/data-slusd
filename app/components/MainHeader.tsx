import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";
import { Button } from "@/components/ui/button";
import { auth, SessionUser } from "@/auth";
import { QueryCategory } from "@prisma/client";
import type { Session } from "next-auth";
import { QueryWithCategory } from "./QueryBar";
import prisma from "@/lib/db";
import ActiveSchool from "./ActiveSchool";
import ReportsDropdown from "./ReportsDropdown";

export default async function MainHeader({ session }: { session: Session | null }) {
  let schoolInfo;
  let categories: (QueryCategory & { roles: { role: string }[] })[] = [];
  let queries: QueryWithCategory[] = [];

  if (session?.user) {
    // Fetch school info, categories, and queries in parallel
    const [schoolResult, categoriesResult, queriesResult] = await Promise.all([
      prisma.schoolInfo.findUnique({
        where: {
          sc: session?.user?.activeSchool.toString()
        }
      }),
      prisma.queryCategory.findMany({
        include: {
          roles: {
            select: { role: true }
          }
        },
        orderBy: { sort: "asc" }
      }),
      prisma.query.findMany({
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
        },
        orderBy: { name: "asc" }
      })
    ]);

    schoolInfo = schoolResult;
    categories = categoriesResult;
    queries = queriesResult;
  } 

  // console.log(session.user)
  return (
    <header className="w-full sticky top-0 z-50">
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
        {/* Left section: Logo */}
        <div className="flex items-center">
          <Button
            asChild
            variant="link"
            className="text-xl text-mainTitle-foreground font-bold hover"
          >
            <Link href="/">
              <Image src="/logos/slusd-logo.png" alt="logo" width={35} height={35} className="mr-2" />
              SLUSD Data
            </Link>
          </Button>

          {/* Reports dropdown - desktop only */}
          {session?.user && (
            <div className="hidden md:block ml-2">
              <ReportsDropdown
                categories={categories}
                queries={queries}
                user={{
                  favorites: (session.user as SessionUser).favorites || [],
                  roles: (session.user as SessionUser).roles || [],
                  email: session.user.email || "",
                  queryEdit: (session.user as SessionUser).queryEdit,
                }}
              />
            </div>
          )}
        </div>

        {/* Center section: Active School (clickable if user has multiple schools) */}
        {schoolInfo && (
          <ActiveSchool
            activeSchool={schoolInfo}
            userSchools={(session?.user as SessionUser)?.UserSchool}
            allowedSchoolCodes={(session?.user as SessionUser)?.schools}
            userId={(session?.user as SessionUser)?.id}
          />
        )}

        {/* Right section: User menu */}
        <div className="flex items-center pr-2">
          <UserMenu
            user={session?.user ? {
              id: (session.user as SessionUser).id,
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              admin: (session.user as SessionUser).admin,
              roles: (session.user as SessionUser).roles,
            } : null}
          />
        </div>
      </nav>
    </header>
  );
}
