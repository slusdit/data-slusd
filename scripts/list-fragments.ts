/**
 * List all fragments in the database
 * Run with: npx tsx scripts/list-fragments.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listFragments() {
  const fragments = await prisma.aIFragment.findMany({
    select: { fragmentId: true, name: true, type: true, snippet: true },
    orderBy: [{ type: 'asc' }, { fragmentId: 'asc' }],
  });

  console.log(`Found ${fragments.length} fragments:\n`);

  let currentType = '';
  for (const f of fragments) {
    if (f.type !== currentType) {
      currentType = f.type;
      console.log(`\n=== ${currentType.toUpperCase()} ===`);
    }
    console.log(`  ${f.fragmentId}`);
    console.log(`    Name: ${f.name}`);
    console.log(`    SQL: ${f.snippet.slice(0, 80)}${f.snippet.length > 80 ? '...' : ''}`);
  }

  await prisma.$disconnect();
}

listFragments();
