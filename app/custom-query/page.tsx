import { CustomQueryClient } from '@/app/components/CustomQueryClient';
import { auth, SessionUser } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

export default async function CustomQueryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const user = session.user as SessionUser;
  const activeSchool = user.activeSchool;
  const allowedSchools = user.schools || [];

  // Fetch schools from database
  const schools = await prisma.schoolInfo.findMany({
    orderBy: { name: 'asc' },
  });

  // Filter schools based on user access
  const schoolOptions = schools
    .filter((s) => {
      if (activeSchool === 0) {
        // District-wide: show all schools user has access to
        return allowedSchools.length === 0 || allowedSchools.includes(s.sc);
      } else {
        // Specific school: only show the active school
        return s.sc === activeSchool.toString();
      }
    })
    .map((s) => ({
      code: s.sc,
      name: s.name,
      logo: s.logo || undefined,
    }));

  const isDistrictWide = activeSchool === 0;

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Custom Query Builder</h1>
        <p className="text-muted-foreground">
          Build queries by selecting filters. No AI required - fast and predictable results.
        </p>
        {!isDistrictWide && schoolOptions.length === 1 && (
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
            Data is scoped to {schoolOptions[0]?.name}. Select &quot;District&quot; in the school picker to query all your schools.
          </p>
        )}
      </div>
      <CustomQueryClient
        schoolOptions={schoolOptions}
        activeSchool={activeSchool?.toString()}
        isDistrictWide={isDistrictWide}
        canEditQueries={user.queryEdit === true}
      />
    </div>
  );
}
