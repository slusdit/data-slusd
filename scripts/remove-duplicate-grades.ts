/**
 * Script to remove duplicate grade records from the GradeDistribution table
 *
 * This script identifies and removes duplicate records based on the composite key:
 * (studentId, sc, term, courseTitle, section, period, teacherNumber)
 *
 * For each set of duplicates, it keeps the record with the earliest createdAt timestamp
 * and deletes the rest.
 *
 * Usage: npx tsx scripts/remove-duplicate-grades.ts
 */

import prisma from "../lib/db";

async function removeDuplicateGrades() {
  console.log("Starting duplicate grade removal process...");

  try {
    // Find all duplicate records using a raw SQL query
    // This query identifies groups of records that have the same composite key
    const duplicates: any[] = await prisma.$queryRaw`
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

    console.log(`Found ${duplicates.length} sets of duplicate records`);

    if (duplicates.length === 0) {
      console.log("No duplicates found. Database is clean!");
      return;
    }

    let totalDeleted = 0;

    // Process each set of duplicates
    for (const dup of duplicates) {
      const { studentId, sc, term, courseTitle, section, period, teacherNumber, count } = dup;

      console.log(`Processing duplicates for student ${studentId}, term ${term}, course ${courseTitle}, period ${period} (${count} records)`);

      // Fetch all records for this duplicate set, ordered by createdAt
      const records = await prisma.gradeDistribution.findMany({
        where: {
          studentId,
          sc: Number(sc),
          term,
          courseTitle: courseTitle || null,
          section: section || null,
          period: period || null,
          teacherNumber,
        },
        orderBy: {
          createdAt: 'asc', // Keep the oldest record
        },
      });

      if (records.length <= 1) {
        console.log(`  Skipping - only ${records.length} record found`);
        continue;
      }

      // Keep the first record (oldest), delete the rest
      const recordToKeep = records[0];
      const recordsToDelete = records.slice(1);

      console.log(`  Keeping record ${recordToKeep.id} (created ${recordToKeep.createdAt})`);
      console.log(`  Deleting ${recordsToDelete.length} duplicate(s)`);

      // Delete the duplicate records
      const deleteResult = await prisma.gradeDistribution.deleteMany({
        where: {
          id: {
            in: recordsToDelete.map(r => r.id),
          },
        },
      });

      totalDeleted += deleteResult.count;
      console.log(`  Deleted ${deleteResult.count} record(s)`);
    }

    console.log(`\n✅ Duplicate removal complete!`);
    console.log(`Total duplicate records deleted: ${totalDeleted}`);
    console.log(`Total unique record sets processed: ${duplicates.length}`);

  } catch (error) {
    console.error("❌ Error removing duplicates:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
removeDuplicateGrades()
  .then(() => {
    console.log("\n🎉 Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error);
    process.exit(1);
  });
