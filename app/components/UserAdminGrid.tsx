"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUser } from "@/lib/formActions";
import { useTheme } from "next-themes";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Download, UserPlus, Loader2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import MultiDropdownSelector from "./MultiDropdownSelector";

type UserRole = {
  id: string;
  role: string;
};

type UserSchool = {
  school: {
    id: number;
    name: string;
  };
};

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  admin: boolean;
  queryEdit: boolean;
  activeSchool: number;
  primaryRole?: string;
  userRole: UserRole[];
  UserSchool: UserSchool[];
  favorites?: any[];
  // Manual overrides
  blockedSchools?: string | null;
  addedSchools?: string | null;
  blockedRoles?: string | null;
  addedRoles?: string | null;
};

type UserAdminGridProps = {
  dataIn: User[];
  availableRoles?: UserRole[];
  availableSchools?: Array<{ id: string; name: string; sc: string }>;
  availableQueries?: Array<{ id: string; name: string }>;
  isSiteAdmin?: boolean; // If true, restricts certain admin-only actions
};

const primaryRoleOptions = [
  "USER", "ADMIN", "SUPERADMIN", "HR", "TEACHER", "SITEADMIN", "STAFF",
  "BUSINESS", "IT", "DISCIPLINE", "SECONDARYTEACHER", "ELEMENTARYTEACHER",
  "ASSESSMENT", "GRADEDISTRIBUTION", "DIRECTOR", "PRINCIPAL", "COUNSELOR",
  "NURSE", "LIBRARIAN", "INTERVENTIONS", "SPED", "AIQUERY", "QUERYEDITOR"
];

// Roles that Site Admins can assign (not superadmin-level roles)
const siteAdminAllowedRoles = [
  "USER", "TEACHER", "STAFF", "COUNSELOR", "NURSE", "LIBRARIAN",
  "GRADEDISTRIBUTION", "INTERVENTIONS", "AIQUERY"
];

