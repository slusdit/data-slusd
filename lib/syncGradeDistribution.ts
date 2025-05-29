"use server";
import prisma from "./db";
import { runQuery } from "./aeries";
import { Prisma } from "@prisma/client";

interface RawGradeData {
  SOURCE: string;
  "School Year": string;
  SC: [number, number];
  ID: string;
  SN: string;
  GR: string;
  GN: string;
  PD: string;
  DEPT_CODE: string;
  DC: string;
  CN: string;
  CO: string;
  TN: number;
  SE: string;
  TERM: string;
  MARK: string;
  TE: string;
  SpecialEd: string;
  ELL: string;
  ARD: string;
  DLI: string;
}

export async function syncGradeDistribution() {
  const percentQueryId = process.env.QUERY_ASSESSMENT_GRADE_PERCENTAGE;
  const resultsPercent = await prisma.query.findUnique({
    where: { id: percentQueryId },
  });
  if (!resultsPercent?.query) {
    throw new Error(
      "Query is undefined. Please ensure the query is properly configured."
    );
  }
  console.log("Starting grade distribution sync...");

  try {

  const rawData = (await runQuery(resultsPercent.query)) as RawGradeData[];
  console.log(`Fetched ${rawData.length} records from SQL Server.`);

    // Delete existing data for the current school year to avoid duplicates
    const schoolYears = Array.from(
      new Set(rawData.map((record) => record["School Year"]))
    );

    for (const schoolYear of schoolYears) {
      await prisma.gradeDistribution.deleteMany({
        where: { schoolYear },
      });
    }

    // Transform and insert data
    const transformedData = rawData.map((record) => ({
      source: record.SOURCE,
      schoolYear: record["School Year"],
      sc: record.SC[0],
      studentId: record.ID[0].toString(),
      studentNumber: record.SN[0].toString(),
      grade: record.GR.toString(),
      gender: record.GN.toString(),
      period: record.PD.toString(),
      departmentCode: record.DEPT_CODE,
      divisionCode: record.DC,
      courseNumber: record.CN.toString(),
      courseTitle: record.CO,
      teacherNumber: record.TN.toString(),
      section: record.SE.toString(),
      term: record.TERM,
      mark: record.MARK,
      teacherName: record.TE,
      specialEd: record.SpecialEd,
      ell: record.ELL,
      ard: record.ARD,
    }));
    const batchSize = 5000;
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      await prisma.gradeDistribution.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(
        `Inserted batch ${i / batchSize + 1}/${Math.ceil(
          transformedData.length / batchSize
        )}`
      );
    }

    console.log("Grade distribution sync completed successfully.");


    // await aggregateTeacherGradeSummaries({});
  } catch (error) {
    console.error("Error syncing grade distribution:", error);
    throw error;
  }
}

