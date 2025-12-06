"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import { ColDef, GridReadyEvent, GridApi } from "ag-grid-community";
import { colorSchemeDarkBlue, themeQuartz } from "ag-grid-enterprise";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  Table,
  Download,
  ChevronDown,
  AlertCircle,
  FileSpreadsheet,
  FolderOpen,
  LayoutGrid,
  Filter,
  RefreshCw,
  Share2,
  Printer,
  Link as LinkIcon,
  Check,
  Copy,
  LineChart,
  PieChart,
  BarChart,
  TrendingUp,
  Calculator,
  History,
  X,
  Loader2,
} from "lucide-react";

import FavoriteStarSwitch from "@/app/components/FavoriteStarSwitch";
import { SessionUser } from "@/auth";

interface Category {
  id: string;
  label: string;
  value: string;
  roles?: { role: string }[];
}

interface QueryItem {
  id: string;
  name: string;
  description: string | null;
  category: {
    id: string;
    label: string;
    value: string;
  } | null;
}

interface QueryPageClientProps {
  query: {
    id: string;
    name: string;
    description: string | null;
    chart: boolean;
    chartXKey: string | null;
    chartYKey: string | null;
    chartTypeKey: string | null;
    chartStackKey: string | null;
    chartSeriesOverride: string | null;
    category: {
      id: string;
      label: string;
      value: string;
    } | null;
  };
  data: any[];
  hiddenColumns: string[];
  user: SessionUser;
  error: string | null;
  urlCategory: string;
  categories: Category[];
  allQueries: QueryItem[];
}

// Quick stats interface
interface QuickStats {
  column: string;
  sum: number;
  avg: number;
  min: number;
  max: number;
  count: number;
}

// Helper to abbreviate long labels
function abbreviateLabel(label: string): string {
  if (!label || typeof label !== "string") return label;
  if (label.startsWith("SLVA")) {
    if (label.includes("Elementary")) return "SLVA-E";
    if (label.includes("Middle")) return "SLVA-M";
    if (label.includes("High")) return "SLVA-H";
  }
  const dateMatch = label.match(/^\d{4}-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    return `${parseInt(dateMatch[1])}/${parseInt(dateMatch[2])}`;
  }
  return label;
}

// Query history storage key
const QUERY_HISTORY_KEY = "slusd-query-history";
const MAX_HISTORY_ITEMS = 10;

