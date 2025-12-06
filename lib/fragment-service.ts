/**
 * Service for managing AI Query Builder fragments from the database
 *
 * All fragments are stored in the database and managed via the admin UI.
 * The JSON file (data/query-builder/fragments.json) and migration script
 * (scripts/migrate-fragments.ts) are optional and only used for initial seeding.
 *
 * To add new fragments:
 * 1. Use the Admin UI at /admin -> AI Fragments tab
 * 2. Or use Prisma Studio: npx prisma studio
 * 3. Or (legacy) add to JSON and run: npx tsx scripts/migrate-fragments.ts
 */

import prisma from './db';
import { FragmentLibrary, Fragment } from './types/query-builder';

/**
 * Fetches all active fragments from the database and formats them
 * into the FragmentLibrary structure expected by the query composer
 */
export async function getFragmentLibrary(): Promise<FragmentLibrary> {
  const categories = await prisma.aIFragmentCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      fragments: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  const fragmentsObj: Record<string, Record<string, Fragment[]>> = {};

  for (const category of categories) {
    // Group fragments by subcategory
    const subcategoryMap: Record<string, Fragment[]> = {};

    for (const fragment of category.fragments) {
      const subcategory = fragment.subcategory;

      if (!subcategoryMap[subcategory]) {
        subcategoryMap[subcategory] = [];
      }

      subcategoryMap[subcategory].push({
        id: fragment.fragmentId,
        name: fragment.name,
        description: fragment.description,
        snippet: fragment.snippet,
        type: fragment.type,
        category: category.name,
        subcategory: fragment.subcategory,
        tags: JSON.parse(fragment.tags),
        tables: JSON.parse(fragment.tables),
        dependencies: JSON.parse(fragment.dependencies),
        conflicts: JSON.parse(fragment.conflicts),
        parameters: JSON.parse(fragment.parameters),
        outputColumns: JSON.parse(fragment.outputColumns || '[]'),
      });
    }

    fragmentsObj[category.name] = subcategoryMap;
  }

  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    fragments: fragmentsObj,
  };
}

/**
 * Fetches a single fragment by its ID
 */
export async function getFragmentById(fragmentId: string) {
  return prisma.aIFragment.findUnique({
    where: { fragmentId },
    include: { category: true },
  });
}

/**
 * Fetches all categories with their fragments
 */
export async function getAllCategoriesWithFragments() {
  return prisma.aIFragmentCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      fragments: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });
}

/**
 * Fetches all categories (without fragments)
 */
export async function getAllCategories() {
  return prisma.aIFragmentCategory.findMany({
    orderBy: { sortOrder: 'asc' },
  });
}

/**
 * Creates a new fragment
 */
export async function createFragment(data: {
  fragmentId: string;
  name: string;
  description: string;
  snippet: string;
  type: 'base' | 'filter' | 'join' | 'aggregation' | 'order' | 'column';
  categoryId: string;
  subcategory: string;
  tables?: string[];
  dependencies?: string[];
  conflicts?: string[];
  parameters?: any[];
  outputColumns?: string[];
  tags?: string[];
}) {
  return prisma.aIFragment.create({
    data: {
      fragmentId: data.fragmentId,
      name: data.name,
      description: data.description,
      snippet: data.snippet,
      type: data.type,
      categoryId: data.categoryId,
      subcategory: data.subcategory,
      tables: JSON.stringify(data.tables || []),
      dependencies: JSON.stringify(data.dependencies || []),
      conflicts: JSON.stringify(data.conflicts || []),
      parameters: JSON.stringify(data.parameters || []),
      outputColumns: JSON.stringify(data.outputColumns || []),
      tags: JSON.stringify(data.tags || []),
    },
  });
}

/**
 * Updates an existing fragment
 */
export async function updateFragment(
  id: string,
  data: Partial<{
    fragmentId: string;
    name: string;
    description: string;
    snippet: string;
    type: 'base' | 'filter' | 'join' | 'aggregation' | 'order' | 'column';
    categoryId: string;
    subcategory: string;
    tables: string[];
    dependencies: string[];
    conflicts: string[];
    parameters: any[];
    outputColumns: string[];
    tags: string[];
    isActive: boolean;
    sortOrder: number;
  }>
) {
  const updateData: any = { ...data };

  // Convert arrays to JSON strings
  if (data.tables) updateData.tables = JSON.stringify(data.tables);
  if (data.dependencies) updateData.dependencies = JSON.stringify(data.dependencies);
  if (data.conflicts) updateData.conflicts = JSON.stringify(data.conflicts);
  if (data.parameters) updateData.parameters = JSON.stringify(data.parameters);
  if (data.outputColumns) updateData.outputColumns = JSON.stringify(data.outputColumns);
  if (data.tags) updateData.tags = JSON.stringify(data.tags);

  return prisma.aIFragment.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Deletes a fragment (soft delete by setting isActive to false)
 */
export async function deleteFragment(id: string) {
  return prisma.aIFragment.update({
    where: { id },
    data: { isActive: false },
  });
}

/**
 * Hard deletes a fragment
 */
export async function hardDeleteFragment(id: string) {
  return prisma.aIFragment.delete({
    where: { id },
  });
}

/**
 * Creates a new category
 */
export async function createCategory(data: {
  name: string;
  displayName: string;
  description?: string;
}) {
  const maxSortOrder = await prisma.aIFragmentCategory.aggregate({
    _max: { sortOrder: true },
  });

  return prisma.aIFragmentCategory.create({
    data: {
      name: data.name,
      displayName: data.displayName,
      description: data.description,
      sortOrder: (maxSortOrder._max.sortOrder || 0) + 1,
    },
  });
}

/**
 * Updates a category
 */
export async function updateCategory(
  id: string,
  data: Partial<{
    name: string;
    displayName: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
  }>
) {
  return prisma.aIFragmentCategory.update({
    where: { id },
    data,
  });
}
