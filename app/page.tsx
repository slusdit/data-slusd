
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

// const prisma = new PrismaClient();
export default async function Home() {
  const session = await auth();
  const queries: QueryWithCategory[] = await prisma.query.findMany({
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
  });

  let categories
  if (session?.user) {
    categories = await prisma.queryCategory.findMany({
      include: {
        queries: true,
        roles: true,
      },
    });
  }

  const activeSchool = await prisma.schoolInfo.findUnique({
    where: {
      sc: session?.user?.activeSchool.toString()
    }
  })

  const attendanceData = await getQueryData({ queryLabel: "daily-attendance-school" })
 
  return (
    <>
    <div className="m-auto mt-10 self-center flex flex-row rounded-lg ">

      {/* Sidebar */}
      <div className="w-48 mr-4 p-2 flex flex-col gap-2 justify-top">
        <h2 className="font-bold text-center text-lg underline">Menu</h2>
        {session?.user?.queryEdit && (
          <div className="w-1/12">

            <FormDialog
              triggerMessage="Add Query"
              icon={<Plus className="py-1" />}
              title="Add Query"

            >
              <AddQueryForm session={session} categories={categories} />
            </FormDialog>
          </div>
        )}
        <Separator className="my-4 w-full" />


        <QuerySheet
          categories={categories}
          queries={queries}
          database={process.env.DB_DATABASE as string}
          roles={session?.user?.roles}
        />
        {/* <Button variant="link" className="w-full" asChild>
          <Link href="/attendance">Attendance</Link>
        </Button> */}

      </div>

      {/* Main Landing Page */}
      <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
        <h1 className="text-3xl font-weight-800 mb-5 text-center">
          Welcome {session?.user?.name}
        </h1>
        <div className="grid grid-cols-1 h-lg w-md items-center">
            {/* <AreaChartComponent /> */}
            <AttendanceOverTimeChart session={session} itinalChartData={attendanceData?.data} />
        </div>
        <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-4 justify-center items-center">
          {/* <div className="grid gird-cols-1">

          <PieChartCard />
          </div> */}

          <SchoolEnrollmentGraph
            schools={session?.user?.schools}
            activeSchool={activeSchool}
              // queryId="clz1jjsi1000314k7qv0xvxv3"
              queryLabel='school-enrollment-summary'
            // containerStyle="w-full"
          />
            
        </div>

      </Card>

    </div>
      {/* <pre>{JSON.stringify(session?.user, null, 2)}</pre> */}
      </>
  );
}
