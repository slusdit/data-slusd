"use server";
import prisma from "./db";
import { runQuery } from "./aeries";
import { Prisma } from "@prisma/client";
import { requireAdmin, requireUser, assertSchoolAccess, AuthError } from "./authGuard";

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

export type GradeSyncResult = {
  /** Aeries database the grades were read from (the caller's active year) */
  database: string;
  schoolYears: string[];
  fetched: number;
  inserted: number;
  /** rows dropped for a missing school, student, teacher number, term or mark */
  skipped: number;
};

/**
 * Re-import the grade distribution for the signed-in admin's active Aeries
 * year. Every row for each school year present in the result is replaced.
 */
export async function syncGradeDistribution(): Promise<GradeSyncResult> {
  await requireAdmin();
  const percentQueryId = process.env.QUERY_ASSESSMENT_GRADE_PERCENTAGE?.trim();
  const resultsPercent = percentQueryId
    ? await prisma.query.findUnique({ where: { id: percentQueryId } })
    : null;
  if (!resultsPercent?.query) {
    throw new Error(
      "Grade query is not configured. Set QUERY_ASSESSMENT_GRADE_PERCENTAGE to the id of the grade distribution query."
    );
  }
  console.log("Starting grade distribution sync...");

  const dbName = await runQuery("select DB_NAME() [db_name]");
  const database = String(dbName[0]?.db_name ?? "unknown");
  console.log(`Grade sync reading from ${database}`);

  try {
    // The sync needs the whole table, not the MAX_ROWS report cap.
    const rawData = (await runQuery(resultsPercent.query, { uncapped: true })) as RawGradeData[];
    console.log(`Fetched ${rawData.length} records from SQL Server.`);
    if (rawData.length === 0) {
      throw new Error(`The grade query returned no rows from ${database}.`);
    }

    // The query joins the same column names from several tables, so the
    // driver hands back arrays or comma-joined strings for SC/ID/SN. Keep the
    // first value.
    const extractFirst = (value: unknown): string => {
      if (value == null) return "";
      if (Array.isArray(value)) return extractFirst(value[0]);
      const str = String(value);
      return str.includes(",") ? str.split(",")[0].trim() : str;
    };
    const text = (value: unknown): string => (value == null ? "" : String(value));

    // Transform and validate everything before touching the table, so a bad
    // row cannot wipe a school year and leave it half imported.
    let skippedRecords = 0;
    const transformedData: Prisma.GradeDistributionCreateManyInput[] = [];
    for (const record of rawData) {
      const scValue = extractFirst(record.SC);
      const idValue = extractFirst(record.ID);
      const tnValue = extractFirst(record.TN);
      const term = text(record.TERM);
      const mark = text(record.MARK);
      const schoolYear = text(record["School Year"]);
      if (!scValue || !idValue || !tnValue || isNaN(Number(scValue)) || !term || !mark || !schoolYear) {
        skippedRecords++;
        continue;
      }
      transformedData.push({
        source: text(record.SOURCE),
        schoolYear,
        sc: Number(scValue),
        studentId: idValue,
        studentNumber: extractFirst(record.SN),
        grade: text(record.GR),
        gender: text(record.GN),
        period: text(record.PD),
        departmentCode: text(record.DEPT_CODE),
        divisionCode: text(record.DC),
        courseNumber: text(record.CN),
        courseTitle: text(record.CO),
        teacherNumber: tnValue,
        section: text(record.SE),
        term,
        mark,
        // TCH is a LEFT JOIN: a section whose teacher number has no TCH row
        // at that school arrives with TE = null.
        teacherName: text(record.TE),
        specialEd: text(record.SpecialEd),
        ell: text(record.ELL),
        ard: text(record.ARD),
      });
    }
    if (skippedRecords > 0) {
      console.log(`Skipped ${skippedRecords} records with missing required fields (SC, ID, TN, TERM, MARK or School Year)`);
    }
    console.log(`Transformed ${rawData.length} records into ${transformedData.length} rows.`);

    const schoolYears = Array.from(new Set(transformedData.map((row) => row.schoolYear)));
    for (const schoolYear of schoolYears) {
      const deleted = await prisma.gradeDistribution.deleteMany({ where: { schoolYear } });
      console.log(`Deleted ${deleted.count} existing rows for ${schoolYear}`);
    }

    const batchSize = 5000;
    const totalBatches = Math.ceil(transformedData.length / batchSize);
    let inserted = 0;
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      const result = await prisma.gradeDistribution.createMany({
        data: batch,
        skipDuplicates: true,
      });
      inserted += result.count;
      console.log(`Inserted batch ${i / batchSize + 1}/${totalBatches}`);
    }

    console.log(`Grade distribution sync completed: ${inserted} rows for ${schoolYears.join(", ")}.`);
    return {
      database,
      schoolYears,
      fetched: rawData.length,
      inserted,
      skipped: skippedRecords,
    };
  } catch (error) {
    // Prisma validation errors embed the whole batch in their message, which
    // floods the journal; keep the log line and the rethrown error short.
    const message = error instanceof Error ? error.message : String(error);
    const firstLine = message.split("\n").find((line) => line.trim().length > 0) ?? message;
    console.error(`Error syncing grade distribution: ${firstLine.slice(0, 500)}`);
    throw new Error(`Grade import failed: ${firstLine.slice(0, 300)}`);
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
  periods,
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
  periods?: string[];
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
    const user = await requireUser();
    // Non-admins may only aggregate schools they have access to.
    if (!user.admin) {
      const requestedScs = [
        ...(sc !== undefined ? [sc] : []),
        ...(scs ?? []),
      ];
      if (requestedScs.length === 0) {
        throw new AuthError("A school must be specified.");
      }
      requestedScs.forEach((s) => assertSchoolAccess(user, s));
    }

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

    // Periods - support both single and multi-select
    if (periods && periods.length > 0) {
      whereConditions = Prisma.sql`${whereConditions} AND period IN (${Prisma.join(periods)})`;
    } else if (period) {
      whereConditions = Prisma.sql`${whereConditions} AND period = ${period}`;
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