// Get query history from localStorage
function getQueryHistory(): { id: string; name: string; category: string; timestamp: number }[] {
  if (typeof window === "undefined") return [];
  try {
    const history = localStorage.getItem(QUERY_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

// Add to query history
function addToQueryHistory(query: { id: string; name: string; category: string }) {
  if (typeof window === "undefined") return;
  try {
    let history = getQueryHistory();
    // Remove if already exists
    history = history.filter((h) => h.id !== query.id);
    // Add to beginning
    history.unshift({ ...query, timestamp: Date.now() });
    // Limit size
    history = history.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(QUERY_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors
  }
}

// ID Cell Renderer for linking to student pages
const IdCellRenderer = (props: any) => {
  const sc = props.data?.sc || props.data?.SC || "";
  const value = props.value || "";

  if (props.node.group || props.node.aggData) {
    const displayValue = props.value?.value || props.value || "";
    return <div>{displayValue}</div>;
  }

  if (!sc) return <div>{value}</div>;

  return (
    <Link
      href={`/${sc}/student/${value}`}
      className="text-blue-500 hover:text-blue-700 hover:underline"
    >
      {value}
    </Link>
  );
};

export default function QueryPageClient({
  query,
  data,
  hiddenColumns,
  user,
  error,
  urlCategory,
  categories,
  allQueries,
}: QueryPageClientProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [activeTab, setActiveTab] = useState(query.chart ? "both" : "table");
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  // New feature states
  const [chartType, setChartType] = useState(query.chartTypeKey || "bar");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [queryHistory, setQueryHistory] = useState<{ id: string; name: string; category: string; timestamp: number }[]>([]);

  // Load query history on mount and add current query
  useEffect(() => {
    setQueryHistory(getQueryHistory());
    if (query.id && query.name) {
      addToQueryHistory({
        id: query.id,
        name: query.name,
        category: query.category?.value || "general",
      });
    }
  }, [query.id, query.name, query.category?.value]);

  // Filter categories by user roles
  const userRoles = user?.roles || [];
  const isSuperAdmin = userRoles.includes("SUPERADMIN");

  const accessibleCategories = useMemo(() => {
    return categories.filter((cat) => {
      const categoryRoles = cat.roles?.map((r) => r.role) || [];
      return (
        isSuperAdmin ||
        categoryRoles.length === 0 ||
        userRoles.some((role) => categoryRoles.includes(role))
      );
    });
  }, [categories, userRoles, isSuperAdmin]);

  // Group queries by category
  const queriesByCategory = useMemo(() => {
    const grouped: Record<string, QueryItem[]> = {};
    allQueries.forEach((q) => {
      const catValue = q.category?.value || "uncategorized";
      if (!grouped[catValue]) grouped[catValue] = [];
      grouped[catValue].push(q);
    });
    return grouped;
  }, [allQueries]);

  // Calculate quick stats for numeric columns
  const quickStats = useMemo<QuickStats[]>(() => {
    if (!data || data.length === 0) return [];

    const dataToAnalyze = selectedRows.length > 0 ? selectedRows : filteredData;
    const stats: QuickStats[] = [];

    const firstRow = data[0];
    Object.keys(firstRow).forEach((key) => {
      if (typeof firstRow[key] === "number" && !hiddenColumns.includes(key.toUpperCase())) {
        const values = dataToAnalyze.map((row) => row[key]).filter((v) => typeof v === "number");
        if (values.length > 0) {
          stats.push({
            column: key,
            sum: values.reduce((a, b) => a + b, 0),
            avg: values.reduce((a, b) => a + b, 0) / values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            count: values.length,
          });
        }
      }
    });

    return stats;
  }, [data, filteredData, selectedRows, hiddenColumns]);

  // Grid theme
  const gridTheme = useMemo(() => {
    return resolvedTheme === "dark"
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);

  // Chart theme
  const chartTheme = useMemo(
    () => (resolvedTheme === "dark" ? "ag-polychroma-dark" : "ag-polychroma"),
    [resolvedTheme]
  );

  // Update filtered data when grid filters change
  const updateFilteredData = useCallback((params: any) => {
    const updatedData: any[] = [];
    params.api.forEachNodeAfterFilterAndSort((node: any) => {
      if (node.data) updatedData.push(node.data);
    });
    setFilteredData(updatedData);
  }, []);

  // Column definitions
  const columnDefs = useMemo<ColDef[]>(() => {
    if (!data || data.length === 0) return [];

    const checkboxCol: ColDef = {
      headerName: "",
      field: "checkboxCol",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      filter: false,
      width: 50,
      flex: 0,
      suppressSizeToFit: true,
    };

    const dataCols: ColDef[] = Object.keys(data[0]).map((key) => {
      const baseCol: ColDef = {
        field: key,
        headerName: key,
        hide: hiddenColumns?.includes(key.toUpperCase()),
      };

      if (key.toLowerCase() === "id" && ("sc" in data[0] || "SC" in data[0])) {
        return { ...baseCol, cellRenderer: IdCellRenderer };
      }

      if (["dt", "date", "day"].includes(key.toLowerCase())) {
        return {
          ...baseCol,
          filter: "agDateColumnFilter",
          filterParams: { buttons: ["apply", "reset"], closeOnApply: true },
        };
      }

      if (typeof data[0][key] === "number") {
        return {
          ...baseCol,
          filter: "agNumberColumnFilter",
          filterParams: { buttons: ["apply", "reset"], closeOnApply: true },
        };
      }

      return baseCol;
    });

    return [checkboxCol, ...dataCols];
  }, [data, hiddenColumns]);

  // Default column definition
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      flex: 1,
      minWidth: 100,
    }),
    []
  );

  // Chart options with dynamic chart type
  const chartOptions = useMemo(() => {
    if (!query.chart || !data?.length) return null;

    const chartYKeyArray = query.chartYKey?.split(",").map((k) => k.trim()) || [];
    const chartData = (selectedRows.length ? selectedRows : filteredData).map(
      (row) => ({
        ...row,
        ...(query.chartXKey
          ? { [query.chartXKey]: abbreviateLabel(String(row[query.chartXKey] || "")) }
          : {}),
      })
    );

    // For pie charts, we need different config
    if (chartType === "pie" || chartType === "donut") {
      return {
        height: 400,
        theme: chartTheme,
        data: chartData,
        title: { text: query.name, fontSize: 16 },
        series: [
          {
            type: "pie",
            angleKey: chartYKeyArray[0] || "value",
            legendItemKey: query.chartXKey || "SC",
            innerRadiusRatio: chartType === "donut" ? 0.5 : 0,
          },
        ],
        legend: { position: "right" },
      };
    }

    return {
      height: 400,
      theme: chartTheme,
      data: chartData,
      title: { text: query.name, fontSize: 16 },
      padding: { top: 20, right: 30, bottom: 40, left: 50 },
      series: chartYKeyArray.map((key) => ({
        type: chartType,
        xKey: query.chartXKey || "SC",
        yKey: key,
        yName: key,
        stacked: query.chartStackKey === "true",
        cornerRadius: chartType === "bar" ? 4 : 0,
      })),
      axes: [
        {
          type: "category",
          position: "bottom",
          label: { rotation: 0, fontSize: 11 },
        },
        {
          type: "number",
          position: "left",
          label: {
            fontSize: 11,
            formatter: (params: any) => {
              const val = params.value;
              if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
              if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
              return val;
            },
          },
        },
      ],
      legend: { enabled: chartYKeyArray.length > 1, position: "bottom" },
    };
  }, [query, data, selectedRows, filteredData, chartTheme, chartType]);

  // Export to CSV
  const exportToCSV = useCallback(() => {
    if (!gridApi) return;
    gridApi.exportDataAsCsv({
      skipHeader: false,
      onlySelected: selectedRows.length > 0,
      fileName: `${query.name.replace(/[^a-z0-9]/gi, "_")}_${new Date().toISOString().split("T")[0]}.csv`,
    });
  }, [gridApi, query.name, selectedRows.length]);

  // Print function
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Copy share link
  const copyShareLink = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, []);

  // Refresh data
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [router]);

  // Grid ready handler
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }, []);

  // Sidebar config
  const sideBar = useMemo(
    () => ({
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
      ],
    }),
    []
  );

  // Handle query selection change
  const handleQueryChange = (queryId: string) => {
    const selectedQuery = allQueries.find((q) => q.id === queryId);
    if (selectedQuery) {
      router.push(`/query/${selectedQuery.category?.value || "general"}/${queryId}`);
    }
  };

  // Chart type options
  const chartTypeOptions = [
    { value: "bar", label: "Bar", icon: BarChart },
    { value: "line", label: "Line", icon: LineChart },
    { value: "area", label: "Area", icon: TrendingUp },
    { value: "pie", label: "Pie", icon: PieChart },
    { value: "donut", label: "Donut", icon: PieChart },
  ];

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground max-w-md mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {query.category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/query/${query.category.value}`}>
                    {query.category.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{query.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                {query.category && <Badge variant="outline">{query.category.label}</Badge>}
                <h1 className="text-2xl font-bold">{query.name}</h1>
              </div>
              <FavoriteStarSwitch queryId={query.id} user={user} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
              <p className="text-muted-foreground max-w-md">
                This query returned no data. Try adjusting your parameters or check back later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render grid
  const renderGrid = (height: string = "600px") => (
    <div style={{ height }} className="w-full">
      <AgGridReact
        theme={gridTheme}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection="multiple"
        onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
        onFilterChanged={updateFilteredData}
        onSortChanged={updateFilteredData}
        enableCellTextSelection
        suppressRowClickSelection
        pagination
        paginationPageSize={50}
        paginationPageSizeSelector={[25, 50, 100, 500]}
        animateRows
        sideBar={sideBar}
      />
    </div>
  );

  // Render chart
  const renderChart = (height: number = 400) => (
    <div className="w-full" style={{ height }}>
      {chartOptions && <AgCharts options={{ ...chartOptions, height }} />}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 print:p-0">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
        }
      `}</style>

      {/* Breadcrumb Navigation */}
      <Breadcrumb className="no-print">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {query.category && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/query/${query.category.value}`}>
                  {query.category.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{query.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            {/* Left side - Query info */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {query.category && <Badge variant="outline">{query.category.label}</Badge>}
                <Badge variant="secondary">
                  {filteredData.length === data.length
                    ? `${data.length.toLocaleString()} rows`
                    : `${filteredData.length.toLocaleString()} of ${data.length.toLocaleString()} rows`}
                </Badge>
                {selectedRows.length > 0 && (
                  <Badge variant="default">{selectedRows.length} selected</Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold">{query.name}</h1>

              {/* Collapsible Description */}
              {query.description && (
                <Collapsible open={descriptionOpen} onOpenChange={setDescriptionOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-foreground no-print">
                      <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${descriptionOpen ? "rotate-180" : ""}`} />
                      {descriptionOpen ? "Hide" : "Show"} description
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <p className="text-muted-foreground">{query.description}</p>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>

            {/* Right side - Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 no-print">
              {/* Reports Dropdown */}
              <Select value={query.id} onValueChange={handleQueryChange}>
                <SelectTrigger className="w-[220px]">
                  <FolderOpen className="h-4 w-4 mr-2 shrink-0" />
                  <SelectValue placeholder="Switch report..." />
                </SelectTrigger>
                <SelectContent>
                  {/* Recent queries */}
                  {queryHistory.length > 0 && (
                    <SelectGroup>
                      <SelectLabel className="flex items-center gap-2">
                        <History className="h-3 w-3" />
                        Recent
                      </SelectLabel>
                      {queryHistory.slice(0, 5).map((h) => (
                        <SelectItem key={`history-${h.id}`} value={h.id}>
                          {h.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  {accessibleCategories.map((cat) => {
                    const catQueries = queriesByCategory[cat.value] || [];
                    if (catQueries.length === 0) return null;
                    return (
                      <SelectGroup key={cat.id}>
                        <SelectLabel className="flex items-center gap-2">
                          <FolderOpen className="h-3 w-3" />
                          {cat.label}
                        </SelectLabel>
                        {catQueries.map((q) => (
                          <SelectItem key={q.id} value={q.id}>
                            {q.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    );
                  })}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                {/* Refresh button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh data</TooltipContent>
                </Tooltip>

                {/* Quick stats button */}
                {quickStats.length > 0 && (
                  <Dialog open={showStats} onOpenChange={setShowStats}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Quick Statistics</DialogTitle>
                        <DialogDescription>
                          {selectedRows.length > 0
                            ? `Statistics for ${selectedRows.length} selected rows`
                            : `Statistics for ${filteredData.length} rows`}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 max-h-[60vh] overflow-auto">
                        {quickStats.map((stat) => (
                          <Card key={stat.column}>
                            <CardHeader className="py-3">
                              <CardTitle className="text-sm font-medium">{stat.column}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="grid grid-cols-5 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Sum</p>
                                  <p className="font-medium">{stat.sum.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Average</p>
                                  <p className="font-medium">{stat.avg.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Min</p>
                                  <p className="font-medium">{stat.min.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Max</p>
                                  <p className="font-medium">{stat.max.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Count</p>
                                  <p className="font-medium">{stat.count.toLocaleString()}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Share/Export dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={copyShareLink}>
                      {linkCopied ? <Check className="h-4 w-4 mr-2" /> : <LinkIcon className="h-4 w-4 mr-2" />}
                      {linkCopied ? "Copied!" : "Copy link"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportToCSV}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV {selectedRows.length > 0 && `(${selectedRows.length})`}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handlePrint}>
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <FavoriteStarSwitch queryId={query.id} user={user} />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Chart and Table Content */}
      {query.chart ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between flex-wrap gap-2 no-print">
            <TabsList>
              <TabsTrigger value="both" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Both
              </TabsTrigger>
              <TabsTrigger value="chart" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="table" className="gap-2">
                <Table className="h-4 w-4" />
                Table
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              {/* Chart type switcher */}
              {(activeTab === "chart" || activeTab === "both") && (
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chartTypeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          <opt.icon className="h-4 w-4" />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Filter indicator */}
              {filteredData.length !== data.length && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  Filtered
                </div>
              )}
            </div>
          </div>

          <TabsContent value="both" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-4">{renderChart(350)}</CardContent>
            </Card>
            <Card className="print-break">
              <CardContent className="p-4">{renderGrid("500px")}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart" className="mt-4">
            <Card>
              <CardContent className="p-4">{renderChart(500)}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table" className="mt-4">
            <Card>
              <CardContent className="p-4">{renderGrid("650px")}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-4">{renderGrid("650px")}</CardContent>
        </Card>
      )}
    </div>
  );
}
