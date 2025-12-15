/**
 * Script to seed AI Fragment Categories into the database
 * These categories are required before importing fragments from JSON
 *
 * Run with: npx tsx scripts/seed-fragment-categories.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'base_queries',
    displayName: 'Base Queries',
    description: 'Foundation SQL queries that establish the primary data source (students, staff, transcripts, etc.)',
    sortOrder: 1,
  },
  {
    name: 'column_additions',
    displayName: 'Column Additions',
    description: 'Additional columns that can be added to SELECT statements',
    sortOrder: 2,
  },
  {
    name: 'data_joins',
    displayName: 'Data Joins',
    description: 'JOIN clauses to bring in related data from other tables',
    sortOrder: 3,
  },
  {
    name: 'school_filters',
    displayName: 'School Filters',
    description: 'Filters to limit results to specific schools',
    sortOrder: 4,
  },
  {
    name: 'program_filters',
    displayName: 'Program Filters',
    description: 'Filters for student programs (IEP, 504, ELL, GATE, etc.)',
    sortOrder: 5,
  },
  {
    name: 'grade_filters',
    displayName: 'Grade Level Filters',
    description: 'Filters to limit results by grade level',
    sortOrder: 6,
  },
  {
    name: 'demographic_filters',
    displayName: 'Demographic Filters',
    description: 'Filters by demographics (gender, ethnicity)',
    sortOrder: 7,
  },
  {
    name: 'transcript_filters',
    displayName: 'Transcript Filters',
    description: 'Filters specific to transcript/course history queries',
    sortOrder: 8,
  },
  {
    name: 'aggregations',
    displayName: 'Aggregations',
    description: 'COUNT, GROUP BY, and other aggregation patterns',
    sortOrder: 9,
  },
  {
    name: 'ordering',
    displayName: 'Ordering',
    description: 'ORDER BY clauses for sorting results',
    sortOrder: 10,
  },
];

async function seedCategories() {
  console.log('Seeding AI Fragment Categories...\n');

  for (const category of categories) {
    try {
      const existing = await prisma.aIFragmentCategory.findUnique({
        where: { name: category.name },
      });

      if (existing) {
        console.log(`  - Already exists: ${category.name}`);
        continue;
      }

      await prisma.aIFragmentCategory.create({
        data: category,
      });

      console.log(`✓ Created: ${category.displayName} (${category.name})`);
    } catch (error) {
      console.error(`✗ Error creating ${category.name}:`, error);
    }
  }

  console.log('\nDone! You can now import fragments via the Admin Dashboard.');
}

seedCategories()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
