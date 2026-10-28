"use client";

/**
 * Admin Roles tab: the role catalogue. Super admins create data roles here
 * (board members, outside partners and other people with no Aeries account),
 * edit labels, and delete roles that nothing references. System roles are
 * read-only apart from their label and description.
 */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Lock } from "lucide-react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { createRole, updateRole, deleteRole } from "@/lib/actions/roles";
import { isValidRoleName, normalizeRoleName, type RoleRow } from "@/lib/roles";

type RoleAdminGridProps = {
  roles: RoleRow[];
};

type FormData = {
  role: string;
  label: string;
  description: string;
};

const emptyForm: FormData = { role: "", label: "", description: "" };

function usageSummary(role: RoleRow): string {
  const parts: string[] = [];
  const users = role.userCount + role.primaryUserCount;
  if (users > 0) parts.push(`${users} user${users === 1 ? "" : "s"}`);
  if (role.categoryCount > 0) parts.push(`${role.categoryCount} categor${role.categoryCount === 1 ? "y" : "ies"}`);
  if (role.queryCount > 0) parts.push(`${role.queryCount} report${role.queryCount === 1 ? "" : "s"}`);
  return parts.join(", ");
}

export default function RoleAdminGrid({ roles: initialRoles }: RoleAdminGridProps) {
  const router = useRouter();
  const [roles, setRoles] = useState<RoleRow[]>(initialRoles);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<RoleRow | null>(null);
  const [deleting, setDeleting] = useState<RoleRow | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [pending, setPending] = useState(false);

  // The page re-fetches after each change (router.refresh) so the Users and
  // Categories tabs see new roles; adopt the fresh list when it arrives.
  const [seenRoles, setSeenRoles] = useState(initialRoles);
  if (seenRoles !== initialRoles) {
    setSeenRoles(initialRoles);
    setRoles(initialRoles);
  }

  const normalizedName = useMemo(() => normalizeRoleName(form.role), [form.role]);
  const nameValid = isValidRoleName(normalizedName);
  const nameTaken = roles.some((r) => r.role === normalizedName);

  const openAdd = () => {
    setForm(emptyForm);
    setAddOpen(true);
  };

  const openEdit = (role: RoleRow) => {
    setForm({ role: role.role, label: role.label, description: role.description ?? "" });
    setEditing(role);
  };

  const handleCreate = async () => {
    if (!nameValid || nameTaken) return;
    setPending(true);
    try {
      const result = await createRole({ role: normalizedName, label: form.label, description: form.description });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setRoles((prev) => [...prev, result.role].sort((a, b) => a.role.localeCompare(b.role)));
      toast.success(`Role ${result.role.role} created. It can now be assigned on the Users tab.`);
      setAddOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create role");
    } finally {
      setPending(false);
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    setPending(true);
    try {
      const result = await updateRole({ id: editing.id, label: form.label, description: form.description });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setRoles((prev) => prev.map((r) => (r.id === result.role.id ? result.role : r)));
      toast.success("Role updated");
      setEditing(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setPending(true);
    try {
      const result = await deleteRole(deleting.id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setRoles((prev) => prev.filter((r) => r.id !== deleting.id));
      toast.success(`Role ${deleting.role} deleted`);
      setDeleting(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete role");
    } finally {
      setPending(false);
    }
  };

  const labelAndDescriptionFields = (
    <>
      <div className="space-y-2">
        <Label htmlFor="role-label">Label</Label>
        <Input
          id="role-label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          placeholder="e.g. Board Member"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role-description">Description</Label>
        <Textarea
          id="role-description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Who holds this role and what it unlocks"
          rows={3}
        />
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Roles ({roles.length})</h2>
          <p className="text-sm text-muted-foreground">
            Roles gate report categories and are assigned to people on the Users tab. Create a role here for
            anyone who has no Aeries account, such as board members.
          </p>
        </div>
        <Button onClick={openAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Role</th>
              <th className="text-left p-3 font-medium">Label</th>
              <th className="text-left p-3 font-medium">Description</th>
              <th className="text-left p-3 font-medium">In use by</th>
              <th className="text-right p-3 font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => {
              const usage = usageSummary(role);
              const deletable = !role.isSystem && usage === "";
              const deleteReason = role.isSystem
                ? "System roles are used by the application and cannot be deleted"
                : usage
                  ? `Still assigned to ${usage}`
                  : `Delete ${role.role}`;
              return (
                <tr key={role.id} className="border-b hover:bg-muted/30 align-top">
                  <td className="p-3 font-mono text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {role.role}
                      {role.isSystem && (
                        <Badge variant="outline" className="text-xs font-sans gap-1">
                          <Lock className="h-3 w-3" />
                          System
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{role.label || <span className="text-muted-foreground">None</span>}</td>
                  <td className="p-3 text-sm text-muted-foreground max-w-md">{role.description}</td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    {usage || <span className="text-muted-foreground">Nobody yet</span>}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(role)} aria-label={`Edit ${role.role}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(role)}
                        disabled={!deletable}
                        title={deleteReason}
                        aria-label={deleteReason}
                      >
                        <Trash2 className={`h-4 w-4 ${deletable ? "text-destructive" : ""}`} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {roles.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  No roles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Role</DialogTitle>
            <DialogDescription>
              The role name is the identifier stored on users and categories. It cannot be changed later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role name</Label>
              <Input
                id="role-name"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. BOARDMEMBER"
                autoCapitalize="characters"
                className="font-mono"
              />
              {form.role && normalizedName !== form.role && (
                <p className="text-xs text-muted-foreground">
                  Will be saved as <span className="font-mono">{normalizedName}</span>
                </p>
              )}
              {form.role && !nameValid && (
                <p className="text-xs text-destructive">
                  Use 2 to 40 upper-case letters, digits or underscores, starting with a letter.
                </p>
              )}
              {nameValid && nameTaken && (
                <p className="text-xs text-destructive">A role named {normalizedName} already exists.</p>
              )}
            </div>
            {labelAndDescriptionFields}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={pending || !nameValid || nameTaken}>
              {pending ? "Creating..." : "Create Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              <span className="font-mono">{editing?.role}</span>
              {editing?.isSystem && " is a system role: only its label and description can change."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">{labelAndDescriptionFields}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={pending}>
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete role"
        description={
          <>
            This removes the role <strong>{deleting?.role}</strong>
            {deleting?.label && deleting.label !== deleting.role ? ` (${deleting.label})` : ""} from the catalogue.
            Nothing is assigned to it, so no one loses access.
          </>
        }
        pending={pending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
