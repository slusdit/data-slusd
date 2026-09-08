import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";
import { Button } from "@/components/ui/button";
import { auth, SessionUser } from "@/auth";
import { QueryCategory } from "@prisma/client";
import type { Session } from "next-auth";
import { QueryWithCategory } from "./QueryBar";
import prisma from "@/lib/db";
import ActiveSchool, { SelectableSchool } from "./ActiveSchool";
import ReportsDropdown from "./ReportsDropdown";
import YearSelector from "./YearSelector";

export default async function MainHeader({
  session,
}: {
  session: Session | null;
}) {
  let schoolInfo;
  let categories: (QueryCategory & { roles: { role: string }[] })[] = [];
  let queries: QueryWithCategory[] = [];
  let selectableSchools: SelectableSchool[] = [];

  if (session?.user) {
    const user = session.user as unknown as SessionUser;
    // Only the schools assigned to this user account: the UserSchool rows and
    // addedSchools/blockedSchools overrides managed in the admin dashboard.
    // No implicit widening — an admin or a district-wide (sc 0) Aeries
    // permission does not by itself put every school in the picker.
    const allowedSchoolCodes = user.schools ?? [];

    // Fetch school info, categories, queries, and the picker's schools in parallel
    const [schoolResult, categoriesResult, queriesResult, selectableResult] = await Promise.all([
      prisma.schoolInfo.findUnique({
        where: {
          sc: session?.user?.activeSchool.toString(),
        },
      }),
      prisma.queryCategory.findMany({
        include: {
          roles: {
            select: { role: true },
          },
        },
        orderBy: { sort: "asc" },
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
              value: true,
            },
          },
        },
        orderBy: { name: "asc" },
      }),
      prisma.schoolInfo.findMany({
        where: { sc: { in: allowedSchoolCodes } },
        select: { sc: true, name: true, logo: true },
        orderBy: { name: "asc" },
      }),
    ]);

    schoolInfo = schoolResult;
    categories = categoriesResult;
    queries = queriesResult;
    selectableSchools = selectableResult;
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
              <Image
                src="/logos/slusd-logo.png"
                alt="logo"
                width={35}
                height={35}
                className="mr-2"
              />
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
                  favorites: (session.user as unknown as SessionUser).favorites || [],
                  roles: (session.user as unknown as SessionUser).roles || [],
                  email: session.user.email || "",
                  queryEdit: (session.user as unknown as SessionUser).queryEdit,
                }}
              />
            </div>
          )}
        </div>

        {/* Center section: Active School (clickable if user has multiple schools) */}
        {schoolInfo && (
          <ActiveSchool
            activeSchool={schoolInfo}
            schools={selectableSchools}
            userId={(session?.user as unknown as SessionUser)?.id}
          />
        )}

        {/* Right section: Year selector and User menu */}
        <div className="flex items-center gap-2 pr-2">
          {session?.user && (
            <YearSelector
              activeDbYear={(session.user as unknown as SessionUser).activeDbYear ?? 26}
              userId={(session.user as unknown as SessionUser).id}
            />
          )}
          <UserMenu
            user={
              session?.user
                ? {
                    id: (session.user as unknown as SessionUser).id,
                    name: session.user.name,
                    email: session.user.email,
                    image: session.user.image,
                    admin: (session.user as unknown as SessionUser).admin,
                    roles: (session.user as unknown as SessionUser).roles,
                  }
                : null
            }
          />
        </div>
      </nav>
    </header>
  );
}
