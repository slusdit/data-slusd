import prisma from "../lib/db";

async function checkDuplicates() {
  const dups: any[] = await prisma.$queryRaw`
    SELECT
      studentId,
      sc,
      term,
      COALESCE(courseTitle, '') as courseTitle,
      COALESCE(section, '') as section,
      COALESCE(period, '') as period,
      teacherNumber,
      COUNT(*) as count
    FROM GradeDistribution
    GROUP BY studentId, sc, term, COALESCE(courseTitle, ''), COALESCE(section, ''), COALESCE(period, ''), teacherNumber
    HAVING COUNT(*) > 1
  `;

  console.log(`Remaining duplicates: ${dups.length}`);

  if (dups.length > 0) {
    console.log("\nFirst few examples:");
    dups.slice(0, 5).forEach(d => {
      console.log(`  Student ${d.studentId}, term ${d.term}, course ${d.courseTitle}, period ${d.period}: ${d.count} records`);
    });
  }

  await prisma.$disconnect();
}

checkDuplicates();
