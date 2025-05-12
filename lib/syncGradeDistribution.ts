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

  try {
    console.log("Fetching data from SQL Server...");
    const rawData = (await runQuery(resultsPercent.query)) as RawGradeData[];

    console.log(`Processing ${rawData.length} records...`);

    // Delete existing data for the current school year to avoid duplicates
    const schoolYears = Array.from(
      new Set(rawData.map((record) => record["School Year"]))
    );

    for (const schoolYear of schoolYears) {
      await prisma.gradeDistribution.deleteMany({
        where: { schoolYear },
      });
      console.log(`Cleared existing data for school year: ${schoolYear}`);
    }

    // Transform and insert data
    const transformedData = rawData.map((record) => ({
      source: record.SOURCE,
      schoolYear: record["School Year"],
      sc: record.SC[0],
      studentId: record.ID[0].toString(),
      studentNumber: record.SN[0].toString(),
      grade: record.GR.toString(),
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
    console.log(`Transformed data for ${transformedData.length} records.`);
    console.log(`${transformedData[0]}`);
    // Batch insert for better performance
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

    // Optionally, aggregate data for faster queries
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
  grade,
  specialEdStatus,
  ellStatus,
  raceCode,
}: {
  schoolYear?: string;
  term?: string;
  sc?: number;
  teacherNumber?: string;
  departmentCode?: string;
  period?: string;
  grade?: string;
  specialEdStatus?: string;
  ellStatus?: string;
  raceCode?: string;
}) {
  try {
    // Create conditions for our query
    let whereConditionsSQL = Prisma.sql`WHERE 1=1`;
    
    // Add conditions based on props with proper SQL parameter handling
    if (specialEdStatus) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND specialEd = ${specialEdStatus}`;
    }
    if (ellStatus) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND ell = ${ellStatus}`;
    }
    if (raceCode) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND ard = ${raceCode}`;
    }
    if (schoolYear) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND schoolYear = ${schoolYear}`;
    }
    if (grade) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND grade = ${grade}`;
    }
    if (term) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND term = ${term}`;
    }
    if (sc) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND sc = ${sc}`;
    }
    if (teacherNumber) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND teacherNumber = ${teacherNumber}`;
    }
    if (departmentCode) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND departmentCode = ${departmentCode}`;
    }
    if (period) {
      whereConditionsSQL = Prisma.sql`${whereConditionsSQL} AND period = ${period}`;
    }
    
    console.log("Using parameterized SQL with Prisma.sql for proper escaping");
    
    const summaries = await prisma.$queryRaw<
      Array<{
        sc: number;
        tn: string;
        teacherName: string | null;
        department: string | null;
        courseTitle: string | null;
        period: string;
        term: string;
        schoolYear: string;
        aCount: any; // Using 'any' to handle both number and Decimal
        bCount: any;
        cCount: any;
        dCount: any;
        fCount: any;
        otherCount: any;
        totalGrades: any;
      }>
    >`
      SELECT 
        sc,
        teacherNumber as tn,
        teacherName,
        departmentCode as department,
        courseTitle,
        period,
        term,
        schoolYear,
        SUM(CASE WHEN mark like 'A%' THEN 1 ELSE 0 END) as aCount,
        SUM(CASE WHEN mark like 'B%' THEN 1 ELSE 0 END) as bCount,
        SUM(CASE WHEN mark like 'C%' THEN 1 ELSE 0 END) as cCount,
        SUM(CASE WHEN mark like 'D%' THEN 1 ELSE 0 END) as dCount,
        SUM(CASE WHEN mark like 'F%' THEN 1 ELSE 0 END) as fCount,
        SUM(CASE WHEN mark NOT IN ('A', 'B', 'C', 'D', 'F','A+', 'A-', 'B+', 'B-', 'C+', 'C-', 'D+', 'D-', 'F+', 'F-') THEN 1 ELSE 0 END) as otherCount,
        COUNT(*) as totalGrades
      FROM GradeDistribution
      ${whereConditionsSQL}
      GROUP BY sc, teacherNumber, teacherName, departmentCode, courseTitle, period, term, schoolYear
      HAVING COUNT(*) > 0
    `;

    // Transform, convert Decimal objects to regular numbers, and format the data
    const summaryData = summaries.map((summary: any) => {
      // Helper function to safely convert any value (including Decimal) to Number
      const toNumber = (value: any): number => {
        if (value === null || value === undefined) return 0;
        return Number(value);
      };

      // First convert all count fields to regular numbers
      const aCount = toNumber(summary.aCount);
      const bCount = toNumber(summary.bCount);
      const cCount = toNumber(summary.cCount);
      const dCount = toNumber(summary.dCount);
      const fCount = toNumber(summary.fCount);
      const otherCount = toNumber(summary.otherCount);
      const totalGrades = toNumber(summary.totalGrades);

      // Now calculate percentages using the converted numbers
      return {
        sc: summary.sc,
        tn: summary.tn,
        teacherName: summary.teacherName || "Unknown",
        department: summary.department || "Unknown",
        courseTitle: summary.courseTitle || "Unknown",
        period: summary.period || "",
        term: summary.term || "",
        schoolYear: summary.schoolYear || "",
        aCount: aCount,
        bCount: bCount,
        cCount: cCount,
        dCount: dCount,
        fCount: fCount,
        otherCount: otherCount,
        totalGrades: totalGrades,
        aPercent: totalGrades > 0 ? (aCount / totalGrades) * 100 : 0,
        bPercent: totalGrades > 0 ? (bCount / totalGrades) * 100 : 0,
        cPercent: totalGrades > 0 ? (cCount / totalGrades) * 100 : 0,
        dPercent: totalGrades > 0 ? (dCount / totalGrades) * 100 : 0,
        fPercent: totalGrades > 0 ? (fCount / totalGrades) * 100 : 0,
        otherPercent: totalGrades > 0 ? (otherCount / totalGrades) * 100 : 0,
      };
    });
    
    if (summaryData.length > 0) {
      console.log("Summary data example:", summaryData[0]);
    } else {
      console.log("No summary data found.");
    }

    console.log("Teacher grade summaries aggregated successfully.");
    
    // Return the serialized data
    return summaryData;
  } catch (error) {
    console.error("Error aggregating teacher grade summaries:", error);
    throw error;
  }
}