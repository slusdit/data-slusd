"use client";
import { useRef, useEffect, useMemo, useCallback, forwardRef } from "react";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from 'ag-grid-community';
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { GridApi, ICellEditorParams } from "ag-grid-community";
import { toast } from "sonner";
import { updateUser } from "@/lib/formActions";
import { useTheme } from "next-themes";
import { AdminPageUser } from "../admin/page";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import MultiDropdownSelector from "./MultiDropdownSelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Custom Multi-Select Editor for User Roles using MultiDropdownSelector
const UserRoleEditor = forwardRef((props: ICellEditorParams & { availableRoles: Array<{ id: string; role: string }> }, ref) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initialize with current values 
  useEffect(() => {
    if (!isInitialized && props.data?.userRole) {
      const currentRoles = Array.isArray(props.data.userRole) 
        ? props.data.userRole.map((role: any) => role.role || role)
        : [];
      setSelectedValues(currentRoles);
      setIsInitialized(true);
    }
  }, [props.data?.userRole, isInitialized]);

  const getValue = () => selectedValues;

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      (ref as any).current = {
        getValue,
        isCancelBeforeStart: () => false,
        isCancelAfterEnd: () => false,
      };
    }
  }, [selectedValues]);

  const handleRoleChange = async (values: string[]) => {
    setSelectedValues(values);
    
    try {
      // Find role IDs from role names
      const roleIds = values.map(roleName => {
        const role = props.availableRoles.find(r => r.role === roleName);
        return role?.id;
      }).filter(Boolean);

      // Prepare data for backend
      const updateData = { 
        id: props.data.id,
        userRoleIds: roleIds 
      };

      // Update database
      await updateUser(updateData, "User Roles");
      
      // UPDATED: Update local data to match userRole structure (direct Role objects)
      const roleObjects = values.map(roleName => {
        const role = props.availableRoles.find(r => r.role === roleName);
        return role ? {
          id: role.id,
          role: role.role
        } : null;
      }).filter(Boolean);
      
      // Update the userRole field (lowercase) instead of UserRole
      props.data.userRole = roleObjects;
      
      // Update grid display
      if (props.api) {
        const rowNode = props.api.getRowNode(props.data.id.toString());
        if (rowNode) {
          rowNode.setDataValue('userRole', roleObjects);
          props.api.refreshCells({
            force: true,
            rowNodes: [rowNode],
            columns: ['User Roles']
          });
        }
      }
      
      toast.success(`User roles updated successfully (${values.length} roles assigned)`);
      
      // Close the editor
      if (props.stopEditing) {
        props.stopEditing();
      }
    } catch (error) {
      console.error("Error updating user roles:", error);
      toast.error("Error updating user roles");
    }
  };

  const handleSelectAll = () => {
    const allRoleNames = props.availableRoles.map(role => role.role);
    handleRoleChange(allRoleNames);
  };

  const handleClearAll = () => {
    handleRoleChange([]);
  };

  const roleItems = props.availableRoles.map(role => ({
    id: role.role,
    label: role.role
  }));

  return (
    <div className="p-4 bg-white border rounded-md shadow-lg" style={{ minWidth: '300px', zIndex: 2000 }}>
      <div className="mb-2 font-semibold">Select User Roles:</div>
      <div className="flex gap-2 mb-3">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleSelectAll}
          disabled={selectedValues.length === props.availableRoles.length}
        >
          Select All ({props.availableRoles.length})
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleClearAll}
          disabled={selectedValues.length === 0}
        >
          Clear All
        </Button>
      </div>
      <div style={{ zIndex: 2001 }}>
        <MultiDropdownSelector
          items={roleItems}
          values={selectedValues}
          onChange={handleRoleChange}
          placeholder="Select roles..."
          width="w-full"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button size="sm" onClick={props.stopEditing}>Done</Button>
      </div>
    </div>
  );
});

UserRoleEditor.displayName = 'UserRoleEditor';

