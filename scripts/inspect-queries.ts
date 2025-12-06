/**
 * Script to inspect queries in the database
 * Run with: npx tsx scripts/inspect-queries.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inspectQueries() {
  const queries = await prisma.query.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      query: true,
      category: {
        select: {
          value: true,
        },
      },
    },
    orderBy: { name: 'asc' },
  });

  console.log(`Found ${queries.length} queries:\n`);

  for (const q of queries) {
    console.log('='.repeat(80));
    console.log(`Name: ${q.name}`);
    console.log(`Category: ${q.category?.value || 'None'}`);
    console.log(`Description: ${q.description}`);
    console.log('Query:');
    console.log(q.query.slice(0, 500) + (q.query.length > 500 ? '...' : ''));
    console.log('');
  }
}

inspectQueries()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
