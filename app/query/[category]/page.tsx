import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth, SessionUser } from "@/auth";
import { getReportCatalogueFor } from "@/lib/reportCatalogue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";

interface PageProps {
  params: Promise<{ category: string }>;
}

/**
 * Lists the reports in one category (finding U6): the report page's breadcrumb
 * has always linked here. Only reports the viewer may open are listed.
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const value = decodeURIComponent(category);

  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const user = session.user as SessionUser;

  const catalogue = await getReportCatalogueFor(user);
  const categoryInfo = catalogue.categories.find((c) => c.value === value);
  const reports = catalogue.queries.filter((q) => (q.category?.value ?? "uncategorized") === value);

  if (!categoryInfo && reports.length === 0) {
    notFound();
  }

  const label = categoryInfo?.label ?? "Uncategorized";

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold">{label}</h1>
        <p className="text-muted-foreground text-sm">
          {reports.length} report{reports.length === 1 ? "" : "s"}
        </p>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No reports in this category are available to you.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Link key={report.id} href={`/query/${encodeURIComponent(value)}/${report.id}`} className="group">
              <Card className="h-full transition-colors group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="flex items-start gap-2 text-base">
                    <FileSpreadsheet className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="group-hover:text-primary">{report.name}</span>
                  </CardTitle>
                  {report.description && (
                    <CardDescription className="line-clamp-3">{report.description}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