export default function UserAdminGrid({
  dataIn,
  availableRoles = [],
  availableSchools = [],
  availableQueries = [],
  isSiteAdmin = false,
}: UserAdminGridProps) {
  const gridRef = useRef<AgGridReact>(null);
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [users, setUsers] = useState(dataIn);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    admin: false,
    queryEdit: false,
    primaryRole: "USER",
    roles: [] as string[],
    schools: [] as string[],
    // Manual overrides
    blockedSchools: "",
    addedSchools: "",
    blockedRoles: "",
    addedRoles: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [emulatingUserId, setEmulatingUserId] = useState<string | null>(null);

  const myTheme = themeQuartz.withParams({
    backgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#fff",
    foregroundColor: resolvedTheme === "dark" ? "#fff" : "#000",
    headerBackgroundColor: resolvedTheme === "dark" ? "#374151" : "#f3f4f6",
    oddRowBackgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#fff",
    headerTextColor: resolvedTheme === "dark" ? "#fff" : "#000",
  });

  // Get roles list
  const rolesList = useMemo(() => {
    if (availableRoles.length > 0) return availableRoles;
    const uniqueRoles = new Set<string>();
    dataIn.forEach(user => {
      user.userRole?.forEach(role => uniqueRoles.add(role.role));
    });
    primaryRoleOptions.forEach(role => uniqueRoles.add(role));
    return Array.from(uniqueRoles).map(role => ({ id: role, role }));
  }, [availableRoles, dataIn]);

  // Get schools list
  const schoolsList = useMemo(() => {
    if (availableSchools.length > 0) return availableSchools;
    const uniqueSchools = new Map<string, { id: string; name: string; sc: string }>();
    dataIn.forEach(user => {
      user.UserSchool?.forEach(us => {
        if (us.school) {
          uniqueSchools.set(String(us.school.id), {
            id: String(us.school.id),
            name: us.school.name,
            sc: String(us.school.id),
          });
        }
      });
    });
    return Array.from(uniqueSchools.values());
  }, [availableSchools, dataIn]);

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
        minWidth: 150,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "Email",
        field: "email",
        flex: 1,
        minWidth: 200,
        filter: true,
        floatingFilter: true,
        sortable: true,
        cellRenderer: (params: any) => (
          <a
            href={`mailto:${params.value}`}
            className="text-blue-500 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {params.value}
          </a>
        ),
      },
      {
        headerName: "Primary Role",
        field: "primaryRole",
        width: 140,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        headerName: "Roles",
        field: "userRole",
        width: 200,
        filter: true,
        floatingFilter: true,
        valueGetter: (params: any) => {
          if (!params.data?.userRole) return "";
          return params.data.userRole.map((r: UserRole) => r.role).join(", ");
        },
        cellRenderer: (params: any) => {
          const roles = params.data?.userRole || [];
          if (roles.length === 0) return <span className="text-muted-foreground">None</span>;
          if (roles.length <= 2) return roles.map((r: UserRole) => r.role).join(", ");
          return (
            <div className="flex items-center gap-1">
              <span>{roles.slice(0, 2).map((r: UserRole) => r.role).join(", ")}</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full">
                +{roles.length - 2}
              </span>
            </div>
          );
        },
      },
      {
        headerName: "Schools",
        field: "UserSchool",
        width: 180,
        filter: true,
        floatingFilter: true,
        valueGetter: (params: any) => {
          if (!params.data?.UserSchool) return "";
          return params.data.UserSchool.map((us: UserSchool) => us.school?.name).join(", ");
        },
        cellRenderer: (params: any) => {
          const schools = params.data?.UserSchool || [];
          if (schools.length === 0) return <span className="text-muted-foreground">None</span>;
          if (schools.length === 1) return schools[0].school?.name;
          return (
            <div className="flex items-center gap-1">
              <span className="truncate">{schools[0].school?.name}</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded-full">
                +{schools.length - 1}
              </span>
            </div>
          );
        },
      },
      {
        headerName: "Admin",
        field: "admin",
        width: 80,
        cellRenderer: (params: any) => (
          <span className={params.value ? "text-green-600" : "text-muted-foreground"}>
            {params.value ? "Yes" : "No"}
          </span>
        ),
      },
      {
        headerName: "Query Edit",
        field: "queryEdit",
        width: 100,
        cellRenderer: (params: any) => (
          <span className={params.value ? "text-green-600" : "text-muted-foreground"}>
            {params.value ? "Yes" : "No"}
          </span>
        ),
      },
      {
        headerName: "Actions",
        width: 130,
        cellRenderer: (params: any) => (
          <div className="flex gap-1 items-center h-full">
            {!isSiteAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEmulate(params.data)}
                className="h-7 w-7 p-0 text-blue-500 hover:text-blue-700"
                title={`View as ${params.data.name}`}
                disabled={emulatingUserId === params.data.id}
              >
                {emulatingUserId === params.data.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(params.data)}
              className="h-7 w-7 p-0"
              title="Edit user"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(params.data)}
              className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
              title="Delete user"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [isSiteAdmin, emulatingUserId]
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
    }),
    []
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      admin: user.admin || false,
      queryEdit: user.queryEdit || false,
      primaryRole: user.primaryRole || "USER",
      roles: user.userRole?.map(r => r.role) || [],
      schools: user.UserSchool?.map(us => us.school?.name).filter(Boolean) || [],
      // Manual overrides
      blockedSchools: user.blockedSchools || "",
      addedSchools: user.addedSchools || "",
      blockedRoles: user.blockedRoles || "",
      addedRoles: user.addedRoles || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Are you sure you want to delete "${user.name}"?`)) {
      return;
    }
    // Note: Implement delete API if needed
    toast.error("User deletion not implemented yet");
  };

  const handleEmulate = async (user: User) => {
    if (isSiteAdmin) {
      toast.error("Site admins cannot emulate users");
      return;
    }

    setEmulatingUserId(user.id);
    try {
      const response = await fetch("/api/admin/emulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to emulate user");
      }

      toast.success(`Now viewing as ${user.name}`);
      // Redirect to home page to see the emulated view
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to emulate user");
    } finally {
      setEmulatingUserId(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      // Find role IDs from role names
      const roleIds = formData.roles.map(roleName => {
        const role = rolesList.find(r => r.role === roleName);
        return role?.id;
      }).filter(Boolean);

      // Find school IDs from school names
      const schoolIds = formData.schools.map(schoolName => {
        const school = schoolsList.find(s => s.name === schoolName);
        return school?.id;
      }).filter(Boolean);

      // Update user with all fields
      await updateUser({
        id: selectedUser.id,
        name: formData.name,
        admin: formData.admin,
        queryEdit: formData.queryEdit,
        primaryRole: formData.primaryRole,
        userRoleIds: roleIds,
        schoolIds: schoolIds,
        // Manual overrides
        blockedSchools: formData.blockedSchools || null,
        addedSchools: formData.addedSchools || null,
        blockedRoles: formData.blockedRoles || null,
        addedRoles: formData.addedRoles || null,
      }, "User");

      // Update local state
      setUsers(prev =>
        prev.map(u => {
          if (u.id === selectedUser.id) {
            return {
              ...u,
              name: formData.name,
              admin: formData.admin,
              queryEdit: formData.queryEdit,
              primaryRole: formData.primaryRole,
              userRole: formData.roles.map(role => {
                const r = rolesList.find(rl => rl.role === role);
                return { id: r?.id || role, role };
              }),
              UserSchool: formData.schools.map(schoolName => {
                const school = schoolsList.find(s => s.name === schoolName);
                return {
                  school: {
                    id: parseInt(school?.id || "0"),
                    name: schoolName,
                  },
                };
              }),
              // Manual overrides
              blockedSchools: formData.blockedSchools || null,
              addedSchools: formData.addedSchools || null,
              blockedRoles: formData.blockedRoles || null,
              addedRoles: formData.addedRoles || null,
            };
          }
          return u;
        })
      );

      setIsEditDialogOpen(false);
      setSelectedUser(null);
      toast.success("User updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
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

  const handleBulkSetAdmin = async (value: boolean) => {
    if (selectedRows.length === 0) return;

    setIsLoading(true);
    try {
      for (const user of selectedRows) {
        await updateUser({ id: user.id, admin: value }, "admin");
      }
      setUsers(prev =>
        prev.map(u => {
          if (selectedRows.find(s => s.id === u.id)) {
            return { ...u, admin: value };
          }
          return u;
        })
      );
      toast.success(`Updated ${selectedRows.length} users`);
      gridRef.current?.api?.deselectAll();
    } catch (error) {
      toast.error("Failed to update some users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkSetQueryEdit = async (value: boolean) => {
    if (selectedRows.length === 0) return;

    setIsLoading(true);
    try {
      for (const user of selectedRows) {
        await updateUser({ id: user.id, queryEdit: value }, "queryEdit");
      }
      setUsers(prev =>
        prev.map(u => {
          if (selectedRows.find(s => s.id === u.id)) {
            return { ...u, queryEdit: value };
          }
          return u;
        })
      );
      toast.success(`Updated ${selectedRows.length} users`);
      gridRef.current?.api?.deselectAll();
    } catch (error) {
      toast.error("Failed to update some users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCsv = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: `users_export_${new Date().toISOString().split("T")[0]}.csv`,
      });
    }
  }, []);

  // Filter role items based on whether user is a site admin
  const roleItems = rolesList
    .filter(role => !isSiteAdmin || siteAdminAllowedRoles.includes(role.role))
    .map(role => ({
      id: role.role,
      label: role.role,
    }));

  // Filter primary role options for site admins
  const filteredPrimaryRoleOptions = isSiteAdmin
    ? primaryRoleOptions.filter(role => siteAdminAllowedRoles.includes(role))
    : primaryRoleOptions;

  const schoolItems = schoolsList.map(school => ({
    id: school.name,
    label: school.name,
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Users ({users.length})</h2>
          {selectedRows.length > 0 && (
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              {selectedRows.length} selected
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <>
              {/* Site Admins cannot grant/revoke admin or query edit permissions */}
              {!isSiteAdmin && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkSetAdmin(true)}
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Grant Admin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkSetAdmin(false)}
                    disabled={isLoading}
                  >
                    Revoke Admin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkSetQueryEdit(true)}
                    disabled={isLoading}
                  >
                    Grant Query Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkSetQueryEdit(false)}
                    disabled={isLoading}
                  >
                    Revoke Query Edit
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                </>
              )}
            </>
          )}
          <Button variant="outline" onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="h-[600px] w-full">
        <AgGridReact
          ref={gridRef}
          rowData={users}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information, roles, and permissions
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryRole">Primary Role</Label>
                <Select
                  value={formData.primaryRole}
                  onValueChange={(value) => setFormData({ ...formData, primaryRole: value })}
                  disabled={isSiteAdmin && !siteAdminAllowedRoles.includes(formData.primaryRole)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPrimaryRoleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isSiteAdmin && !siteAdminAllowedRoles.includes(formData.primaryRole) && (
                  <p className="text-xs text-muted-foreground">
                    Cannot modify this user&apos;s primary role
                  </p>
                )}
              </div>
              <div className="space-y-2 pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admin"
                      checked={formData.admin}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, admin: checked as boolean })
                      }
                      disabled={isSiteAdmin}
                    />
                    <Label htmlFor="admin" className={isSiteAdmin ? "text-muted-foreground" : ""}>
                      Admin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="queryEdit"
                      checked={formData.queryEdit}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, queryEdit: checked as boolean })
                      }
                      disabled={isSiteAdmin}
                    />
                    <Label htmlFor="queryEdit" className={isSiteAdmin ? "text-muted-foreground" : ""}>
                      Query Edit
                    </Label>
                  </div>
                </div>
                {isSiteAdmin && (
                  <p className="text-xs text-muted-foreground">
                    Only district admins can modify these permissions
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Roles</Label>
              <MultiDropdownSelector
                items={roleItems}
                values={formData.roles}
                onChange={(values) => setFormData({ ...formData, roles: values })}
                placeholder="Select roles..."
                width="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>School Access</Label>
              <MultiDropdownSelector
                items={schoolItems}
                values={formData.schools}
                onChange={(values) => setFormData({ ...formData, schools: values })}
                placeholder="Select schools..."
                width="w-full"
              />
            </div>

            {/* Manual Overrides Section - Only for Super Admins */}
            {!isSiteAdmin && (
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-3 text-orange-600 dark:text-orange-400">
                  Manual Overrides
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  These overrides take precedence over Aeries permissions. Use comma-separated values.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="addedSchools" className="text-green-600 dark:text-green-400">
                      Add Schools (codes)
                    </Label>
                    <Input
                      id="addedSchools"
                      value={formData.addedSchools}
                      onChange={(e) => setFormData({ ...formData, addedSchools: e.target.value })}
                      placeholder="e.g., 101, 102, 301"
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Grant access to additional schools
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blockedSchools" className="text-red-600 dark:text-red-400">
                      Block Schools (codes)
                    </Label>
                    <Input
                      id="blockedSchools"
                      value={formData.blockedSchools}
                      onChange={(e) => setFormData({ ...formData, blockedSchools: e.target.value })}
                      placeholder="e.g., 101, 102"
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Remove access even if granted by Aeries
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addedRoles" className="text-green-600 dark:text-green-400">
                      Add Roles
                    </Label>
                    <Input
                      id="addedRoles"
                      value={formData.addedRoles}
                      onChange={(e) => setFormData({ ...formData, addedRoles: e.target.value })}
                      placeholder="e.g., TEACHER, GRADEDISTRIBUTION"
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Grant additional roles
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blockedRoles" className="text-red-600 dark:text-red-400">
                      Block Roles
                    </Label>
                    <Input
                      id="blockedRoles"
                      value={formData.blockedRoles}
                      onChange={(e) => setFormData({ ...formData, blockedRoles: e.target.value })}
                      placeholder="e.g., AIQUERY, ADMIN"
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Remove roles even if assigned
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
