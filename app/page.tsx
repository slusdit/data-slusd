import { auth, SessionUser } from "@/auth";
import { QueryWithCategory } from "./components/QueryBar";
import prisma from "@/lib/db";
import Dashboard from "./components/Dashboard";
import ReportsSidebar from "./components/ReportsSidebar";

export default async function Home() {
  const session = await auth();

  const queries: QueryWithCategory[] = await prisma.query.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      publicQuery: true,
      createdBy: true,
      category: {
        select: {
          label: true,
          value: true,
        },
      },
    },
  });

  let categories: any[] = [];
  if (session?.user) {
    categories = await prisma.queryCategory.findMany({
      include: {
        queries: true,
        roles: true,
      },
    });
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
        user={session.user}
        session={session}
      />

      {/* Main Dashboard */}
      <main className="min-h-[calc(100vh-4rem)]">
        <Dashboard
          user={session.user}
          activeSchool={(session.user as SessionUser).activeSchool}
        />
      </main>
    </>
  );
}
