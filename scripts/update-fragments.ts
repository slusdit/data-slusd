/**
 * Script to update fragments in the database to match Aeries query patterns
 * Based on analysis of existing queries in the database
 *
 * Key findings from query analysis:
 * - Ethnicity uses SUP.ARD (not s.EC) - requires JOIN to SUP table
 * - ARD codes: 100=Native American, 200=Asian, 300=Pacific Islander, 400=Filipino,
 *   500=Latino, 600=White, 700=Black/African American, 800=Two or More
 * - School names come from COD table: JOIN cod ON cod.TC='STU' AND cod.FC='SC' AND cod.CD=s.SC
 * - ELL lookup uses COD table: LEFT JOIN COD el ON el.TC='STU' AND el.FC='LF' AND s.LF=el.CD
 *
 * Run with: npx tsx scripts/update-fragments.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fragment updates based on query analysis
const fragmentUpdates: { fragmentId: string; updates: { snippet?: string; description?: string; tables?: string } }[] = [
  // Fix base query - add COD table for school name lookup
  {
    fragmentId: 'students_base',
    updates: {
      snippet: `SELECT s.ID as student_id, s.SN as student_number, s.LN as last_name, s.FN as first_name, s.GR as grade, s.SC as school_code, cod.DE as school_name
FROM STU s
JOIN COD cod ON cod.TC = 'STU' AND cod.FC = 'SC' AND cod.CD = s.SC
WHERE s.DEL = 0 AND s.TG = ''`,
      tables: JSON.stringify(['STU', 'COD']),
    },
  },

  // Fix ethnicity filters - use SUP.ARD codes (requires join_ethnicity to be added)
  // Note: ARD code mappings from existing queries:
  // 100=Native American, 200=Asian, 300=Pacific Islander, 400=Filipino
  // 500=Latino, 600=White, 700=Black/African American, 800=Two or More Races
  {
    fragmentId: 'ethnicity_native_american',
    updates: {
      snippet: `sup.ARD = 100`,
      description: 'Filters to Native American students (ARD code 100). Requires join to SUP table.',
    },
  },
  {
    fragmentId: 'ethnicity_asian',
    updates: {
      snippet: `sup.ARD = 200`,
      description: 'Filters to Asian students (ARD code 200). Requires join to SUP table.',
    },
  },
  {
    fragmentId: 'ethnicity_pacific_islander',
    updates: {
      snippet: `sup.ARD = 300`,
      description: 'Filters to Pacific Islander students (ARD code 300). Requires join to SUP table.',
    },
  },
  {
    fragmentId: 'ethnicity_filipino',
    updates: {
      snippet: `sup.ARD = 400`,
      description: 'Filters to Filipino students (ARD code 400). Requires join to SUP table.',
    },
  },
  {
    fragmentId: 'ethnicity_hispanic',
    updates: {
      snippet: `sup.ARD = 500`,
      description: 'Filters to Hispanic/Latino students (ARD code 500). Requires join to SUP table.',
    },
  },
  {
    fragmentId: 'ethnicity_white',
    updates: {
      snippet: `sup.ARD = 600`,
      description: 'Filters to White students (ARD code 600). Requires join to SUP table.',
    },
  },
  {
    fragmentId: 'ethnicity_african_american',
    updates: {
      snippet: `sup.ARD = 700`,
      description: 'Filters to Black/African American students (ARD code 700). Requires join to SUP table.',
    },
  },
  {
    fragmentId: 'ethnicity_two_or_more',
    updates: {
      snippet: `sup.ARD = 800`,
      description: 'Filters to Two or More Races students (ARD code 800). Requires join to SUP table.',
    },
  },

  // Update count_by_ethnicity to use sup.ARD
  {
    fragmentId: 'count_by_ethnicity',
    updates: {
      snippet: `GROUP BY sup.ARD ORDER BY COUNT(*) DESC`,
      description: 'Groups students by ethnicity (ARD code). Requires join to SUP table.',
    },
  },
];

// New fragments to add
const newFragments = [
  {
    fragmentId: 'join_sup_ethnicity',
    name: 'Join SUP for Ethnicity',
    description: 'Joins SUP table for ethnicity data (ARD code). Required for ethnicity filters and grouping.',
    snippet: `LEFT JOIN SUP sup ON s.SC = sup.SC AND s.SN = sup.SN`,
    type: 'join' as const,
    categoryId: '', // Will be looked up
    subcategory: 'demographics',
    tables: ['SUP'],
    dependencies: ['students_base'],
    tags: ['demographics', 'ethnicity'],
  },
  {
    fragmentId: 'col_ethnicity_code',
    name: 'Ethnicity Code Column',
    description: 'Adds ethnicity ARD code from SUP table',
    snippet: `sup.ARD as ethnicity_code`,
    type: 'column' as const,
    categoryId: '', // Will be looked up
    subcategory: 'demographics',
    tables: [],
    dependencies: ['join_sup_ethnicity'],
    tags: ['demographics', 'ethnicity'],
  },
];

async function updateFragments() {
  console.log('Updating fragments to match Aeries query patterns...\n');

  // First, update existing fragments
  for (const { fragmentId, updates } of fragmentUpdates) {
    try {
      const fragment = await prisma.aIFragment.findUnique({
        where: { fragmentId },
      });

      if (!fragment) {
        console.log(`⚠️ Fragment not found: ${fragmentId}`);
        continue;
      }

      const updateData: any = {};
      if (updates.snippet) updateData.snippet = updates.snippet;
      if (updates.description) updateData.description = updates.description;
      if (updates.tables) updateData.tables = updates.tables;

      await prisma.aIFragment.update({
        where: { fragmentId },
        data: updateData,
      });

      console.log(`✓ Updated: ${fragmentId}`);
    } catch (error) {
      console.error(`✗ Error updating ${fragmentId}:`, error);
    }
  }

  // Look up the categories for new fragments
  const joinCategory = await prisma.aIFragmentCategory.findFirst({
    where: { name: 'data_joins' },
  });

  const columnCategory = await prisma.aIFragmentCategory.findFirst({
    where: { name: 'column_additions' },
  });

  if (!joinCategory || !columnCategory) {
    console.log('⚠️ Could not find required categories. Skipping new fragment creation.');
    console.log('   Available categories:');
    const cats = await prisma.aIFragmentCategory.findMany({ select: { name: true } });
    cats.forEach((c) => console.log(`     - ${c.name}`));
  } else {
    // Add new fragments
    console.log('\nAdding new fragments...');
    for (const frag of newFragments) {
      try {
        const existing = await prisma.aIFragment.findUnique({
          where: { fragmentId: frag.fragmentId },
        });

        if (existing) {
          console.log(`  - Already exists: ${frag.fragmentId}`);
          continue;
        }

        await prisma.aIFragment.create({
          data: {
            fragmentId: frag.fragmentId,
            name: frag.name,
            description: frag.description,
            snippet: frag.snippet,
            type: frag.type,
            categoryId: frag.type === 'join' ? joinCategory.id : columnCategory.id,
            subcategory: frag.subcategory,
            tables: JSON.stringify(frag.tables),
            dependencies: JSON.stringify(frag.dependencies),
            conflicts: JSON.stringify([]),
            parameters: JSON.stringify([]),
            outputColumns: JSON.stringify([]),
            tags: JSON.stringify(frag.tags),
          },
        });

        console.log(`✓ Created: ${frag.fragmentId}`);
      } catch (error) {
        console.error(`✗ Error creating ${frag.fragmentId}:`, error);
      }
    }
  }

  // Add dependencies to ethnicity filters
  console.log('\nUpdating ethnicity filter dependencies...');
  const ethnicityFilters = [
    'ethnicity_native_american',
    'ethnicity_asian',
    'ethnicity_pacific_islander',
    'ethnicity_filipino',
    'ethnicity_hispanic',
    'ethnicity_white',
    'ethnicity_african_american',
    'ethnicity_two_or_more',
  ];

  for (const fragmentId of ethnicityFilters) {
    try {
      await prisma.aIFragment.update({
        where: { fragmentId },
        data: {
          dependencies: JSON.stringify(['join_sup_ethnicity']),
        },
      });
      console.log(`✓ Updated dependencies: ${fragmentId}`);
    } catch (error) {
      console.error(`✗ Error updating dependencies for ${fragmentId}:`, error);
    }
  }

  // Update count_by_ethnicity dependency
  await prisma.aIFragment.update({
    where: { fragmentId: 'count_by_ethnicity' },
    data: {
      dependencies: JSON.stringify(['join_sup_ethnicity']),
    },
  });
  console.log(`✓ Updated dependencies: count_by_ethnicity`);

  console.log('\nDone!');
}

updateFragments()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
