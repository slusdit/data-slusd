// app/actions/grades.ts
"use server";

import prisma from "@/lib/db";

// To avoid creating multiple instances of Prisma in development
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// export const prisma =
//   globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getStudentGrades(
  sc: number,
  tn: string,
  term?: string,
  courseTitle?: string,
  ellStatus?: string,
  specialEdStatus?: string,
  ardStatus?: string
) {
  try {
    console.log("Server action called with:", { sc, tn, term, courseTitle, ellStatus, specialEdStatus, ardStatus });

    // Use Prisma's $queryRaw to execute raw SQL safely with parameter binding
    // This approach prevents SQL injection
    const whereConditions = [];
    const params: any[] = [];

    // Add required conditions
    whereConditions.push("teacherNumber = ?");
    params.push(tn);

    whereConditions.push("sc = ?");
    params.push(sc);

    // Add optional conditions
    if (term) {
      whereConditions.push("term = ?");
      params.push(term);
    }

    if (courseTitle) {
      whereConditions.push("courseTitle = ?");
      params.push(courseTitle);
    }

    if (ellStatus) {
      whereConditions.push("ell = ?");
      params.push(ellStatus);
    }

    if (specialEdStatus) {
      whereConditions.push("specialEd = ?");
      params.push(specialEdStatus);
    }

    if (ardStatus) {
      whereConditions.push("ard = ?");
      params.push(ardStatus);
    }

    const whereClause = whereConditions.join(" AND ");

    const query = `
      SELECT 
        studentId, 
        studentNumber, 
        grade, 
        period,
        departmentCode, 
        courseNumber, 
        courseTitle,
        section, 
        term, 
        mark, 
        teacherName,
        specialEd, 
        ell, 
        ard
      FROM GradeDistribution
      WHERE ${whereClause}
      ORDER BY term, period, courseTitle, studentId
    `;

    console.log("Executing query:", query, "with params:", params);

    const result = await prisma.$queryRawUnsafe(query, ...params);

    console.log(`Query returned ${result?.length || 0} records`);
    return result;
  } catch (error) {
    console.error("Database error in server action:", error);
    throw new Error(`Failed to fetch student grades: ${error.message}`);
  }
}

// Optional: Add a debug function to check if data exists
export async function checkGradeDistributionData() {
  try {
    const count = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM GradeDistribution
    `;
    return count;
  } catch (error) {
    console.error("Error checking data:", error);
    return { error: error.message };
  }
}
