"use client";
// Registers AG Grid Enterprise modules + licence for this grid (finding P1)
import "@/app/components/providers/AGGridProvider";

import { useRef, useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { multiRowSelection, selectionColumnDef } from "@/lib/agGridSelection";
import { themeQuartz } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteQuery } from "@/lib/deleteQuery";
import { deleteQueries } from "@/lib/actions/adminBulk";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Copy, Download, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";
import AddQueryForm from "./forms/AddQueryForm";
import FormDialog from "./forms/FormDialog";
import EditQueryDialog from "./forms/EditQueryDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import type { EditQueryFormValues } from "@/lib/querySchemas";

type QueryAdminGridProps = {
  dataIn: QueryWithCategory[];
  categories: any[];
  session: any;
};

export default function QueryAdminGrid({
  dataIn,
  categories,
  session,
}: QueryAdminGridProps) {
  const gridRef = useRef<AgGridReact>(null);
  const { resolvedTheme } = useTheme();
  const [queries, setQueries] = useState(dataIn);
  const [dialog, setDialog] = useState<{ mode: "edit" | "duplicate"; query: QueryWithCategory } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<QueryWithCategory[]>([]);
  const [queryToDelete, setQueryToDelete] = useState<QueryWithCategory | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

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
              onClick={() => setDialog({ mode: "edit", query: params.data })}
              className="h-7 w-7 p-0"
              aria-label={`Edit ${params.data.name}`}
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDialog({ mode: "duplicate", query: params.data })}
              className="h-7 w-7 p-0"
              aria-label={`Duplicate ${params.data.name}`}
              title="Duplicate"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQueryToDelete(params.data)}
              className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
              aria-label={`Delete ${params.data.name}`}
              title="Delete"
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

  // Apply a saved edit to the local grid state (no refetch needed)
  const handleSaved = (id: string, values: EditQueryFormValues) => {
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const category = categories.find((c) => c.id === values.categoryId);
        return {
          ...q,
          ...values,
          categoryId: values.categoryId || null,
          category: category || q.category,
        };
      })
    );
  };

  const confirmDelete = async () => {
    if (!queryToDelete) return;

    try {
      const ok = await deleteQuery(queryToDelete.id);
      if (!ok) throw new Error("The server refused to delete this query");
      setQueries((prev) => prev.filter((q) => q.id !== queryToDelete.id));
      toast.success("Query deleted successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to delete query: ${errorMessage}`);
      console.error(error);
    } finally {
      setQueryToDelete(null);
    }
  };

  const handleExportCsv = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: `queries_export_${new Date().toISOString().split("T")[0]}.csv`,
      });
      toast.success("Exported CSV");
    }
  }, []);

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current?.api) {
      const selected = gridRef.current.api.getSelectedRows();
      setSelectedRows(selected);
    }
  }, []);

  // Bulk delete: one server action for all selected ids (finding U8)
  const confirmBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    setIsLoading(true);
    try {
      const ids = selectedRows.map((q) => q.id);
      const { deleted } = await deleteQueries(ids);
      setQueries((prev) => prev.filter((q) => !ids.includes(q.id)));
      toast.success(`Deleted ${deleted} ${deleted === 1 ? "query" : "queries"}`);
      gridRef.current?.api?.deselectAll();
      setBulkDeleteOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete queries");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Queries ({queries.length})</h2>
          {selectedRows.length > 0 && (
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-sm">
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
                onClick={() => setBulkDeleteOpen(true)}
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
          rowSelection={multiRowSelection("filtered")}

          selectionColumnDef={selectionColumnDef}
          onSelectionChanged={onSelectionChanged}
          getRowId={(params) => params.data.id}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[20, 50, 100]}
        />
      </div>

      {/* Edit / Duplicate (react-hook-form + zod, finding U12) */}
      <EditQueryDialog
        open={!!dialog}
        onOpenChange={(open) => !open && setDialog(null)}
        mode={dialog?.mode ?? "edit"}
        query={dialog?.query ?? null}
        categories={categories}
        createdBy={session?.user?.email ?? ""}
        onSaved={handleSaved}
      />

      {/* Single delete */}
      <AlertDialog open={!!queryToDelete} onOpenChange={(open) => !open && setQueryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Query</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>&quot;{queryToDelete?.name}&quot;</strong>?
              <br />
              This action cannot be undone and will permanently delete this query from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete with typed confirmation (finding U8) */}
      <ConfirmDeleteDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title={`Delete ${selectedRows.length} ${selectedRows.length === 1 ? "query" : "queries"}`}
        description="This permanently deletes the selected reports. Users who favourited them will lose those favourites."
        confirmText={String(selectedRows.length)}
        actionLabel="Delete Selected"
        pending={isLoading}
        onConfirm={confirmBulkDelete}
      />
    </div>
  );
}
