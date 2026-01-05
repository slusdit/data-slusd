"use server";
import prisma from "./db";
import { runQuery } from "./aeries";
import { Prisma } from "@prisma/client";

export interface RawGradeData {
  SOURCE: string;
  "School Year": string;
  SC: number;
  ID: number | string;
  SN: number | string;
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

  const dbName = await runQuery('select DB_NAME() [db_name]')
  console.log(`Current ${dbName.length} database: ${dbName?.map((db) => db.db_name)[0]}`);

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

    console.log('Raw Data Sample', rawData[0])

    // Helper function to extract first value from potentially comma-separated or duplicated fields
    const extractFirst = (value: any): string => {
      if (value == null) return "";
      const str = String(value);
      // If the value contains a comma, take the first part
      if (str.includes(",")) {
        return str.split(",")[0].trim();
      }
      return str;
    };

    // Transform and insert data
    let transformedData: any[] = [];
    let skippedRecords = 0;
    try {
      transformedData = rawData
        .filter((record) => {
          // Filter out records missing required fields
          const scValue = extractFirst(record.SC);
          const idValue = extractFirst(record.ID);
          const tnValue = extractFirst(record.TN);
          if (!scValue || !idValue || !tnValue || isNaN(Number(scValue))) {
            skippedRecords++;
            return false;
          }
          return true;
        })
        .map((record) => {
          return {
            source: record.SOURCE,
            schoolYear: record["School Year"],
            sc: Number(extractFirst(record.SC)),
            studentId: extractFirst(record.ID),
            studentNumber: extractFirst(record.SN),
            grade: record.GR?.toString() ?? "",
            gender: record.GN?.toString() ?? "",
            period: record.PD?.toString() ?? "",
            departmentCode: record.DEPT_CODE,
            divisionCode: record.DC,
            courseNumber: record.CN?.toString() ?? "",
            courseTitle: record.CO,
            teacherNumber: extractFirst(record.TN),
            section: record.SE?.toString() ?? "",
            term: record.TERM,
            mark: record.MARK,
            teacherName: record.TE,
            specialEd: record.SpecialEd,
            ell: record.ELL,
            ard: record.ARD,
          };
        });

      if (skippedRecords > 0) {
        console.log(`Skipped ${skippedRecords} records with missing required fields (SC, ID, or TN)`);
      }
    } catch (error) {
      console.error("Error transforming data:", error);
      throw error;
    }

    console.log(`Transformed data from ${rawData.length} records to ${transformedData.length} records.`);
    const batchSize = 5000;
    console.log(`Transformed data into ${transformedData.length} records.`);
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

    export type GradeSummary = {
      course: string;
      sc: number;
      tn: string;
      teacherName: string;
      department: string;
      courseTitle: string;
      term: string;
      schoolYear: string;
      aCount: number;
      bCount: number;
      cCount: number;
      dCount: number;
      fCount: number;
      otherCount: number;
      totalGrades: number;
      aPercent: number;
      bPercent: number;
      cPercent: number;
      dPercent: number;
      fPercent: number;
      otherPercent: number;
    }

export async function aggregateTeacherGradeSummaries({
  schoolYear,
  term,
  terms,
  sc,
  scs,
  teacherNumber,
  teacherNumbers,
  departmentCode,
  departmentCodes,
  period,
  genderStatus,
  grade,
  specialEdStatus,
  ellStatus,
  ardStatus: raceCode,
  courseTitleStatus,
  courseTitles,
  setData,
} : {
  schoolYear?: string;
  term?: string;
  terms?: string[];
  sc?: number;
  scs?: number[];
  teacherNumber?: string;
  teacherNumbers?: string[];
  departmentCode?: string;
  departmentCodes?: string[];
  period?: string;
  genderStatus?: string;
  grade?: string;
  specialEdStatus?: string;
  ellStatus?: string;
  ardStatus?: string;
  courseTitleStatus?: string;
  courseTitles?: string[];
  setData?: (data: any) => void;
  }) {
  try {
    // Create base WHERE clause
    let whereConditions = Prisma.sql`WHERE 1=1`;

    // Support both single value and array for each filter
    // Course titles - support both single and multi-select
    if (courseTitles && courseTitles.length > 0) {
      whereConditions = Prisma.sql`${whereConditions} AND courseTitle IN (${Prisma.join(courseTitles)})`;
    } else if (courseTitleStatus) {
      whereConditions = Prisma.sql`${whereConditions} AND courseTitle = ${courseTitleStatus}`;
    }

    // Demographic filters (single select)
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

    // Terms - support both single and multi-select
    if (terms && terms.length > 0) {
      whereConditions = Prisma.sql`${whereConditions} AND term IN (${Prisma.join(terms)})`;
    } else if (term) {
      whereConditions = Prisma.sql`${whereConditions} AND term = ${term}`;
    }

    // Schools - support both single and multi-select
    if (scs && scs.length > 0) {
      whereConditions = Prisma.sql`${whereConditions} AND sc IN (${Prisma.join(scs)})`;
    } else if (sc !== undefined) {
      whereConditions = Prisma.sql`${whereConditions} AND sc = ${sc}`;
    }

    // Teacher numbers - support both single and multi-select
    if (teacherNumbers && teacherNumbers.length > 0) {
      whereConditions = Prisma.sql`${whereConditions} AND teacherNumber IN (${Prisma.join(teacherNumbers)})`;
    } else if (teacherNumber) {
      whereConditions = Prisma.sql`${whereConditions} AND teacherNumber = ${teacherNumber}`;
    }

    // Departments - support both single and multi-select
    if (departmentCodes && departmentCodes.length > 0) {
      whereConditions = Prisma.sql`${whereConditions} AND departmentCode IN (${Prisma.join(departmentCodes)})`;
    } else if (departmentCode) {
      whereConditions = Prisma.sql`${whereConditions} AND departmentCode = ${departmentCode}`;
    }

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

    const summaries: GradeSummary[] = await prisma.$queryRaw`
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
      ORDER BY sc, teacherName
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
    const summaryData =  summaries.map((summary) => ({
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

const allTerms = [
  "PRG1",
  "GRD1", 
  "PRG2",
  "GRD2",
  "SEM1",
  "PRG3",
  "GRD3",
  "PRG4", 
  "GRD4",
  "SEM2",
];

export async function getHighestIndexTermFromDatabase(filters?: {
  schoolYear?: string;
  sc?: number;
  studentId?: string;
  teacherNumber?: string;
}) {
  try {
    const whereClause: any = {};
    if (filters?.schoolYear) whereClause.schoolYear = filters.schoolYear;
    if (filters?.sc) whereClause.sc = filters.sc;
    if (filters?.studentId) whereClause.studentId = filters.studentId;
    if (filters?.teacherNumber) whereClause.teacherNumber = filters.teacherNumber;

    // Get unique terms
    const uniqueTermsResult = await prisma.gradeDistribution.findMany({
      where: whereClause,
      select: { term: true },
      distinct: ['term']
    });

    const uniqueTerms = uniqueTermsResult.map(result => result.term);
    
    // Find terms that exist in both arrays and get the one with highest index
    const validTermsWithIndices = uniqueTerms
      .filter(term => allTerms.includes(term))
      .map(term => ({ term, index: allTerms.indexOf(term) }))
      .sort((a, b) => b.index - a.index); // Sort by index descending

    return validTermsWithIndices.length > 0 ? validTermsWithIndices[0] : null;

  } catch (error) {
    console.error('Error finding highest index term:', error);
    throw error;
  }
}