// Custom Multi-Select Editor for Schools using MultiDropdownSelector
const SchoolEditor = forwardRef((props: ICellEditorParams & { availableSchools: Array<{ id: string; name: string; sc: string }> }, ref) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initialize with current values - UPDATED to use school (lowercase) for consistency
  useEffect(() => {
    if (!isInitialized && (props.data?.UserSchool || props.data?.school)) {
      // Handle both UserSchool junction table and school direct relation
      const schoolData = props.data?.school || props.data?.UserSchool;
      const currentSchools = Array.isArray(schoolData) 
        ? schoolData.map((item: any) => {
            // If it's from UserSchool junction table
            if (item.school) return item.school.name;
            // If it's direct school relation
            return item.name;
          })
        : [];
      setSelectedValues(currentSchools);
      setIsInitialized(true);
    }
  }, [props.data?.UserSchool, props.data?.school, isInitialized]);

  const getValue = () => selectedValues;

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      (ref as any).current = {
        getValue,
        isCancelBeforeStart: () => false,
        isCancelAfterEnd: () => false,
      };
    }
  }, [selectedValues]);

  const handleSchoolChange = async (values: string[]) => {
    setSelectedValues(values);
    
    try {
      // Find school IDs from school names
      const schoolIds = values.map(schoolName => {
        const school = props.availableSchools.find(s => s.name === schoolName);
        return school?.id;
      }).filter(Boolean);

      // Prepare data for backend
      const updateData = { 
        id: props.data.id,
        schoolIds: schoolIds 
      };

      // Update database
      await updateUser(updateData, "School Access");
      
      // UPDATED: Update local data to match school structure (direct SchoolInfo objects)
      const schoolObjects = values.map(schoolName => {
        const school = props.availableSchools.find(s => s.name === schoolName);
        return school ? {
          id: school.id,
          name: school.name,
          sc: school.sc
        } : null;
      }).filter(Boolean);
      
      // Update both possible fields for compatibility
      props.data.school = schoolObjects;
      props.data.UserSchool = schoolObjects.map(school => ({
        userId: props.data.id,
        schoolSc: school.id,
        school: school
      }));
      
      // Update grid display
      if (props.api) {
        const rowNode = props.api.getRowNode(props.data.id.toString());
        if (rowNode) {
          rowNode.setDataValue('UserSchool', props.data.UserSchool);
          rowNode.setDataValue('school', schoolObjects);
          props.api.refreshCells({
            force: true,
            rowNodes: [rowNode],
            columns: ['School Access']
          });
        }
      }
      
      toast.success(`School access updated successfully (${values.length} schools assigned)`);
      
      // Close the editor
      if (props.stopEditing) {
        props.stopEditing();
      }
    } catch (error) {
      console.error("Error updating school access:", error);
      toast.error("Error updating school access");
    }
  };

  const handleSelectAll = () => {
    const allSchoolNames = props.availableSchools.map(school => school.name);
    handleSchoolChange(allSchoolNames);
  };

  const handleClearAll = () => {
    handleSchoolChange([]);
  };

  const schoolItems = props.availableSchools.map(school => ({
    id: school.name,
    label: school.name
  }));

  return (
    <div className="p-4 bg-white border rounded-md shadow-lg" style={{ minWidth: '300px', zIndex: 2000 }}>
      <div className="mb-2 font-semibold">Select School Access:</div>
      <div className="flex gap-2 mb-3">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleSelectAll}
          disabled={selectedValues.length === props.availableSchools.length}
        >
          Select All ({props.availableSchools.length})
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleClearAll}
          disabled={selectedValues.length === 0}
        >
          Clear All
        </Button>
      </div>
      <div style={{ zIndex: 2001 }}>
        <MultiDropdownSelector
          items={schoolItems}
          values={selectedValues}
          onChange={handleSchoolChange}
          placeholder="Select schools..."
          width="w-full"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button size="sm" onClick={props.stopEditing}>Done</Button>
      </div>
    </div>
  );
});

SchoolEditor.displayName = 'SchoolEditor';

