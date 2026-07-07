import { AIQueryClient } from '@/app/components/AIQueryClient';
import { auth, SessionUser } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

export default async function AIQueryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const user = session.user as unknown as SessionUser;

  // Access matches the nav link in UserMenu: admins, SUPERADMIN, or the AIQUERY role.
  const aiRoles = user.roles || [];
  const canAccessAI =
    user.admin ||
    aiRoles.includes('AIQUERY' as any) ||
    aiRoles.includes('SUPERADMIN' as any);
  if (!canAccessAI) {
    redirect('/');
  }

  const activeSchool = user.activeSchool;
  const allowedSchools = user.schools || [];

  // Fetch schools from database
  const schools = await prisma.schoolInfo.findMany({
    orderBy: { name: 'asc' },
  });

  // Schools the user can query, for the scope badge
  const schoolOptions = schools
    .filter((s) => {
      if (activeSchool === 0) {
        // District-wide: show all schools user has access to
        return allowedSchools.length === 0 || allowedSchools.includes(s.sc);
      }
      // Specific school: only show the active school
      return s.sc === activeSchool.toString();
    })
    .map((s) => ({
      id: s.sc,
      label: s.name,
      logo: s.logo || undefined,
      code: s.sc,
    }));

  // Determine if user is in district-wide mode or single-school mode
  const isDistrictWide = activeSchool === 0;

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Query Builder</h1>
        <p className="text-muted-foreground">
          Describe what data you need in plain English and let AI generate the SQL query for you.
        </p>
        {!isDistrictWide && schoolOptions.length === 1 && (
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
            Data is scoped to {schoolOptions[0]?.label}. Select &quot;District&quot; in the school picker to query all your schools.
          </p>
        )}
      </div>
      <AIQueryClient
        schoolOptions={schoolOptions}
        activeSchool={activeSchool?.toString()}
        isDistrictWide={isDistrictWide}
        canEditQueries={user.queryEdit === true}
      />
    </div>
  );
}
