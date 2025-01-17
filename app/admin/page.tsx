import adminCheck from "@/lib/adminCheck";
import BackButton from "@/app/components/BackButton";
import QueryBar, { QueryWithCategory } from "../components/QueryBar";
import { PrismaClient } from "@prisma/client";
import AddClassToUserButton from "../components/AddClassToUserButton";
import QueryList from "../components/QueryList";
import QueryAdminGrid from "../components/QueryAdminGrid";
import { toast } from "sonner";
import UserAdminGrid from "../components/UserAdminGrid";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import prisma from "@/lib/db";

type UserRole = {
  id: string;
  rose: 'USER' | 'ADMIN' | 'SUPERADMIN' | 'HR' | 'TEACHER' | 'SITEADMIN' | 'STAFF' ;
}

type UserSchool = {
  school: {
    id: number;
    name: string;
  }
}
export type AdminPageUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  admin: boolean;
  queryEdit: boolean;
  activeSchool: number;
  userRose: UserRole[];
  UserSchool: UserSchool[];
}


export default async function AdminPage() {
  const admin = await adminCheck();

  const queries: QueryWithCategory[] = await prisma.query.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      publicQuery: true,
      createdBy: true,
      query: true,
      chart: true,
      chartXKey: true,
      chartYKey: true,
      chartTypeKey: true,
      chartStackKey: true,
      hiddenCols: true,
      categoryId: true,
      widgetLinkOverride: true,
      chartSeriesOverride: true,

      category: {
        select: {
          id: true,
          // label: true,
          value: true
        },
      },
    },
  });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      // image: true,
      admin: true,
      favorites: true,
      queryEdit: true,
      activeSchool: true,
      userRole: {
        select: {
          id: true,
          role: true,
      }},
      UserSchool: {
        select: {
          school: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    }
  });

  const session = await auth();
  const categories = await prisma.queryCategory.findMany();

  if (!admin) {
    return <div className="">Not an Admin</div>;
  }
  // console.log({ users });

  return (
    <div>
      <BackButton />
      <div className="text-3xl font-bold">Admin</div>
      {/* <QueryBar queries={queries}/>
            <AddClassToUserButton /> */}
      {/* <pre>{JSON.stringify(queries, null, 2)}</pre> */}
      <UserAdminGrid dataIn={users} />
      <div className="my-4">
      <Separator />
      </div>
      <QueryAdminGrid
        dataIn={queries}
        categories={categories}
        session={session}
      />
    </div>
  );
}