export async function aggregateTeacherGradeSummaries({
  schoolYear,
  term,
  sc,
  teacherNumber,
  departmentCode,
  period,
  genderStatus,
  grade,
  specialEdStatus,
  ellStatus,
  ardStatus: raceCode,
  courseTitleStatus,
  setData,
} : {
  schoolYear?: string;
  term?: string;
  sc?: number;
  teacherNumber?: string;
  departmentCode?: string;
  period?: string;
  genderStatus?: string;
  grade?: string;
  specialEdStatus?: string;
  ellStatus?: string;
  ardStatus?: string;
  courseTitleStatus?: string;
  setData?: (data: any) => void; // Optional callback to set data in the component
  }) {
  // console.log("Test", {  schoolYear,
  //   term,
  //   sc,
  //   teacherNumber,
  //   departmentCode,
  //   period,
  //   genderStatus,
  //   grade,
  //   specialEdStatus,
  //   ellStatus,
  //   ardStatus: raceCode,
  //   courseTitleStatus,
  //   setData });
  try {
    // Create base WHERE clause
    let whereConditions = Prisma.sql`WHERE 1=1`;

    // Add conditions based on props with proper SQL parameter handling
    if (courseTitleStatus) {
      whereConditions = Prisma.sql`${whereConditions} AND courseTitle = ${courseTitleStatus}`;
    }
    if (specialEdStatus) {
      whereConditions = Prisma.sql`${whereConditions} AND specialEd = ${specialEdStatus}`;
    }
    if (ellStatus) {
      whereConditions = Prisma.sql`${whereConditions} AND ell = ${ellStatus}`;
    }
    if (raceCode) {
      whereConditions = Prisma.sql`${whereConditions} AND ard = ${raceCode}`;
    }
    if (schoolYear) {
      whereConditions = Prisma.sql`${whereConditions} AND schoolYear = ${schoolYear}`;
    }
    if (grade) {
      whereConditions = Prisma.sql`${whereConditions} AND grade = ${grade}`;
    }
    if (term) {
      whereConditions = Prisma.sql`${whereConditions} AND term = ${term}`;
    }
    if (sc !== undefined) {
      whereConditions = Prisma.sql`${whereConditions} AND sc = ${sc}`;
    }
    if (teacherNumber) {
      whereConditions = Prisma.sql`${whereConditions} AND teacherNumber = ${teacherNumber}`;
    }
    if (departmentCode) {
      whereConditions = Prisma.sql`${whereConditions} AND departmentCode = ${departmentCode}`;
    }
    // if (period) {
    //   whereConditions = Prisma.sql`${whereConditions} AND period = ${period}`;
    // }
    if (genderStatus) {
      whereConditions = Prisma.sql`${whereConditions} AND gender = ${genderStatus}`;
    }

    // Log the filters for debugging
    // console.log("Applied filters:", {
    //   courseTitleStatus,
    //   specialEdStatus,
    //   ellStatus,
    //   raceCode,
    //   schoolYear,
    //   grade,
    //   term,
    //   sc,
    //   teacherNumber,
    //   departmentCode,
    //   period,
    // });

    // Execute the query with the dynamic conditions
    const summaries = await prisma.$queryRaw`
          SELECT 
        sc,
        teacherNumber as tn,
        teacherName,
        departmentCode as department,
        courseTitle as course,
        term,
        schoolYear,
        SUM(CASE WHEN mark in ('A','A+','A-') THEN 1 ELSE 0 END) as aCount,
        SUM(CASE WHEN mark in ('B','B+','B-') THEN 1 ELSE 0 END) as bCount,
        SUM(CASE WHEN mark in ('C','C+','C-')  THEN 1 ELSE 0 END) as cCount,
        SUM(CASE WHEN mark in ('D','D+','D-') THEN 1 ELSE 0 END) as dCount,
        SUM(CASE WHEN mark in ('F','F+','F-') THEN 1 ELSE 0 END) as fCount,
        SUM(CASE WHEN mark NOT IN ('A', 'B', 'C', 'D', 'F','A+', 'A-', 'B+', 'B-', 'C+', 'C-', 'D+', 'D-', 'F+', 'F-') THEN 1 ELSE 0 END) as otherCount,    
        COUNT(*) as totalGrades
      FROM GradeDistribution
      ${whereConditions}
      GROUP BY sc, teacherNumber, teacherName, departmentCode, courseTitle, term, schoolYear
      HAVING COUNT(*) > 0
    `;
    // console.log("raw query",`SELECT
    //     sc,
    //     teacherNumber as tn,
    //     teacherName,
    //     departmentCode as department,
    //     courseTitle as course,
    //     term,
    //     schoolYear,
    //     SUM(CASE WHEN mark like 'A%' THEN 1 ELSE 0 END) as aCount,
    //     SUM(CASE WHEN mark like 'B%' THEN 1 ELSE 0 END) as bCount,
    //     SUM(CASE WHEN mark like 'C%' THEN 1 ELSE 0 END) as cCount,
    //     SUM(CASE WHEN mark like 'D%' THEN 1 ELSE 0 END) as dCount,
    //     SUM(CASE WHEN mark like 'F%' THEN 1 ELSE 0 END) as fCount,
    //     SUM(CASE WHEN mark NOT IN ('A', 'B', 'C', 'D', 'F','A+', 'A-', 'B+', 'B-', 'C+', 'C-', 'D+', 'D-', 'F+', 'F-') THEN 1 ELSE 0 END) as otherCount,
    //     COUNT(*) as totalGrades
    //   FROM GradeDistribution
    //   ${whereConditions.strings.join(" ")}
    //   GROUP BY sc, teacherNumber, teacherName, departmentCode, courseTitle, term, schoolYear
    //   HAVING COUNT(*) > 0`)
    
    // Transform the results as before...
    const summaryData = summaries.map((summary) => ({
      sc: Number(summary.sc),
      tn: summary.tn,
      teacherName: summary.teacherName || "Unknown",
      department: summary.department || "Unknown",
      courseTitle: summary.course || "Unknown",
      term: summary.term,
      schoolYear: summary.schoolYear,
      aCount: Number(summary.aCount),
      bCount: Number(summary.bCount),
      cCount: Number(summary.cCount),
      dCount: Number(summary.dCount),
      fCount: Number(summary.fCount),
      otherCount: Number(summary.otherCount),
      totalGrades: Number(summary.totalGrades),
      aPercent: Number(
        (Number(summary.aCount) / Number(summary.totalGrades)) * 100
      ),
      bPercent: Number(
        (Number(summary.bCount) / Number(summary.totalGrades)) * 100
      ),
      cPercent: Number(
        (Number(summary.cCount) / Number(summary.totalGrades)) * 100
      ),
      dPercent: Number(
        (Number(summary.dCount) / Number(summary.totalGrades)) * 100
      ),
      fPercent: Number(
        (Number(summary.fCount) / Number(summary.totalGrades)) * 100
      ),
      otherPercent: Number(
        (Number(summary.otherCount) / Number(summary.totalGrades)) * 100
      ),
    }));

    if (summaryData.length > 0) {
      return summaryData;
    } else {
      return null
    }

    // console.log("Teacher grade summaries aggregated successfully.");
  } catch (error) {
    console.error("Error aggregating teacher grade summaries:", error);
    throw error; // Rethrow to allow caller to handle
  }
}