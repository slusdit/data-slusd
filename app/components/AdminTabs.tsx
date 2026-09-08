"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAdminGrid from "./UserAdminGrid";
import QueryAdminGrid from "./QueryAdminGrid";
import FragmentAdminGrid from "./FragmentAdminGrid";
import CategoryAdminGrid from "./CategoryAdminGrid";
import AdminSettingsPanel from "./AdminSettingsPanel";
import AuditLogPanel, { AuditEntry } from "./AuditLogPanel";
import { QueryWithCategory } from "./QueryBar";
import { Users, Database, Sparkles, Settings, Tags, ScrollText } from "lucide-react";
import { Session } from "next-auth";

type AdminPermissions = {
  isSuperAdmin: boolean;
  isSiteAdmin: boolean;
  isQueryEditor: boolean;
  userSchools: string[];
};

type SettingsData = {
  currentDefaultYear: number;
  calculatedYear: number;
  onUpdateDefaultYear: (year: number, userId: string) => Promise<void>;
};

type AdminTabsProps = {
  users: any[];
  roles: any[];
  queries: QueryWithCategory[];
  categories: any[];
  session: Session | null;
  fragments: any[];
  fragmentCategories: any[];
  permissions?: AdminPermissions;
  settingsData?: SettingsData;
  auditEntries?: AuditEntry[];
};

const TAB_IDS = ["users", "queries", "categories", "fragments", "settings", "audit"] as const;
type TabId = (typeof TAB_IDS)[number];

// Tailwind only generates classes it can see, so the column count must be an
// explicit map rather than a template string (finding U9).
const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export default function AdminTabs({
  users,
  roles,
  queries,
  categories,
  session,
  fragments,
  fragmentCategories,
  permissions,
  settingsData,
  auditEntries = [],
}: AdminTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine which tabs should be visible based on permissions
  const { isSuperAdmin = false, isSiteAdmin = false, isQueryEditor = false } = permissions || {};

  // Query and Fragment tabs require either SuperAdmin or QueryEditor permission
  const canSeeQueryTabs = isSuperAdmin || isQueryEditor;

  // Users tab is visible to SuperAdmin and SiteAdmin
  const canSeeUsersTab = isSuperAdmin || isSiteAdmin;

  // Settings and Audit tabs only visible to SuperAdmin
  const canSeeSettingsTab = isSuperAdmin;
  const canSeeAuditTab = isSuperAdmin;

  const visibleTabs: TabId[] = [
    canSeeUsersTab && "users",
    canSeeQueryTabs && "queries",
    canSeeQueryTabs && "categories",
    canSeeQueryTabs && "fragments",
    canSeeSettingsTab && "settings",
    canSeeAuditTab && "audit",
  ].filter((t): t is TabId => Boolean(t));

  const gridCols = GRID_COLS[visibleTabs.length] ?? "grid-cols-6";

  // The active tab lives in the URL (?tab=) so it survives refreshes and can be linked (finding U9)
  const requested = searchParams.get("tab") as TabId | null;
  const activeTab: TabId =
    requested && visibleTabs.includes(requested) ? requested : visibleTabs[0] ?? "queries";

  const setActiveTab = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className={`grid w-full ${gridCols} mb-6`}>
        {canSeeUsersTab && (
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        )}
        {canSeeQueryTabs && (
          <TabsTrigger value="queries" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Queries
          </TabsTrigger>
        )}
        {canSeeQueryTabs && (
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            Categories
          </TabsTrigger>
        )}
        {canSeeQueryTabs && (
          <TabsTrigger value="fragments" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Fragments
          </TabsTrigger>
        )}
        {canSeeSettingsTab && (
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        )}
        {canSeeAuditTab && (
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            Audit
          </TabsTrigger>
        )}
      </TabsList>

      {canSeeUsersTab && (
        <TabsContent value="users">
          <UserAdminGrid
            dataIn={users}
            availableRoles={roles}
            availableQueries={queries}
            isSiteAdmin={isSiteAdmin && !isSuperAdmin}
          />
        </TabsContent>
      )}

      {canSeeQueryTabs && (
        <TabsContent value="queries">
          <QueryAdminGrid
            dataIn={queries}
            categories={categories}
            session={session}
          />
        </TabsContent>
      )}

      {canSeeQueryTabs && (
        <TabsContent value="categories">
          <CategoryAdminGrid
            categories={categories}
            roles={roles}
          />
        </TabsContent>
      )}

      {canSeeQueryTabs && (
        <TabsContent value="fragments">
          <FragmentAdminGrid
            fragments={fragments}
            categories={fragmentCategories}
          />
        </TabsContent>
      )}

      {canSeeSettingsTab && settingsData && session?.user && (
        <TabsContent value="settings">
          <AdminSettingsPanel
            currentDefaultYear={settingsData.currentDefaultYear}
            calculatedYear={settingsData.calculatedYear}
            userId={(session.user as any).id}
            onUpdateDefaultYear={settingsData.onUpdateDefaultYear}
          />
        </TabsContent>
      )}

      {canSeeAuditTab && (
        <TabsContent value="audit">
          <AuditLogPanel entries={auditEntries} />
        </TabsContent>
      )}
    </Tabs>
  );
}
