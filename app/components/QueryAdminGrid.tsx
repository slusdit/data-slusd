"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateQuery } from "@/lib/formActions";
import { deleteQuery } from "@/lib/deleteQuery";
import { useTheme } from "next-themes";
import { format } from "sql-formatter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Copy, Download, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";
import { CHARTTYPE } from "@prisma/client";
import AddQueryForm from "./forms/AddQueryForm";
import FormDialog from "./forms/FormDialog";

type QueryAdminGridProps = {
  dataIn: QueryWithCategory[];
  categories: any[];
  session: any;
};

const chartTypes = Object.values(CHARTTYPE).map((t) => t.toLowerCase());

export default function QueryAdminGrid({
  dataIn,
  categories,
  session,
}: QueryAdminGridProps) {
  const gridRef = useRef<AgGridReact>(null);
  const { resolvedTheme } = useTheme();
  const [queries, setQueries] = useState(dataIn);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<QueryWithCategory | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    query: "",
    categoryId: "",
    chart: false,
    chartTypeKey: "",
    chartXKey: "",
    chartYKey: "",
    chartStackKey: "",
    hiddenCols: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<QueryWithCategory[]>([]);

  const myTheme = themeQuartz.withParams({
    backgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#fff",
    foregroundColor: resolvedTheme === "dark" ? "#fff" : "#000",
    headerBackgroundColor: resolvedTheme === "dark" ? "#374151" : "#f3f4f6",
    oddRowBackgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#fff",
    headerTextColor: resolvedTheme === "dark" ? "#fff" : "#000",
  });

  const columnDefs = useMemo(
    () => [
      {
        headerName: "",
        field: "checkbox",
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        pinned: "left" as const,
      },
      {
        headerName: "Name",
        field: "name",
        flex: 1,
        minWidth: 180,
        filter: true,
        floatingFilter: true,
        sortable: true,
        cellRenderer: (params: any) => (
          <Link
            href={`/query/${params.data.category?.value?.toLowerCase() || "general"}/${params.data.id}`}
            target="_blank"
            className="text-blue-500 hover:underline flex items-center gap-1"
          >
            {params.value}
            <ExternalLink className="h-3 w-3" />
          </Link>
        ),
      },
      {
        headerName: "Description",
        field: "description",
        flex: 1,
        minWidth: 200,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "Category",
        field: "category.label",
        width: 140,
        filter: true,
        floatingFilter: true,
        sortable: true,
        valueGetter: (params: any) => params.data?.category?.label || "",
      },
      {
        headerName: "Chart",
        field: "chart",
        width: 80,
        cellRenderer: (params: any) => (
          <span className={params.value ? "text-green-600" : "text-muted-foreground"}>
            {params.value ? "Yes" : "No"}
          </span>
        ),
      },
      {
        headerName: "Chart Type",
        field: "chartTypeKey",
        width: 100,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "SQL Query",
        field: "query",
        width: 250,
        filter: true,
        floatingFilter: true,
        cellStyle: { fontFamily: "monospace", fontSize: "11px" },
        cellRenderer: (params: any) => (
          <div className="truncate" title={params.value}>
            {params.value?.slice(0, 80)}...
          </div>
        ),
      },
      {
        headerName: "Actions",
        width: 120,
        cellRenderer: (params: any) => (
          <div className="flex gap-1 items-center h-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(params.data)}
              className="h-7 w-7 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDuplicate(params.data)}
              className="h-7 w-7 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(params.data)}
              className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
    }),
    []
  );

  const handleEdit = (query: QueryWithCategory) => {
    setSelectedQuery(query);
    setFormData({
      name: query.name || "",
      description: query.description || "",
      query: query.query || "",
      categoryId: query.categoryId || "",
      chart: query.chart || false,
      chartTypeKey: query.chartTypeKey || "",
      chartXKey: query.chartXKey || "",
      chartYKey: query.chartYKey || "",
      chartStackKey: query.chartStackKey || "",
      hiddenCols: query.hiddenCols || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDuplicate = (query: QueryWithCategory) => {
    setSelectedQuery(null);
    setFormData({
      name: query.name + " (Copy)",
      description: query.description || "",
      query: query.query || "",
      categoryId: query.categoryId || "",
      chart: query.chart || false,
      chartTypeKey: query.chartTypeKey || "",
      chartXKey: query.chartXKey || "",
      chartYKey: query.chartYKey || "",
      chartStackKey: query.chartStackKey || "",
      hiddenCols: query.hiddenCols || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (query: QueryWithCategory) => {
    if (!confirm(`Are you sure you want to delete "${query.name}"?`)) {
      return;
    }

    try {
      await deleteQuery({ id: query.id });
      setQueries((prev) => prev.filter((q) => q.id !== query.id));
      toast.success("Query deleted successfully");
    } catch (error) {
      toast.error("Failed to delete query");
      console.error(error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Format SQL
      let formattedQuery = formData.query;
      try {
        formattedQuery = format(formData.query, {
          language: "tsql",
          keywordCase: "upper",
        });
      } catch (e) {
        // Keep original if formatting fails
      }

      const saveData = {
        ...formData,
        query: formattedQuery,
      };

      if (selectedQuery) {
        // Update existing
        await updateQuery({ id: selectedQuery.id, ...saveData }, "query");

        setQueries((prev) =>
          prev.map((q) => {
            if (q.id === selectedQuery.id) {
              const category = categories.find((c) => c.id === saveData.categoryId);
              return {
                ...q,
                ...saveData,
                category: category || q.category,
              };
            }
            return q;
          })
        );
        toast.success("Query updated successfully");
      } else {
        // Create new - use the form dialog instead
        toast.info("Use the Add Query button to create new queries");
      }

      setIsEditDialogOpen(false);
      setSelectedQuery(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to save query");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCsv = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: `queries_export_${new Date().toISOString().split("T")[0]}.csv`,
      });
    }
  }, []);

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current?.api) {
      const selected = gridRef.current.api.getSelectedRows();
      setSelectedRows(selected);
    }
  }, []);

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedRows.length} queries?`)) return;

    setIsLoading(true);
    let successCount = 0;
    try {
      for (const query of selectedRows) {
        try {
          await deleteQuery({ id: query.id });
          successCount++;
        } catch (e) {
          console.error(`Failed to delete query ${query.id}`, e);
        }
      }
      setQueries((prev) => prev.filter((q) => !selectedRows.find((s) => s.id === q.id)));
      toast.success(`Deleted ${successCount} queries`);
      gridRef.current?.api?.deselectAll();
    } catch (error) {
      toast.error("Failed to delete some queries");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormatSql = () => {
    try {
      const formatted = format(formData.query, {
        language: "tsql",
        keywordCase: "upper",
      });
      setFormData({ ...formData, query: formatted });
    } catch (e) {
      toast.error("Failed to format SQL - check for syntax errors");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Queries ({queries.length})</h2>
          {selectedRows.length > 0 && (
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              {selectedRows.length} selected
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
            </>
          )}
          <FormDialog triggerMessage="Add Query" icon={<Plus className="h-4 w-4" />}>
            <AddQueryForm session={session} categories={categories} />
          </FormDialog>
          <Button variant="outline" onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="h-[600px] w-full">
        <AgGridReact
          ref={gridRef}
          rowData={queries}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          theme={myTheme}
          animateRows={true}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          suppressRowClickSelection={true}
          getRowId={(params) => params.data.id}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[20, 50, 100]}
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedQuery ? "Edit Query" : "Duplicate Query"}</DialogTitle>
            <DialogDescription>
              {selectedQuery
                ? "Update query settings and SQL"
                : "Create a copy of this query"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="query">SQL Query</Label>
                <Button variant="outline" size="sm" onClick={handleFormatSql}>
                  Format SQL
                </Button>
              </div>
              <Textarea
                id="query"
                value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                className="font-mono text-sm min-h-[200px]"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">Chart Configuration</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="chart"
                    checked={formData.chart}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, chart: checked as boolean })
                    }
                  />
                  <Label htmlFor="chart">Enable Chart</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chartType">Chart Type</Label>
                  <Select
                    value={formData.chartTypeKey}
                    onValueChange={(value) => setFormData({ ...formData, chartTypeKey: value })}
                    disabled={!formData.chart}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chartStack">Stack Key</Label>
                  <Input
                    id="chartStack"
                    value={formData.chartStackKey}
                    onChange={(e) => setFormData({ ...formData, chartStackKey: e.target.value })}
                    disabled={!formData.chart}
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="space-y-2">
                  <Label htmlFor="chartX">X Axis Key</Label>
                  <Input
                    id="chartX"
                    value={formData.chartXKey}
                    onChange={(e) => setFormData({ ...formData, chartXKey: e.target.value })}
                    disabled={!formData.chart}
                    placeholder="Column name for X axis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chartY">Y Axis Key</Label>
                  <Input
                    id="chartY"
                    value={formData.chartYKey}
                    onChange={(e) => setFormData({ ...formData, chartYKey: e.target.value })}
                    disabled={!formData.chart}
                    placeholder="Column name for Y axis"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hiddenCols">Hidden Columns (comma separated)</Label>
              <Input
                id="hiddenCols"
                value={formData.hiddenCols}
                onChange={(e) => setFormData({ ...formData, hiddenCols: e.target.value })}
                placeholder="e.g., id, internal_code"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {selectedQuery ? "Save Changes" : "Create Copy"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
