import { auth } from "@/auth";
import { QueryWithCategory } from "./components/QueryBar";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import SchoolEnrollmentGraph from "./components/SchoolEnrollmentGraph";
import { AttendanceOverTimeChart } from "./components/charts/AttendanceOverTime";
import { getQueryData } from "@/lib/getQuery";
import Sidebar from "./components/Sidebar";
import FavoritesSectionGrid from "./components/FavoritesSectionGrid";

// const prisma = new PrismaClient();
export default async function Home() {
  const session = await auth();
  const queries: QueryWithCategory[] = await prisma.query.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      publicQuery: true,
      createdBy: true,

      category: {
        select: {
          // id: true,
          // label: true,
          value: true,
        },
      },
    },
  });

  let categories;
  if (session?.user) {
    categories = await prisma.queryCategory.findMany({
      include: {
        queries: true,
        roles: true,
      },
    });
    if (session?.user?.favorites){

      categories = [{
        id: 'favorites',
        label: 'Favorites',
        value: 'favorites',
        queries: session?.user.favorites
      },
      
      ...categories]
    }

  // console.log(categories);
}

  // console.log(session?.user.favorites)

  // const activeSchool = await prisma.schoolInfo.findUnique({
  //   where: {
  //     sc: session?.user?.activeSchool?.toString(),
  //   },
  // });

  // let attendanceData;
  // if (activeSchool.sc !== '0') {
  //   attendanceData = await getQueryData({
  //     queryLabel: "daily-attendance-school",
  //   });   
  // } 
 

  return (
    <>
      <div className="m-auto mt-10 self-center flex flex-row rounded-lg max-h-[70vh] ">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          queries={queries}
          session={session}
          accordion={false} 
        />

        {/* Main Landing Page */}
        <FavoritesSectionGrid user={session?.user}  />

      </div>
      {/* <pre>{JSON.stringify(session?.user, null, 2)}</pre> */}
    </>
  );
}
