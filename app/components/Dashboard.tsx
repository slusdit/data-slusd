"use client";

import { SessionUser } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  BarChart3,
  Users,
  GraduationCap,
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  ArrowRight,
  PlusCircle,
  MoreVertical,
  Download,
  ExternalLink
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { runQuery } from "@/lib/aeries";
import { createChartOptions } from "@/lib/chartOptions";
import { DataChart } from "./DataChart";

interface FavoriteData {
  query: any;
  data: any[];
  chartOptions: any;
  loading: boolean;
  error: string | null;
}

interface DashboardProps {
  user: SessionUser;
  activeSchool?: number;
  quickStats?: {
    totalStudents?: number;
    totalStaff?: number;
    attendanceRate?: number;
  };
}

export default function Dashboard({ user, activeSchool, quickStats }: DashboardProps) {
  const { resolvedTheme } = useTheme();
  const [favoritesData, setFavoritesData] = useState<Record<string, FavoriteData>>({});
  const [isLoading, setIsLoading] = useState(true);

  const chartFavorites = user?.favorites?.filter((q) => q.chart) || [];
  const nonChartFavorites = user?.favorites?.filter((q) => !q.chart) || [];

  // Export data to CSV
  const exportToCSV = useCallback((queryName: string, data: any[]) => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma
            if (value === null || value === undefined) return "";
            const stringValue = String(value);
            if (stringValue.includes(",") || stringValue.includes('"')) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${queryName.replace(/[^a-z0-9]/gi, "_")}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!chartFavorites.length) {
        setIsLoading(false);
        return;
      }

      // Initialize loading state
      const initialState: Record<string, FavoriteData> = {};
      chartFavorites.forEach((query) => {
        initialState[query.id] = {
          query,
          data: [],
          chartOptions: null,
          loading: true,
          error: null,
        };
      });
      setFavoritesData(initialState);

      // Fetch all in parallel
      const promises = chartFavorites.map(async (query) => {
        try {
          const response = await runQuery(query.query);
          const chartOptions = await createChartOptions({
            chartTitle: query.name,
            chartXKey: query.chartXKey,
            chartYKey: query.chartYKey,
            chartTypeKey: query.chartTypeKey,
            rowData: response,
            visibleColumns: query.hiddenCols?.split(",") || [],
            chartStackKey: query.chartStackKey || false,
            aggFunction: "sum",
            theme: resolvedTheme,
            height: 220,
          });

          return {
            id: query.id,
            query,
            data: response,
            chartOptions,
            loading: false,
            error: null,
          };
        } catch (error) {
          return {
            id: query.id,
            query,
            data: [],
            chartOptions: null,
            loading: false,
            error: "Failed to load",
          };
        }
      });

      // Update state as each completes
      promises.forEach(async (promise) => {
        const result = await promise;
        setFavoritesData((prev) => ({
          ...prev,
          [result.id]: result,
        }));
      });

      await Promise.all(promises);
      setIsLoading(false);
    };

    fetchFavorites();
  }, [chartFavorites.length, resolvedTheme, activeSchool]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting()}, {user?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your data today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/ai-query">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Query
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats Row */}
      {quickStats && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quickStats.totalStudents?.toLocaleString() || "—"}
              </div>
              <p className="text-xs text-muted-foreground">Active enrollment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quickStats.totalStaff?.toLocaleString() || "—"}
              </div>
              <p className="text-xs text-muted-foreground">Active staff</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quickStats.attendanceRate ? `${quickStats.attendanceRate}%` : "—"}
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Favorite Charts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Your Favorite Reports</h2>
            <Badge variant="secondary">{user?.favorites?.length || 0}</Badge>
          </div>
        </div>

        {(!user?.favorites || user.favorites.length === 0) ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Star className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Add reports to your favorites by clicking the star icon on any query page.
              </p>
              <Button asChild variant="outline">
                <Link href="/ai-query">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Try AI Query Builder
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {chartFavorites.map((query) => {
              const data = favoritesData[query.id];
              const queryUrl = query.widgetLinkOverride || `/query/${query.category?.value || query.category?.label?.toLowerCase() || "general"}/${query.id}`;
              return (
                <Card key={query.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {query.category?.label || "Report"}
                        </Badge>
                        <Link href={queryUrl} className="block group">
                          <CardTitle className="text-base line-clamp-1 group-hover:text-primary group-hover:underline transition-colors">
                            {query.name}
                          </CardTitle>
                        </Link>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={queryUrl} className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              View Full Report
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => exportToCSV(query.name, data?.data || [])}
                            disabled={!data?.data?.length}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Export to CSV
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={queryUrl}>
                      {data?.loading || !data?.chartOptions ? (
                        <Skeleton className="h-[220px] w-full rounded-md" />
                      ) : data?.error ? (
                        <div className="h-[220px] flex items-center justify-center text-muted-foreground">
                          {data.error}
                        </div>
                      ) : (
                        <DataChart
                          chartOptions={data.chartOptions}
                          theme={resolvedTheme}
                          height={220}
                        />
                      )}
                    </Link>
                  </CardContent>
                </Card>
              );
            })}

            {/* Non-chart favorites as smaller cards */}
            {nonChartFavorites.map((query) => (
              <Card key={query.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-2 text-xs w-fit">
                    {query.category?.label || "Report"}
                  </Badge>
                  <CardTitle className="text-base line-clamp-1">{query.name}</CardTitle>
                  {query.description && (
                    <CardDescription className="line-clamp-2">
                      {query.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="ghost" className="w-full justify-between">
                    <Link href={`/query/${query.category?.label?.toLowerCase() || "general"}/${query.id}`}>
                      View Report
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links Section */}
      {(() => {
        const isSuperAdmin = user?.roles?.includes("SUPERADMIN");

        // Define all quick actions with their permission requirements
        const quickActions = [
          {
            key: "gradedistribution",
            href: "/gradedistribution",
            title: "Grade Distribution",
            description: "View grade analytics",
            icon: BarChart3,
            bgColor: "bg-blue-100 dark:bg-blue-900",
            iconColor: "text-blue-600 dark:text-blue-400",
            hasAccess: isSuperAdmin || user?.roles?.includes("GRADEDISTRIBUTION") || user?.roles?.includes("PRINCIPAL"),
          },
          {
            key: "iep-upload",
            href: "/sped/uploadIEP",
            title: "IEP Upload",
            description: "Upload IEP documents",
            icon: PlusCircle,
            bgColor: "bg-green-100 dark:bg-green-900",
            iconColor: "text-green-600 dark:text-green-400",
            hasAccess: isSuperAdmin || user?.roles?.includes("IEPUPLOAD"),
          },
          {
            key: "ai-query",
            href: "/ai-query",
            title: "AI Query Builder",
            description: "Ask questions in plain English",
            icon: Sparkles,
            bgColor: "bg-purple-100 dark:bg-purple-900",
            iconColor: "text-purple-600 dark:text-purple-400",
            hasAccess: isSuperAdmin || user?.roles?.includes("AIQUERY"),
          },
          {
            key: "admin",
            href: "/admin",
            title: "Admin Panel",
            description: "Manage users & queries",
            icon: Users,
            bgColor: "bg-orange-100 dark:bg-orange-900",
            iconColor: "text-orange-600 dark:text-orange-400",
            hasAccess: user?.admin,
          },
        ];

        const visibleActions = quickActions.filter((action) => action.hasAccess);

        if (visibleActions.length === 0) return null;

        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {visibleActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Card key={action.key} className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <Link href={action.href} className="block h-full">
                      <CardHeader className="flex flex-row items-center gap-3 p-4 h-full">
                        <div className={`p-2 ${action.bgColor} rounded-lg shrink-0`}>
                          <IconComponent className={`h-5 w-5 ${action.iconColor}`} />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-sm">{action.title}</CardTitle>
                          <CardDescription className="text-xs">{action.description}</CardDescription>
                        </div>
                      </CardHeader>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
