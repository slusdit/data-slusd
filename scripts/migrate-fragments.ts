/**
 * LEGACY: Initial seeding script to import fragments from JSON file to database
 *
 * This script is only needed for initial setup or to reset fragments to defaults.
 * For ongoing fragment management, use the Admin UI at /admin -> AI Fragments tab.
 *
 * Run with: npx tsx scripts/migrate-fragments.ts
 *
 * Note: This uses upsert, so it will update existing fragments with matching fragmentId.
 */

import { PrismaClient } from '@prisma/client';
import fragments from '../data/query-builder/fragments.json';

const prisma = new PrismaClient();

// Map JSON type to Prisma enum
const typeMap: Record<string, 'base' | 'filter' | 'join' | 'aggregation' | 'order' | 'column'> = {
  base: 'base',
  filter: 'filter',
  join: 'join',
  aggregation: 'aggregation',
  order: 'order',
  column: 'column',
};

// Map category names to display names
const categoryDisplayNames: Record<string, string> = {
  base_queries: 'Base Queries',
  school_filters: 'School Filters',
  program_filters: 'Program Filters',
  grade_filters: 'Grade Filters',
  demographic_filters: 'Demographic Filters',
  data_joins: 'Data Joins',
  aggregations: 'Aggregations',
  ordering: 'Ordering',
  column_additions: 'Column Additions',
};

async function migrateFragments() {
  console.log('Starting fragment migration...');

  // First, create all categories
  const categoryMap = new Map<string, string>(); // name -> id
  let categoryOrder = 0;

  for (const categoryName of Object.keys(fragments.fragments)) {
    console.log(`Creating category: ${categoryName}`);

    const category = await prisma.aIFragmentCategory.upsert({
      where: { name: categoryName },
      update: {
        displayName: categoryDisplayNames[categoryName] || categoryName,
        sortOrder: categoryOrder++,
      },
      create: {
        name: categoryName,
        displayName: categoryDisplayNames[categoryName] || categoryName,
        sortOrder: categoryOrder,
      },
    });

    categoryMap.set(categoryName, category.id);
  }

  console.log(`Created ${categoryMap.size} categories`);

  // Now import all fragments
  let fragmentCount = 0;
  let fragmentOrder = 0;

  for (const [categoryName, subcategories] of Object.entries(fragments.fragments)) {
    const categoryId = categoryMap.get(categoryName);
    if (!categoryId) {
      console.error(`Category not found: ${categoryName}`);
      continue;
    }

    for (const [subcategoryName, fragmentList] of Object.entries(subcategories as Record<string, any[]>)) {
      for (const fragment of fragmentList) {
        console.log(`  Importing fragment: ${fragment.id}`);

        try {
          await prisma.aIFragment.upsert({
            where: { fragmentId: fragment.id },
            update: {
              name: fragment.name,
              description: fragment.description,
              snippet: fragment.snippet,
              type: typeMap[fragment.type] || 'filter',
              categoryId: categoryId,
              subcategory: subcategoryName,
              tables: JSON.stringify(fragment.tables || []),
              dependencies: JSON.stringify(fragment.dependencies || []),
              conflicts: JSON.stringify(fragment.conflicts || []),
              parameters: JSON.stringify(fragment.parameters || []),
              outputColumns: JSON.stringify(fragment.outputColumns || []),
              tags: JSON.stringify(fragment.tags || []),
              sortOrder: fragmentOrder++,
            },
            create: {
              fragmentId: fragment.id,
              name: fragment.name,
              description: fragment.description,
              snippet: fragment.snippet,
              type: typeMap[fragment.type] || 'filter',
              categoryId: categoryId,
              subcategory: subcategoryName,
              tables: JSON.stringify(fragment.tables || []),
              dependencies: JSON.stringify(fragment.dependencies || []),
              conflicts: JSON.stringify(fragment.conflicts || []),
              parameters: JSON.stringify(fragment.parameters || []),
              outputColumns: JSON.stringify(fragment.outputColumns || []),
              tags: JSON.stringify(fragment.tags || []),
              sortOrder: fragmentOrder,
            },
          });
          fragmentCount++;
        } catch (error) {
          console.error(`  Error importing ${fragment.id}:`, error);
        }
      }
    }
  }

  console.log(`\nMigration complete! Imported ${fragmentCount} fragments.`);
}

migrateFragments()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
