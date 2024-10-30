import { auth } from "@/auth";
import { PrismaClient, QueryCategory } from "@prisma/client";
import Link from "next/link";
import AddQueryForm from "./components/forms/AddQueryForm";
import FormDialog from "./components/forms/FormDialog";
import { Plus } from "lucide-react";
import { QueryWithCategory } from "./components/QueryBar";
import { Separator } from "@/components/ui/separator";
import { QuerySheet } from "./components/QueiesSheet";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import SchoolEnrollmentGraph from "./components/SchoolEnrollmentGraph";
import PieChart from "./charts/page";
import PieChartCard from "./components/charts/PieChart";
import { AreaChartComponent } from "./components/charts/AreaChart";
import { BarChartCustomGraph } from "./components/charts/BarChartCustom";
import { AttendanceOverTimeChart } from "./components/charts/AttendanceOverTime";
import { Button } from "@/components/ui/button";
import { getQueryData } from "@/lib/getQuery";
import QueryList from "./components/QueryList";
import Sidebar from "./components/Sidebar";

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
          id: true,
          label: true,
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
    console.log(categories);
  }

  console.log(session?.user.favorites)

  const activeSchool = await prisma.schoolInfo.findUnique({
    where: {
      sc: session?.user?.activeSchool.toString(),
    },
  });

  const attendanceData = await getQueryData({
    queryLabel: "daily-attendance-school",
  });

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
        <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
          <h1 className="text-3xl font-weight-800 mb-5 text-center">
            Welcome {session?.user?.name}
          </h1>
          {/* Main section for district users */}
          {session?.user?.activeSchool == 0 && (
            <>
              <div className="grid grid-cols-1 h-lg w-md items-center">
                District View
              </div>
            </>
          )}
          {/* Main section for non district users */}
          {session?.user?.activeSchool != 0 && (
            <>
              <div className="grid grid-cols-1 h-lg w-md items-center">
                {/* <AreaChartComponent /> */}
                <AttendanceOverTimeChart
                  session={session}
                  itinalChartData={attendanceData?.data}
                />
              </div>
              <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-4 justify-center items-center">
                {/* <div className="grid gird-cols-1">

<PieChartCard />
</div> */}

                <SchoolEnrollmentGraph
                  schools={session?.user?.schools}
                  activeSchool={activeSchool}
                  // queryId="clz1jjsi1000314k7qv0xvxv3"
                  queryLabel="school-enrollment-summary"
                  // containerStyle="w-full"
                />
              </div>
            </>
          )}
        </Card>
      </div>
      {/* <pre>{JSON.stringify(session?.user, null, 2)}</pre> */}
    </>
  );
}
