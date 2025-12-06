import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
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

  // Fetch query details and categories/queries for sidebar
  const [result, categories, allQueries] = await Promise.all([
    prisma.query.findUnique({
      where: { id },
      include: {
        category: true,
      },
    }),
    prisma.queryCategory.findMany({
      include: {
        roles: true,
      },
      orderBy: { label: "asc" },
    }),
    prisma.query.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        category: {
          select: {
            id: true,
            label: true,
            value: true,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  // Handle not found
  if (!result) {
    notFound();
  }

  // Execute query and get data
  let data: any[] = [];
  let queryError: string | null = null;

  try {
    data = await runQuery(result.query);
  } catch (error) {
    console.error("Query execution error:", error);
    queryError = "Failed to execute query. Please try again later.";
  }

  // Parse hidden columns
  const hiddenColumns = result.hiddenCols
    ? result.hiddenCols.split(",").map((col) => col.trim().toUpperCase())
    : [];

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
        category: result.category,
      }}
      data={data}
      hiddenColumns={hiddenColumns}
      user={session.user}
      error={queryError}
      urlCategory={urlCategory}
      categories={categories}
      allQueries={allQueries}
    />
  );
}
