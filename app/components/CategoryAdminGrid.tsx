"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  addQueryCategory,
  updateQueryCategory,
  deleteQueryCategory,
} from "@/lib/formActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import MultiDropdownSelector from "./MultiDropdownSelector";
import { ROLE } from "@prisma/client";

type CategoryRole = {
  id: string;
  role: ROLE;
};

type Category = {
  id: string;
  label: string;
  value: string;
  sort: number;
  roles: CategoryRole[];
};

type CategoryAdminGridProps = {
  categories: Category[];
  roles: CategoryRole[];
};

type FormData = {
  id: string;
  label: string;
  value: string;
  sort: number;
  roleIds: string[];
};

const emptyForm: FormData = {
  id: "",
  label: "",
  value: "",
  sort: 0,
  roleIds: [],
};

export default function CategoryAdminGrid({
  categories: initialCategories,
  roles,
}: CategoryAdminGridProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);

  const roleItems = useMemo(() => {
    const uniqueRoles = new Map<string, { id: string; label: string }>();
    roles.forEach((r) => {
      if (!uniqueRoles.has(r.role)) {
        uniqueRoles.set(r.role, { id: r.id, label: r.role });
      }
    });
    return Array.from(uniqueRoles.values()).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [roles]);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      id: category.id,
      label: category.label,
      value: category.value,
      sort: category.sort,
      roleIds: category.roles.map((r) => r.id),
    });
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    setFormData(emptyForm);
    setAddDialogOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      const result = await updateQueryCategory({
        id: formData.id,
        label: formData.label,
        value: formData.value,
        sort: formData.sort,
        roleIds: formData.roleIds,
      });
      setCategories((prev) =>
        prev.map((c) => (c.id === result.id ? result : c))
      );
      toast.success("Category updated successfully");
      setEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAdd = async () => {
    if (!formData.label || !formData.value) {
      toast.error("Label and value are required");
      return;
    }
    setIsLoading(true);
    try {
      const result = await addQueryCategory({
        label: formData.label,
        value: formData.value,
        sort: formData.sort,
        roleIds: formData.roleIds,
      });
      setCategories((prev) => [...prev, result].sort((a, b) => a.sort - b.sort));
      toast.success("Category created successfully");
      setAddDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    setIsLoading(true);
    try {
      await deleteQueryCategory(selectedCategory.id);
      setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
      toast.success("Category deleted successfully");
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete category. It may still have queries assigned.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return role?.role || roleId;
  };

  const categoryFormFields = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          placeholder="e.g. Attendance Reports"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          placeholder="e.g. attendance-reports"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sort">Sort Order</Label>
        <Input
          id="sort"
          type="number"
          value={formData.sort}
          onChange={(e) =>
            setFormData({ ...formData, sort: parseInt(e.target.value) || 0 })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Roles (users with any of these roles can access this category)</Label>
        <MultiDropdownSelector
          items={roleItems}
          values={formData.roleIds}
          onChange={(values) => setFormData({ ...formData, roleIds: values })}
          placeholder="Select roles..."
          width="w-full"
          maxDisplayItems={5}
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to make the category visible to all users.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Query Categories</h2>
        <Button onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Label</th>
              <th className="text-left p-3 font-medium">Value</th>
              <th className="text-left p-3 font-medium w-16">Sort</th>
              <th className="text-left p-3 font-medium">Roles</th>
              <th className="text-right p-3 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium">{category.label}</td>
                <td className="p-3 text-muted-foreground">{category.value}</td>
                <td className="p-3">{category.sort}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {category.roles.length > 0 ? (
                      category.roles.map((role) => (
                        <Badge key={role.id} variant="secondary" className="text-xs">
                          {role.role}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">All users</span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  No categories yet. Click &quot;Add Category&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update category details and role assignments.
            </DialogDescription>
          </DialogHeader>
          {categoryFormFields}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Create a new query category with role assignments.
            </DialogDescription>
          </DialogHeader>
          {categoryFormFields}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAdd} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{selectedCategory?.label}&quot;? This
              action cannot be undone. Queries in this category will become
              uncategorized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
