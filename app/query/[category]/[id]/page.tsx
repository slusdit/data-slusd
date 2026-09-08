import { auth, SessionUser } from "@/auth";
import { runQueryWithMeta, formatQueryErrorForUser } from "@/lib/aeries";
import { userCanRunQuery } from "@/lib/authorization";
import { getReportCatalogueFor } from "@/lib/reportCatalogue";
import { parseTotalColumns } from "@/lib/reportTotals";
import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import QueryPageClient from "./QueryPageClient";

// Types
interface PageProps {
  params: Promise<{ id: string; category: string }>;
}

// Main component - Server Component for data fetching
export default async function Page({ params }: PageProps) {
  const { id, category } = await params;
  const urlCategory = decodeURIComponent(category);

  // Validate ID format
  if (!id || id.length < 1) {
    notFound();
  }

  const session = await auth();

  // Handle unauthorized access
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-muted-foreground mb-4">
          Please sign in to view this content.
        </p>
      </div>
    );
  }
  const user = session.user as SessionUser;

  // Fetch the report and the cached, role-filtered sidebar catalogue (P4)
  const [result, catalogue] = await Promise.all([
    prisma.query.findUnique({
      where: { id },
      include: {
        category: { include: { roles: { select: { role: true } } } },
        roles: { select: { role: true } },
      },
    }),
    getReportCatalogueFor(user),
  ]);

  // Report authorization (finding S5): a report the user may not run is
  // indistinguishable from one that does not exist.
  if (!result || !userCanRunQuery(user, result)) {
    notFound();
  }

  // Canonical URL: the category segment must match the report's category.
  const canonicalCategory = result.category?.value ?? "uncategorized";
  if (urlCategory !== canonicalCategory) {
    redirect(`/query/${encodeURIComponent(canonicalCategory)}/${result.id}`);
  }

  // Execute query and get data
  let data: any[] = [];
  let truncated = false;
  let queryError: string | null = null;

  try {
    const queryResult = await runQueryWithMeta(result.query);
    data = queryResult.rows;
    truncated = queryResult.truncated;
  } catch (error) {
    console.error("Query execution error:", error);
    queryError = formatQueryErrorForUser(error, user);
  }

  // Parse hidden columns
  const hiddenColumns = result.hiddenCols
    ? result.hiddenCols.split(",").map((col) => col.trim().toUpperCase())
    : [];

  // Totals footer spec (Phase 3), e.g. "# UPP, Total, UPP %:ratio(# UPP,Total)"
  const totalSpecs = parseTotalColumns(result.totalColumns);


  return (
    <QueryPageClient
      query={{
        id: result.id,
        name: result.name,
        description: result.description,
        chart: result.chart,
        chartXKey: result.chartXKey,
        chartYKey: result.chartYKey,
        chartTypeKey: result.chartTypeKey,
        chartStackKey: result.chartStackKey,
        chartSeriesOverride: result.chartSeriesOverride,
        category: result.category
          ? { id: result.category.id, label: result.category.label, value: result.category.value }
          : null,
      }}
      data={data}
      hiddenColumns={hiddenColumns}
      user={user}
      error={queryError}
      truncated={truncated}
      totalSpecs={totalSpecs}
      urlCategory={urlCategory}
      categories={catalogue.categories}
      allQueries={catalogue.queries}
    />
  );
}