// Favorites Modal Component with Edit Capability
const FavoritesModal = ({ 
  favorites, 
  userName, 
  userId,
  availableQueries,
  onUpdate 
}: { 
  favorites: Array<{ name: string; id?: string; label?: string; description?: string }>;
  userName: string;
  userId: string;
  availableQueries: Array<{ id: string; name: string; label?: string; description?: string }>;
  onUpdate: (userId: string, selectedQueryIds: string[]) => Promise<void>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Initialize selected values when modal opens
  useEffect(() => {
    if (open && !isEditing) {
      const currentFavoriteNames = favorites.map(fav => fav.name);
      setSelectedValues(currentFavoriteNames);
    }
  }, [open, favorites, isEditing]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Convert query names back to query IDs
      const selectedQueryIds = selectedValues.map(queryName => {
        const query = availableQueries.find(q => q.name === queryName);
        return query?.id;
      }).filter(Boolean);

      await onUpdate(userId, selectedQueryIds);
      toast.success(`Favorites updated successfully (${selectedValues.length} queries)`);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Error updating favorites");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    const currentFavoriteNames = favorites.map(fav => fav.name);
    setSelectedValues(currentFavoriteNames);
    setIsEditing(false);
  };

  const handleSelectAll = () => {
    const allQueryNames = availableQueries.map(query => query.name);
    setSelectedValues(allQueryNames);
  };

  const handleClearAll = () => {
    setSelectedValues([]);
  };

  const queryItems = availableQueries.map(query => ({
    id: query.name,
    label: query.name
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:bg-gray-50 p-1 rounded">
          <div className="flex items-center gap-1">
            <span className="truncate flex-1">
              {favorites.length === 0 ? 'None' : 
               favorites.length === 1 ? favorites[0].name :
               `${favorites[0].name}`}
            </span>
            {favorites.length > 1 && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                +{favorites.length - 1} more
              </span>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{userName}'s Favorite Queries</span>
            {!isEditing && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? (
              `Select queries to add to ${userName}'s favorites`
            ) : (
              favorites.length === 0 
                ? "This user has no favorite queries." 
                : `This user has ${favorites.length} favorite quer${favorites.length === 1 ? 'y' : 'ies'}.`
            )}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleSelectAll}
                disabled={selectedValues.length === availableQueries.length}
              >
                Select All ({availableQueries.length})
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleClearAll}
                disabled={selectedValues.length === 0}
              >
                Clear All
              </Button>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              <MultiDropdownSelector
                items={queryItems}
                values={selectedValues}
                onChange={setSelectedValues}
                placeholder="Select favorite queries..."
                width="w-full"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {favorites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No favorite queries found</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="mt-2"
                  onClick={() => setIsEditing(true)}
                >
                  Add Favorites
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {favorites.map((favorite, index) => (
                  <div 
                    key={favorite.id || index} 
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm">{favorite.name}</div>
                    {favorite.description && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {favorite.description}
                      </div>
                    )}
                    {favorite.label && (
                      <div className="text-xs text-blue-600 mt-1">
                        Label: {favorite.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const UserAdminGrid = ({
  dataIn,
  availableRoles,
  availableSchools,
  availableQueries,
}: {
  dataIn: AdminPageUser[];
  availableRoles?: Array<{ id: string; role: string }>;
  availableSchools?: Array<{ id: string; name: string; sc: string }>;
  availableQueries?: Array<{ id: string; name: string; label?: string; description?: string }>;
}) => {
  const { theme } = useTheme();
  const agGridTheme = theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";
  const gridRef = useRef<AgGridReact>(null);

  // Memoize the role options for dropdown
  const roleOptions = useMemo(() => {
    return ["USER", "ADMIN", "SUPERADMIN", "HR", "TEACHER", "SITEADMIN", "STAFF", "BUSINESS", "IT", "DISCIPLINE", "SECONDARYTEACHER", "ELEMENTARYTEACHER", "ASSESSMENT", "GRADEDISTRIBUTION", "DIRECTOR", "PRINCIPAL", "COUNSELOR", "NURSE", "LIBRARIAN", "INTERVENTIONS"];
  }, []);

  // Get available roles and schools for multi-select
  const rolesList = useMemo(() => {
    if (availableRoles && availableRoles.length > 0) {
      return availableRoles;
    }
    
    // Fallback: Extract unique roles from existing user data
    const uniqueRoles = new Set<string>();
    dataIn.forEach(user => {
      if (user.userRole && Array.isArray(user.userRole)) {
        user.userRole.forEach((role: any) => {
          if (role.role) uniqueRoles.add(role.role);
          else if (typeof role === 'string') uniqueRoles.add(role);
        });
      }
    });
    
    // Add common roles if none found
    const commonRoles = ["USER", "ADMIN", "TEACHER", "STAFF"];
    commonRoles.forEach(role => uniqueRoles.add(role));
    
    return Array.from(uniqueRoles).map(role => ({ id: role, role }));
  }, [availableRoles, dataIn]);

  const queriesList = useMemo(() => {
    if (availableQueries && availableQueries.length > 0) {
      return availableQueries;
    }
    
    // Fallback: Extract unique queries from existing user data
    const uniqueQueries = new Map<string, { id: string; name: string; label?: string; description?: string }>();
    dataIn.forEach(user => {
      if (user.favorites && Array.isArray(user.favorites)) {
        user.favorites.forEach((favorite: any) => {
          if (favorite.id && favorite.name) {
            uniqueQueries.set(favorite.id, {
              id: favorite.id,
              name: favorite.name,
              label: favorite.label,
              description: favorite.description
            });
          }
        });
      }
    });
    
    return Array.from(uniqueQueries.values());
  }, [availableQueries, dataIn]);

  const schoolsList = useMemo(() => {
    if (availableSchools && availableSchools.length > 0) {
      return availableSchools;
    }
    
    // Fallback: Extract unique schools from existing user data
    const uniqueSchools = new Map<string, { id: string; name: string; sc: string }>();
    dataIn.forEach(user => {
      if (user.UserSchool && Array.isArray(user.UserSchool)) {
        user.UserSchool.forEach((userSchool: any) => {
          if (userSchool.school) {
            const school = userSchool.school;
            uniqueSchools.set(school.id, {
              id: school.id,
              name: school.name,
              sc: school.sc || school.schoolCode || school.code || school.id
            });
          }
        });
      }
    });
    
    return Array.from(uniqueSchools.values());
  }, [availableSchools, dataIn]);

  // Function to handle favorites update
  const handleFavoritesUpdate = useCallback(async (userId: string, selectedQueryIds: string[]) => {
    try {
      const updateData = { 
        id: userId,
        favoriteIds: selectedQueryIds 
      };

      await updateUser(updateData, "Favorites");
      
      // Update local data
      if (gridRef.current?.api) {
        const rowNode = gridRef.current.api.getRowNode(userId);
        if (rowNode) {
          // Update the favorites data with the new selection
          const updatedFavorites = selectedQueryIds.map(queryId => {
            const query = queriesList.find(q => q.id === queryId);
            return query ? {
              id: query.id,
              name: query.name,
              label: query.label,
              description: query.description
            } : null;
          }).filter(Boolean);
          
          rowNode.setDataValue('favorites', updatedFavorites);
          gridRef.current.api.refreshCells({
            force: true,
            rowNodes: [rowNode],
            columns: ['favorites']
          });
        }
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      throw error;
    }
  }, [queriesList]);

  const createAgGridData = (data: any[]) => {
    if (!data || !data.length) return { data: [], colDefs: [] };

    const keys = Object.keys(data[0]);
    let colDefs = keys.map((key, index) => {
      // Hidden fields
      if (["id", "createdAt", "updatedAt", "emailVerified", "primarySchool", "psl", "activeSchool", "manualSchool"].includes(key)) {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: false,
          autoSize: true,
          minWidth: 25,
          hide: true,
          cellStyle: { whiteSpace: "normal" },
        };
      }
      // Boolean fields with better editor
      else if (["queryEdit", "admin"].includes(key)) {
        return {
          field: key.trim(),
          headerName: key === "queryEdit" ? "Query Edit" : "Admin",
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          cellDataType: "boolean",
          cellRenderer: "agCheckboxCellRenderer",
          cellRendererParams: {
            disabled: false
          },
          autoSize: true,
          cellStyle: { whiteSpace: "normal" },
        };
      }
      // Primary role dropdown with proper editor
      else if (key === "primaryRole") {
        return {
          field: key.trim(),
          headerName: "Primary Role",
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: roleOptions,
          },
          valueSetter: (params: { newValue: string; data: any }) => {
            if (roleOptions.includes(params.newValue)) {
              params.data.primaryRole = params.newValue;
              return true;
            }
            toast.error("Invalid role selected");
            return false;
          },
          autoSize: true,
          minWidth: 120,
          cellStyle: { whiteSpace: "normal" },
        };
      }
      // Category field (from your original code)
      else if (key === "category") {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          valueFormatter: (params: { value: { label: string } }) => params.value?.label || '',
          autoSize: true,
          cellStyle: { whiteSpace: "normal" },
        };
      }
      // Favorites field (read-only with modal)
      else if (key === "favorites") {
        return {
          field: key.trim(),
          headerName: "Favorites",
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: false,
          autoSize: false,
          width: 200,
          maxWidth: 200,
          minWidth: 120,
          valueFormatter: (params: { value: Array<{ name: string }> }) => {
            if (!params.value || !Array.isArray(params.value)) return '';
            return params.value.map(favorite => favorite.name).join(', ');
          },
          cellRenderer: (params: { value: Array<{ name: string; id?: string; label?: string; description?: string }>; data: { name: string; id: string } }) => {
            if (!params.value || !Array.isArray(params.value)) {
              return (
                <FavoritesModal 
                  favorites={[]} 
                  userName={params.data.name}
                  userId={params.data.id}
                  availableQueries={queriesList}
                  onUpdate={handleFavoritesUpdate}
                />
              );
            }
            
            return (
              <FavoritesModal 
                favorites={params.value} 
                userName={params.data.name}
                userId={params.data.id}
                availableQueries={queriesList}
                onUpdate={handleFavoritesUpdate}
              />
            );
          },
          cellStyle: { 
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "0"
          },
        };
      }
      // UserSchool field - USE CUSTOM EDITOR
      else if (key === "UserSchool") {
        return {
          field: "School Access",
          headerName: "School Access",
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: schoolsList.length > 0,
          // USE THE CUSTOM SCHOOL EDITOR
          cellEditor: SchoolEditor,
          cellEditorParams: {
            availableSchools: schoolsList,
          },
          cellEditorPopup: true,
          cellEditorPopupStyle: {
            width: '400px',
            maxWidth: '90vw',
          },
          autoSize: false,
          width: 300,
          maxWidth: 300,
          minWidth: 200,
          valueGetter: (params: { data: { UserSchool: Array<{ school: { name: string; sc?: string; id: string } }> } }) => {
            if (!params.data.UserSchool || !Array.isArray(params.data.UserSchool)) return [];
            return params.data.UserSchool.map((userSchool) => userSchool.school.name);
          },
          valueFormatter: (params: { value: string[] }) => {
            if (!params.value || !Array.isArray(params.value)) return '';
            if (schoolsList.length === 0) return 'No schools available';
            return params.value.join(", ");
          },
          cellRenderer: (params: { value: string[] }) => {
            if (!params.value || !Array.isArray(params.value)) return '';
            if (schoolsList.length === 0) return 'No schools available';
            
            const schoolCount = params.value.length;
            if (schoolCount === 0) return 'None';
            if (schoolCount === 1) return params.value[0];
            
            // Show first school + count for multiple schools
            const firstSchool = params.value[0];
            return (
              <div className="flex items-center gap-1" title={params.value.join(', ')}>
                <span className="truncate flex-1">{firstSchool}</span>
                {schoolCount > 1 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    +{schoolCount - 1} more
                  </span>
                )}
              </div>
            );
          },
          cellStyle: { 
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          },
        };
      }
      // UPDATED: userRole field - USE CUSTOM EDITOR
      else if (key === "userRole") {
        return {
          field: "User Roles",
          headerName: "User Roles", 
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: rolesList.length > 0,
          // USE THE CUSTOM ROLE EDITOR
          cellEditor: UserRoleEditor,
          cellEditorParams: {
            availableRoles: rolesList,
          },
          cellEditorPopup: true,
          cellEditorPopupStyle: {
            width: '400px',
            maxWidth: '90vw',
          },
          autoSize: false,
          width: 250,
          maxWidth: 250,
          minWidth: 150,
          // UPDATED: Simplified valueGetter for direct Role objects
          valueGetter: (params: { data: { userRole: Array<{ role: string; id: string }> } }) => {
            if (!params.data.userRole || !Array.isArray(params.data.userRole)) return [];
            return params.data.userRole.map(role => role.role);
          },
          valueFormatter: (params: { value: string[] }) => {
            if (!params.value || !Array.isArray(params.value)) return '';
            if (rolesList.length === 0) return 'No roles available';
            return params.value.join(", ");
          },
          cellRenderer: (params: { value: string[] }) => {
            if (!params.value || !Array.isArray(params.value)) return '';
            if (rolesList.length === 0) return 'No roles available';
            
            const roleCount = params.value.length;
            if (roleCount === 0) return 'None';
            if (roleCount <= 2) return params.value.join(', ');
            
            // Show first two roles + count for many roles
            const displayRoles = params.value.slice(0, 2).join(', ');
            return (
              <div className="flex items-center gap-1" title={params.value.join(', ')}>
                <span className="truncate flex-1">{displayRoles}</span>
                {roleCount > 2 && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    +{roleCount - 2} more
                  </span>
                )}
              </div>
            );
          },
          cellStyle: { 
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          },
        };
      }
      // Name field (make it stand out and editable)
      else if (key === "name") {
        return {
          field: key.trim(),
          headerName: "Name",
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          autoSize: true,
          minWidth: 150,
          cellStyle: { 
            whiteSpace: "normal",
            fontWeight: "500"
          },
        };
      }
      // Email field with validation
      else if (key === "email") {
        return {
          field: key.trim(),
          headerName: "Email",
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          cellRenderer: (params: { value: string }) => {
            if (!params.value) return '';
            return (
              <a 
                href={`mailto:${params.value}`} 
                className="text-blue-500 underline hover:text-blue-700"
                onClick={(e) => e.stopPropagation()}
              >
                {params.value}
              </a>
            );
          },
          cellEditor: 'agTextCellEditor',
          cellEditorParams: {
            maxLength: 255,
          },
          // Add email validation
          valueSetter: (params: { newValue: string; data: any }) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (params.newValue && !emailRegex.test(params.newValue)) {
              toast.error("Please enter a valid email address");
              return false;
            }
            params.data.email = params.newValue;
            return true;
          },
          autoSize: true,
          minWidth: 200,
          cellStyle: { whiteSpace: "normal" },
        };
      }
      // Default field configuration
      else {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          autoSize: true,
          minWidth: 100,
          cellStyle: { whiteSpace: "normal" },
        };
      }
    });

    let formattedData = data.map((row) =>
      keys.reduce((acc, key) => {
        acc[key.trim()] = row[key] ?? "";
        return acc;
      }, {} as any)
    );

    return { data: formattedData, colDefs };
  };

  const { data, colDefs } = useMemo(() => {
    return createAgGridData(dataIn);
  }, [dataIn, roleOptions, rolesList, schoolsList]);

  const autoSizeStrategy = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.autoSizeAllColumns(false, ["setColumnWidth"]);
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  useEffect(() => {
    autoSizeStrategy();
  }, [data, autoSizeStrategy]);

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      console.log("Selected rows:", selectedRows);
    }
  }, []);

  let gridApi: GridApi;

  const onExportToCsv = useCallback(() => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `users_export_${new Date().toISOString().split('T')[0]}.csv`
      });
    }
  }, [gridApi]);

  const onGridReady = useCallback((params: { api: GridApi<any> }) => {
    gridApi = params.api;
    autoSizeStrategy();
  }, [autoSizeStrategy]);

  const onCellValueChanged = useCallback(async (event: { 
    colDef?: any; 
    data?: any; 
    oldValue?: any; 
    newValue?: any;
  }) => {
    const field = event.colDef?.field;
    const { data, oldValue, newValue } = event;

    // Skip if no actual change or missing required data
    if (!field || !data || JSON.stringify(oldValue) === JSON.stringify(newValue)) return;

    // Skip non-editable fields and fields handled by custom editors
    if (['actions', 'favorites', 'id', 'createdAt', 'updatedAt', 'User Roles', 'School Access'].includes(field)) {
      return;
    }

    try {
      let updateData = { ...data };
      let successMessage = '';
      
      // Handle regular field updates
      updateData = { id: data.id, [field]: newValue };
      const fieldDisplayName = field.replace(/([A-Z])/g, ' $1').trim();
      successMessage = `${fieldDisplayName} updated successfully`;
      
      // Call the updateUser function
      await updateUser(updateData, field);

      // Show success message
      toast.success(successMessage);
      
      // Update the row data in the grid to reflect the change
      if (gridRef.current?.api) {
        const rowNode = gridRef.current.api.getRowNode(data.id?.toString());
        if (rowNode) {
          rowNode.setDataValue(field, newValue);
        }
      }
      
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(`Error updating ${field}: ${error.message || 'Unknown error'}`);
      
      // Revert the change on error
      if (gridRef.current?.api) {
        const rowNode = gridRef.current.api.getRowNode(data.id?.toString());
        if (rowNode) {
          rowNode.setDataValue(field, oldValue);
          // Force refresh to show the reverted value
          gridRef.current.api.refreshCells({
            force: true,
            rowNodes: [rowNode],
            columns: [field]
          });
        }
      }
    }
  }, []);

  return (
    <div className={agGridTheme} style={{ height: "100%", width: "100%" }}>
      <style jsx global>{`
        .ag-popup-editor {
          max-width: 90vw !important;
          z-index: 1500 !important;
        }
        .ag-popup-child {
          max-width: 100% !important;
        }
        /* Ensure MultiDropdownSelector dropdowns appear above everything */
        [data-radix-popper-content-wrapper] {
          z-index: 2500 !important;
        }
        .radix-dropdown-content {
          z-index: 2500 !important;
        }
        /* Generic high z-index for dropdown portals */
        [role="listbox"] {
          z-index: 2500 !important;
        }
      `}</style>
      <div className="mt-2">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Button
              onClick={onExportToCsv}
              className="text-foreground"
              variant="outline"
            >
              Export to CSV
            </Button>
            <Button
              onClick={() => {
                if (gridRef.current?.api) {
                  gridRef.current.api.selectAll();
                }
              }}
              variant="outline"
            >
              Select All
            </Button>
            <Button
              onClick={() => {
                if (gridRef.current?.api) {
                  gridRef.current.api.deselectAll();
                }
              }}
              variant="outline"
            >
              Clear Selection
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Total Users: {data?.length || 0} | 
            Roles Available: {rolesList.length} | 
            Schools Available: {schoolsList.length}
          </div>
        </div>

        <div className="h-full w-full">
          <AgGridReact
            theme={themeQuartz}
            ref={gridRef}
            rowData={data}
            columnDefs={colDefs}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={50}
            paginationPageSizeSelector={[25, 50, 100, 200]}
            onGridReady={onGridReady}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChanged}
            onCellValueChanged={onCellValueChanged}
            suppressRowClickSelection={true}
            rowMultiSelectWithClick={true}
            enableRangeSelection={true}
            animateRows={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UserAdminGrid;