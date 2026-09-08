import { auth, SessionUser } from "@/auth";
import { QueryWithCategory } from "./components/QueryBar";
import prisma from "@/lib/db";
import { getReportCatalogueFor } from "@/lib/reportCatalogue";
import Dashboard from "./components/Dashboard";
import ReportsSidebar from "./components/ReportsSidebar";

export default async function Home() {
  const session = await auth();

  // Cached, role-filtered catalogue (findings P4/S5): only reports this user
  // may open are serialized to the browser.
  let queries: QueryWithCategory[] = [];
  let categories: any[] = [];
  if (session?.user) {
    const catalogue = await getReportCatalogueFor(session.user as SessionUser);
    queries = catalogue.queries as unknown as QueryWithCategory[];
    categories = catalogue.categories;
  }

  // If not logged in, show a simple landing page
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
        <h1 className="text-4xl font-bold mb-4">SLUSD Data Dashboard</h1>
        <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
          Access student data, reports, and analytics for San Leandro Unified School District.
        </p>
        <p className="text-muted-foreground">
          Please sign in with your @slusd.us account to continue.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Slide-out Reports Sidebar */}
      <ReportsSidebar
        categories={categories}
        queries={queries}
        user={session.user as any}
        session={session}
      />

      {/* Main Dashboard */}
      <main className="min-h-[calc(100vh-4rem)]">
        <Dashboard
          user={session.user}
          activeSchool={(session.user as unknown as SessionUser).activeSchool}
        />
      </main>
    </>
  );
}
