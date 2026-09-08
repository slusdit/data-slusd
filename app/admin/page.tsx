import adminCheck, { AdminCheckResult } from "@/lib/adminCheck";
import BackButton from "@/app/components/BackButton";
import { QueryWithCategory } from "../components/QueryBar";
import QueryAdminGrid from "../components/QueryAdminGrid";
import UserAdminGrid from "../components/UserAdminGrid";
import FragmentAdminGrid from "../components/FragmentAdminGrid";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import AdminTabs from "../components/AdminTabs";
import { getDefaultDbYear, updateDefaultDbYear } from "@/lib/appSettings";
import { calculateCurrentSchoolYear } from "@/lib/schoolYear";

type UserRole = {
  id: string;
  role: "USER" | "ADMIN" | "SUPERADMIN" | "HR" | "TEACHER" | "SITEADMIN" | "STAFF";
};

type UserSchool = {
  school: {
    id: string;
    sc: string;
    name: string;
  };
};

export type AdminPageUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  admin: boolean;
  queryEdit: boolean;
  activeSchool: number;
  primarySchool: number | null;
  lastLogin: Date | null;
  userRole: UserRole[];
  UserSchool: UserSchool[];
};

export default async function AdminPage() {
  const adminResult = await adminCheck();

  if (!adminResult) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="text-muted-foreground mt-2">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const { isSuperAdmin, isSiteAdmin, isQueryEditor, userSchools } = adminResult;
  // Report SQL is only fetched for viewers who can see the Queries tab (finding S14)
  const canSeeQueries = isSuperAdmin || isQueryEditor;

  // Fetch all data in parallel
  const [queries, roles, allUsers, session, categories, fragments, fragmentCategories, currentDefaultYear] =
    await Promise.all([
      canSeeQueries ? prisma.query.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          publicQuery: true,
          roles: { select: { role: true } },
          createdBy: true,
          query: true,
          chart: true,
          chartXKey: true,
          chartYKey: true,
          chartTypeKey: true,
          chartStackKey: true,
          hiddenCols: true,
          totalColumns: true,
          categoryId: true,
          widgetLinkOverride: true,
          chartSeriesOverride: true,
          category: {
            select: {
              id: true,
              value: true,
              roles: { select: { role: true } },
            },
          },
        },
      }) : Promise.resolve([]),
      prisma.role.findMany(),
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          admin: true,
          favorites: true,
          queryEdit: true,
          activeSchool: true,
          primarySchool: true,
          primaryRole: true,
          lastLogin: true,
          // Manual overrides
          blockedSchools: true,
          addedSchools: true,
          blockedRoles: true,
          addedRoles: true,
          UserRole: {
            select: {
              role: {
                select: {
                  id: true,
                  role: true,
                },
              },
            },
          },
          UserSchool: {
            select: {
              school: {
                select: {
                  id: true,
                  sc: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      auth(),
      prisma.queryCategory.findMany({
        include: { roles: true },
        orderBy: { sort: "asc" },
      }),
      prisma.aIFragment.findMany({
        orderBy: { sortOrder: "asc" },
        include: { category: true },
      }),
      prisma.aIFragmentCategory.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      getDefaultDbYear(),
    ]);

  // Finding S5: reports with no roles on themselves or their category are open
  // to every signed-in user. Surface them so an admin can assign roles.
  const unrestrictedReports = queries.filter(
    (q) => q.roles.length === 0 && (q.category?.roles?.length ?? 0) === 0
  );
  if (unrestrictedReports.length > 0) {
    console.warn(
      `[admin] ${unrestrictedReports.length} report(s) have no role restrictions: ` +
        unrestrictedReports.map((q) => `${q.name} (${q.id})`).join(", ")
    );
  }

  // Audit log (finding U8): super admins only, newest first
  const auditEntries = isSuperAdmin
    ? await prisma.adminAuditLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 })
    : [];

  // Transform UserRole data to flat userRole shape expected by components
  const transformedUsers = allUsers.map((user) => ({
    ...user,
    userRole: user.UserRole.map((ur) => ur.role),
  }));

  // Only viewers who can see the Users tab receive any user PII in the payload.
  // A query-editor-only admin never gets the user list serialized to the client.
  let users: typeof transformedUsers = [];
  if (isSuperAdmin) {
    users = transformedUsers;
  } else if (isSiteAdmin) {
    // Site Admins can only see users at their schools.
    users = transformedUsers.filter((user) => {
      const userSchoolCodes = user.UserSchool.map((us) => us.school.sc);
      const hasCommonSchool = userSchoolCodes.some((sc) => userSchools.includes(sc));
      const hasSamePrimarySchool = user.primarySchool && userSchools.includes(user.primarySchool.toString());
      return hasCommonSchool || hasSamePrimarySchool;
    });
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {isSiteAdmin && !isSuperAdmin && (
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-sm">
            Site Admin View
          </span>
        )}
      </div>

      <AdminTabs
        users={users}
        roles={roles}
        queries={queries as QueryWithCategory[]}
        categories={categories}
        session={session}
        fragments={fragments}
        fragmentCategories={fragmentCategories}
        permissions={{
          isSuperAdmin,
          isSiteAdmin,
          isQueryEditor,
          userSchools,
        }}
        auditEntries={auditEntries as any}
        settingsData={{
          currentDefaultYear,
          calculatedYear: calculateCurrentSchoolYear(),
          onUpdateDefaultYear: updateDefaultDbYear,
        }}
      />
    </div>
  );
}
