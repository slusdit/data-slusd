import "server-only";

/**
 * Report catalogue (categories + saved reports with their role requirements),
 * cached across requests and filtered per user (finding P4).
 *
 * The header and the report page used to run these two queries on every
 * navigation and ship every report (unfiltered) to the browser. The catalogue
 * is the same for everyone, so it is cached with `unstable_cache` and
 * invalidated by the query/category server actions; only the per-user role
 * filter runs per request.
 */
import { unstable_cache, revalidateTag } from "next/cache";
import prisma from "./db";
import { AuthzUser, userCanRunQuery, userCanSeeCategory } from "./authorization";

export const REPORT_CATALOGUE_TAG = "report-catalogue";

const loadCatalogue = unstable_cache(
  async () => {
    const [categories, queries] = await Promise.all([
      prisma.queryCategory.findMany({
        include: { roles: { select: { role: true } } },
        orderBy: [{ sort: "asc" }, { label: "asc" }],
      }),
      prisma.query.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          publicQuery: true,
          roles: { select: { role: true } },
          category: {
            select: {
              id: true,
              label: true,
              value: true,
              roles: { select: { role: true } },
            },
          },
        },
        orderBy: { name: "asc" },
      }),
    ]);
    return { categories, queries };
  },
  ["report-catalogue"],
  { tags: [REPORT_CATALOGUE_TAG], revalidate: 3600 }
);

export type CatalogueCategory = Awaited<ReturnType<typeof loadCatalogue>>["categories"][number];

export type CatalogueQuery = {
  id: string;
  name: string;
  description: string;
  category: { id: string; label: string; value: string } | null;
};

/** Categories and reports the given user may open, with role data stripped. */
export async function getReportCatalogueFor(user: AuthzUser): Promise<{
  categories: CatalogueCategory[];
  queries: CatalogueQuery[];
}> {
  const { categories, queries } = await loadCatalogue();
  return {
    categories: categories.filter((c) => userCanSeeCategory(user, c)),
    queries: queries
      .filter((q) => userCanRunQuery(user, q))
      .map((q) => ({
        id: q.id,
        name: q.name,
        description: q.description,
        category: q.category
          ? { id: q.category.id, label: q.category.label, value: q.category.value }
          : null,
      })),
  };
}

/** Call from any server action that creates, edits or deletes a report or category. */
export function invalidateReportCatalogue(): void {
  // Next 16: the second argument is the cache-life profile; "max" marks the entry stale
  // and serves the cached copy while it is refreshed in the background.
  revalidateTag(REPORT_CATALOGUE_TAG, "max");
}
