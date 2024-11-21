'use client';

import  prisma from "@/lib/db";
import { getQueryData } from "@/lib/getQuery";
import { AttendanceOverTimeChart } from "./charts/AttendanceOverTime";
import SchoolEnrollmentGraph from "./SchoolEnrollmentGraph";
import { Session } from "next-auth";
import getActiveSchoolInfo from "@/lib/getActiveSchoolInfo";
import { useEffect, useState } from "react";
import { SchoolInfo } from "@prisma/client";

export default async function SchoolAttendanceGraph({ session }: { session: Session }) {
  const schoolSc = session?.user?.activeSchool?.toString() || "2";
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>([]);
  const [attendanceData, setAttendanceData] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolInfo = await getActiveSchoolInfo();
        const queryData = await getQueryData({ queryLabel: "daily-attendance-school" });
        
        setSchoolInfo(schoolInfo);
        setAttendanceData(queryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 h-lg w-md items-center">
        <AttendanceOverTimeChart
          session={session}
          initialChartData={attendanceData?.data}
        />
      </div>
      <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-4 justify-center items-center">
        <SchoolEnrollmentGraph
          schools={session?.user?.schools}
          activeSchool={schoolInfo}
          queryLabel="school-enrollment-summary"
        />
      </div>
    </>
  );
}
