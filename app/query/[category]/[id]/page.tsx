import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft } from "lucide-react";
import { QueryWithCategory } from "@/app/components/QueryBar";
import { QuerySheet } from "@/app/components/QueiesSheet";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DataTableAgGrid from "@/app/components/DataTableAgGrid";
import FavoriteStarSwitch from "@/app/components/FavoriteStarSwitch";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface PageProps {
  params: Promise<{ id: string; category: string }>;
}

interface QueryResult {
  id: string;
  name: string;
  query: string;
  description: string;
  chart: boolean;
  chartXKey?: string;
  chartYKey?: string;
  chartTypeKey?: string;
  chartStackKey?: string;
  hiddenCols?: string;
  chartSeriesOverride?: string;
}

interface Category {
  id: string;
  value: string;
  queries: any[];
  roles: any[];
}

// Utility functions
const parseHiddenColumns = (hiddenCols?: string): string[] => {
  if (!hiddenCols) return [];
  return hiddenCols.split(",").map((col) => col.trim().toUpperCase());
};

const decodeCategory = (category: string): string => {
  return decodeURIComponent(category.split("%20")[0]);
};

// Components
const PageHeader = ({ 
  result, 
  id, 
  session 
}: { 
  result: QueryResult; 
  id: string; 
  session: any; 
}) => (
  <div className="items-left w-full">
    <Button variant="link" className="p-0 h-auto">
      <Link href="/" className="hover:underline text-primary flex items-center">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Home
      </Link>
    </Button>
    
    <div className="flex justify-between w-full mt-4">
      <h1 className="text-3xl font-bold">{result.name}</h1>
      <FavoriteStarSwitch queryId={id} user={session?.user} />
    </div>
  </div>
);

const QueryDescription = ({ description }: { description: string }) => (
  <div className="my-4">
    <label htmlFor="description" className="block text-sm font-medium mb-2">
      Description:
    </label>
    <div id="description" className="text-muted-foreground">
      {description || "No description available."}
    </div>
  </div>
);

const EmptyState = ({ result }: { result: QueryResult }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="text-6xl mb-4" role="img" aria-label="No data">
      📊
    </div>
    <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
    <p className="text-muted-foreground max-w-md">
      The query "{result.name}" returned no data. Try adjusting your parameters or check back later.
    </p>
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="text-6xl mb-4" role="img" aria-label="Error">
      ⚠️
    </div>
    <h2 className="text-xl font-semibold mb-2 text-destructive">
      Something went wrong
    </h2>
    <p className="text-muted-foreground max-w-md mb-4">
      {error.message || "An unexpected error occurred while loading the data."}
    </p>
    <Button variant="outline" onClick={() => window.location.reload()}>
      Try Again
    </Button>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-8 bg-muted rounded w-1/3"></div>
    <div className="h-4 bg-muted rounded w-2/3"></div>
    <div className="h-64 bg-muted rounded"></div>
  </div>
);

// Main component
export default async function Page({ params }: PageProps) {
  try {
    const { id, category } = await params;
    const urlCategory = decodeCategory(category);
    
    // Validate ID format (basic validation)
    if (!id || id.length < 1) {
      notFound();
    }

    const session = await auth();

    // Parallel data fetching for better performance
    const [result, categories, queries] = await Promise.all([
      prisma.query.findUnique({ where: { id } }),
      session?.user ? prisma.queryCategory.findMany({
        include: {
          queries: true,
          roles: true,
        },
      }) : null,
      session?.user ? prisma.query.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          hiddenCols: true,
          chartTypeKey: true,
          chartXKey: true,
          chartYKey: true,
          category: {
            select: {
              id: true,
              value: true,
            },
          },
        },
      }) : null,
    ]);

    // Handle not found
    if (!result) {
      notFound();
    }

    // Handle unauthorized access
    if (!session?.user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">
            Please sign in to view this content.
          </p>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      );
    }

    // Execute query and get data
    let data: any[] = [];
    try {
      data = await runQuery(result.query);
    } catch (queryError) {
      console.error("Query execution error:", queryError);
      return (
        <div className="space-y-6">
          <PageHeader result={result} id={id} session={session} />
          <QueryDescription description={result.description} />
          <ErrorFallback 
            error={new Error("Failed to execute query. Please try again later.")} 
          />
        </div>
      );
    }

    const hiddenColumns = parseHiddenColumns(result.hiddenCols);

    // Common header section
    const headerSection = (
      <>
        <PageHeader result={result} id={id} session={session} />
        
        <div className="my-6">
          <Suspense fallback={<LoadingSkeleton />}>
            <QuerySheet
              categories={categories as Category[]}
              queries={queries as QueryWithCategory[]}
              database={process.env.DB_DATABASE as string}
              roles={session.user.roles}
              user={session.user}
              accordion
              defaultExpandedAccordion={urlCategory}
            />
          </Suspense>
        </div>
        
        <QueryDescription description={result.description} />
      </>
    );

    // Handle empty data
    if (data.length === 0) {
      return (
        <div className="container mx-auto px-4 py-6">
          {headerSection}
          <EmptyState result={result} />
        </div>
      );
    }

    // Render with data
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col w-full">
          <div className="mt-6">
          {headerSection}
          
            <CardContent>

            <Suspense fallback={<LoadingSkeleton />}>
              <DataTableAgGrid
                data={data}
                id={id}
                showChart={result.chart}
                chartTitle={result.name}
                chartXKey={result.chartXKey}
                chartYKey={result.chartYKey}
                chartTypeKey={result.chartTypeKey}
                chartStackKey={result.chartStackKey}
                hiddenColumns={hiddenColumns}
                title={result.name}
                chartSeriesOverride={result.chartSeriesOverride}
              />
            </Suspense>
                </CardContent>
          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error("Page error:", error);
    return <ErrorFallback error={error as Error} />;
  }
}