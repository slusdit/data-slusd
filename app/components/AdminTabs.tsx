"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAdminGrid from "./UserAdminGrid";
import QueryAdminGrid from "./QueryAdminGrid";
import FragmentAdminGrid from "./FragmentAdminGrid";
import { QueryWithCategory } from "./QueryBar";
import { Users, Database, Sparkles } from "lucide-react";
import { Session } from "next-auth";

type AdminPermissions = {
  isSuperAdmin: boolean;
  isSiteAdmin: boolean;
  isQueryEditor: boolean;
  userSchools: string[];
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
}: AdminTabsProps) {
  // Determine which tabs should be visible based on permissions
  const { isSuperAdmin = false, isSiteAdmin = false, isQueryEditor = false } = permissions || {};

  // Query and Fragment tabs require either SuperAdmin or QueryEditor permission
  const canSeeQueryTabs = isSuperAdmin || isQueryEditor;

  // Users tab is visible to SuperAdmin and SiteAdmin
  const canSeeUsersTab = isSuperAdmin || isSiteAdmin;

  // Determine available tabs for the grid layout
  const visibleTabs = [
    canSeeUsersTab && "users",
    canSeeQueryTabs && "queries",
    canSeeQueryTabs && "fragments",
  ].filter(Boolean);

  const gridCols = visibleTabs.length === 1 ? "grid-cols-1" :
                   visibleTabs.length === 2 ? "grid-cols-2" : "grid-cols-3";

  // Default to first available tab
  const defaultTab = canSeeUsersTab ? "users" : "queries";

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
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
          <TabsTrigger value="fragments" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Fragments
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
        <TabsContent value="fragments">
          <FragmentAdminGrid
            fragments={fragments}
            categories={fragmentCategories}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
