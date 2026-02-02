"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Copy, Download, Upload, Loader2 } from "lucide-react";

type FragmentCategory = {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
};

type Fragment = {
  id: string;
  fragmentId: string;
  name: string;
  description: string;
  snippet: string;
  type: string;
  categoryId: string;
  subcategory: string;
  tables: string;
  dependencies: string;
  conflicts: string;
  parameters: string;
  outputColumns: string;
  tags: string;
  isActive: boolean;
  sortOrder: number;
  category: FragmentCategory;
};

type FragmentAdminGridProps = {
  fragments: Fragment[];
  categories: FragmentCategory[];
};

const fragmentTypes = [
  { value: "base", label: "Base Query" },
  { value: "filter", label: "Filter" },
  { value: "join", label: "Join" },
  { value: "aggregation", label: "Aggregation" },
  { value: "order", label: "Order By" },
  { value: "column", label: "Column Addition" },
];

export default function FragmentAdminGrid({
  fragments: initialFragments,
  categories,
}: FragmentAdminGridProps) {
  const gridRef = useRef<AgGridReact>(null);
  const { resolvedTheme } = useTheme();
  const [fragments, setFragments] = useState(initialFragments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);
  const [formData, setFormData] = useState({
    fragmentId: "",
    name: "",
    description: "",
    snippet: "",
    type: "filter",
    categoryId: "",
    subcategory: "",
    tags: "",
    tables: "",
    dependencies: "",
    conflicts: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Fragment[]>([]);
  const [fragmentToDelete, setFragmentToDelete] = useState<Fragment | null>(null);

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
        headerName: "ID",
        field: "fragmentId",
        width: 180,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "Name",
        field: "name",
        width: 200,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "Type",
        field: "type",
        width: 100,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "Category",
        field: "category.displayName",
        width: 150,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "Subcategory",
        field: "subcategory",
        width: 120,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "SQL Snippet",
        field: "snippet",
        flex: 1,
        minWidth: 300,
        filter: true,
        tooltipField: "snippet",
        cellStyle: { fontFamily: "monospace", fontSize: "12px" },
      },
      {
        headerName: "Active",
        field: "isActive",
        width: 80,
        cellRenderer: (params: any) => (params.value ? "Yes" : "No"),
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

  const resetForm = () => {
    setFormData({
      fragmentId: "",
      name: "",
      description: "",
      snippet: "",
      type: "filter",
      categoryId: categories[0]?.id || "",
      subcategory: "",
      tags: "",
      tables: "",
      dependencies: "",
      conflicts: "",
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleEdit = (fragment: Fragment) => {
    setSelectedFragment(fragment);
    setFormData({
      fragmentId: fragment.fragmentId,
      name: fragment.name,
      description: fragment.description,
      snippet: fragment.snippet,
      type: fragment.type,
      categoryId: fragment.categoryId,
      subcategory: fragment.subcategory,
      tags: JSON.parse(fragment.tags).join(", "),
      tables: JSON.parse(fragment.tables).join(", "),
      dependencies: JSON.parse(fragment.dependencies).join(", "),
      conflicts: JSON.parse(fragment.conflicts).join(", "),
    });
    setIsEditDialogOpen(true);
  };

  const handleDuplicate = (fragment: Fragment) => {
    setFormData({
      fragmentId: fragment.fragmentId + "_copy",
      name: fragment.name + " (Copy)",
      description: fragment.description,
      snippet: fragment.snippet,
      type: fragment.type,
      categoryId: fragment.categoryId,
      subcategory: fragment.subcategory,
      tags: JSON.parse(fragment.tags).join(", "),
      tables: JSON.parse(fragment.tables).join(", "),
      dependencies: JSON.parse(fragment.dependencies).join(", "),
      conflicts: JSON.parse(fragment.conflicts).join(", "),
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (fragment: Fragment) => {
    setFragmentToDelete(fragment);
  };

  const confirmDelete = async () => {
    if (!fragmentToDelete) return;

    try {
      const response = await fetch(`/api/admin/fragments/${fragmentToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Unable to delete fragment");
      }

      setFragments((prev) => prev.filter((f) => f.id !== fragmentToDelete.id));
      toast.success("Fragment deleted successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to delete fragment: ${errorMessage}. The fragment may be in use by queries.`);
      console.error(error);
    } finally {
      setFragmentToDelete(null);
    }
  };

  const handleSaveNew = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/fragments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
          tables: formData.tables.split(",").map((t) => t.trim()).filter(Boolean),
          dependencies: formData.dependencies.split(",").map((t) => t.trim()).filter(Boolean),
          conflicts: formData.conflicts.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const details = error.error || error.details || error.message || "Unknown error";
        throw new Error(`${details}`);
      }

      const newFragment = await response.json();
      setFragments((prev) => [...prev, newFragment]);
      setIsAddDialogOpen(false);
      resetForm();
      toast.success("Fragment created successfully");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create fragment";
      toast.error(`Failed to create fragment: ${errorMessage}. Please check your SQL syntax and fragment ID.`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedFragment) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/fragments/${selectedFragment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
          tables: formData.tables.split(",").map((t) => t.trim()).filter(Boolean),
          dependencies: formData.dependencies.split(",").map((t) => t.trim()).filter(Boolean),
          conflicts: formData.conflicts.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const details = error.error || error.details || error.message || "Unknown error";
        throw new Error(`${details}`);
      }

      const updatedFragment = await response.json();
      setFragments((prev) =>
        prev.map((f) => (f.id === selectedFragment.id ? updatedFragment : f))
      );
      setIsEditDialogOpen(false);
      setSelectedFragment(null);
      toast.success("Fragment updated successfully");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update fragment";
      toast.error(`Failed to update fragment: ${errorMessage}. Please check your SQL syntax.`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current?.api) {
      const selected = gridRef.current.api.getSelectedRows();
      setSelectedRows(selected);
    }
  }, []);

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedRows.length} fragments?`)) return;

    setIsLoading(true);
    let successCount = 0;
    try {
      for (const fragment of selectedRows) {
        try {
          const response = await fetch(`/api/admin/fragments/${fragment.id}`, {
            method: "DELETE",
          });
          if (response.ok) successCount++;
        } catch (e) {
          console.error(`Failed to delete fragment ${fragment.id}`, e);
        }
      }
      setFragments((prev) => prev.filter((f) => !selectedRows.find((s) => s.id === f.id)));
      toast.success(`Deleted ${successCount} fragments`);
      gridRef.current?.api?.deselectAll();
    } catch (error) {
      toast.error("Failed to delete some fragments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportJson = useCallback(() => {
    // Export fragments as JSON
    const exportData = fragments.map(f => ({
      id: f.fragmentId,
      name: f.name,
      description: f.description,
      snippet: f.snippet,
      type: f.type,
      category: f.category?.name || "",
      subcategory: f.subcategory,
      tags: JSON.parse(f.tags || "[]"),
      tables: JSON.parse(f.tables || "[]"),
      dependencies: JSON.parse(f.dependencies || "[]"),
      conflicts: JSON.parse(f.conflicts || "[]"),
      parameters: JSON.parse(f.parameters || "[]"),
      outputColumns: JSON.parse(f.outputColumns || "[]"),
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai_fragments_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${exportData.length} fragments`);
  }, [fragments]);

  const handleExportCsv = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: `ai_fragments_${new Date().toISOString().split("T")[0]}.csv`,
      });
      toast.success("Exported fragments to CSV");
    }
  }, []);

  const handleImportJson = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedFragments = JSON.parse(text);

      if (!Array.isArray(importedFragments)) {
        throw new Error("Invalid format: expected an array of fragments");
      }

      let successCount = 0;
      let errorCount = 0;

      for (const fragment of importedFragments) {
        try {
          // Find category by name
          const category = categories.find(c => c.name === fragment.category);
          if (!category) {
            console.warn(`Category not found for fragment ${fragment.id}: ${fragment.category}`);
            errorCount++;
            continue;
          }

          const response = await fetch("/api/admin/fragments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fragmentId: fragment.id,
              name: fragment.name,
              description: fragment.description,
              snippet: fragment.snippet,
              type: fragment.type,
              categoryId: category.id,
              subcategory: fragment.subcategory,
              tags: fragment.tags || [],
              tables: fragment.tables || [],
              dependencies: fragment.dependencies || [],
              conflicts: fragment.conflicts || [],
            }),
          });

          if (response.ok) {
            const newFragment = await response.json();
            setFragments(prev => [...prev, newFragment]);
            successCount++;
          } else {
            errorCount++;
          }
        } catch (e) {
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Imported ${successCount} fragments`);
      }
      if (errorCount > 0) {
        toast.error(`Failed to import ${errorCount} fragments`);
      }
    } catch (error: any) {
      toast.error("Failed to parse JSON file: " + error.message);
    }

    // Reset the input
    event.target.value = "";
  }, [categories]);

  const FragmentForm = ({ onSave, isEdit = false }: { onSave: () => void; isEdit?: boolean }) => (
    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fragmentId">Fragment ID</Label>
          <Input
            id="fragmentId"
            value={formData.fragmentId}
            onChange={(e) => setFormData({ ...formData, fragmentId: e.target.value })}
            placeholder="e.g., school_jefferson"
            disabled={isEdit}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Jefferson Elementary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Filter to Jefferson Elementary School"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="snippet">SQL Snippet</Label>
        <Textarea
          id="snippet"
          value={formData.snippet}
          onChange={(e) => setFormData({ ...formData, snippet: e.target.value })}
          placeholder="s.SC = 3"
          className="font-mono text-sm min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fragmentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Input
            id="subcategory"
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            placeholder="e.g., elementary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="jefferson, elementary, school"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tables">Tables Used (comma separated)</Label>
          <Input
            id="tables"
            value={formData.tables}
            onChange={(e) => setFormData({ ...formData, tables: e.target.value })}
            placeholder="STU, PGM"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dependencies">Dependencies (comma separated)</Label>
          <Input
            id="dependencies"
            value={formData.dependencies}
            onChange={(e) => setFormData({ ...formData, dependencies: e.target.value })}
            placeholder="students_base"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="conflicts">Conflicts With (comma separated)</Label>
        <Input
          id="conflicts"
          value={formData.conflicts}
          onChange={(e) => setFormData({ ...formData, conflicts: e.target.value })}
          placeholder="school_muir, school_bancroft"
        />
      </div>

      <DialogFooter>
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isEdit ? "Save Changes" : "Create Fragment"}
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">AI Query Fragments ({fragments.length})</h2>
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
          <Button variant="outline" onClick={handleExportJson}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          <Button variant="outline" onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <label>
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Import JSON
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Fragment
          </Button>
        </div>
      </div>

      <div className="h-[600px] w-full">
        <AgGridReact
          ref={gridRef}
          rowData={fragments}
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

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Fragment</DialogTitle>
            <DialogDescription>
              Create a new SQL fragment for the AI Query Builder
            </DialogDescription>
          </DialogHeader>
          <FragmentForm onSave={handleSaveNew} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Fragment</DialogTitle>
            <DialogDescription>
              Modify the SQL fragment settings
            </DialogDescription>
          </DialogHeader>
          <FragmentForm onSave={handleSaveEdit} isEdit />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!fragmentToDelete} onOpenChange={(open) => !open && setFragmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Fragment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>&quot;{fragmentToDelete?.name}&quot;</strong>?
              <br />
              <br />
              This action cannot be undone and will permanently delete this SQL fragment from the system.
              Any queries using this fragment may stop working.
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
    </div>
  );
}
