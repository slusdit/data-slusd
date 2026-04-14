import prisma from "../lib/db";

async function checkPeriodData() {
  console.log("Checking period data in GradeDistribution table...\n");

  try {
    // Check total records
    const totalCount = await prisma.gradeDistribution.count();
    console.log(`Total records in GradeDistribution: ${totalCount}`);

    // Check records with period values
    const withPeriod = await prisma.gradeDistribution.count({
      where: {
        period: { not: null }
      }
    });
    console.log(`Records with period value: ${withPeriod}`);

    // Check records with null/empty period
    const withoutPeriod = await prisma.gradeDistribution.count({
      where: {
        OR: [
          { period: null },
          { period: '' }
        ]
      }
    });
    console.log(`Records with null/empty period: ${withoutPeriod}`);

    // Get sample of period values
    const samplePeriods = await prisma.gradeDistribution.findMany({
      where: {
        period: { not: null }
      },
      select: {
        period: true
      },
      distinct: ['period'],
      take: 20
    });

    console.log("\nSample distinct period values:");
    samplePeriods.forEach(p => console.log(`  - "${p.period}"`));

    // Get unique period values using raw query
    const uniquePeriods: any[] = await prisma.$queryRaw`
      SELECT DISTINCT period
      FROM GradeDistribution
      WHERE period IS NOT NULL AND period != ''
      ORDER BY period
    `;

    console.log(`\nAll distinct non-null period values (${uniquePeriods.length}):`);
    uniquePeriods.forEach(p => console.log(`  - "${p.period}"`));

  } catch (error) {
    console.error("Error checking period data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPeriodData();
