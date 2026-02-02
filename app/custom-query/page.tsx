import { CustomQueryClient } from '@/app/components/CustomQueryClient';
import { auth, SessionUser } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

// Define grade ranges for each school
// TK = -1, K = 0, 1-12 = 1-12
const SCHOOL_GRADE_RANGES: Record<string, { low: number; high: number }> = {
  '2': { low: -1, high: 5 },   // Garfield Elementary
  '3': { low: -1, high: 5 },   // Jefferson Elementary
  '4': { low: -1, high: 5 },   // Madison Elementary
  '5': { low: -1, high: 5 },   // McKinley Elementary
  '6': { low: -1, high: 5 },   // Monroe Elementary
  '7': { low: -1, high: 5 },   // Roosevelt Elementary
  '8': { low: -1, high: 5 },   // Washington Elementary
  '9': { low: -1, high: 5 },   // Halkin Elementary
  '11': { low: 6, high: 8 },   // Bancroft Middle School
  '12': { low: 6, high: 8 },   // Muir Middle School
  '15': { low: 9, high: 12 },  // Lincoln High School
  '16': { low: 9, high: 12 },  // San Leandro High School
  '60': { low: -1, high: 5 },  // SLVA Elementary
  '61': { low: 6, high: 8 },   // SLVA Middle
  '62': { low: 9, high: 12 },  // SLVA High
};

export default async function CustomQueryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const user = session.user as unknown as SessionUser;
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
      gradeRange: SCHOOL_GRADE_RANGES[s.sc] || { low: -1, high: 12 },
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
