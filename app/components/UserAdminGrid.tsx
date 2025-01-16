"use client";
import { useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AggridChart from "./AggridChart";
import { Button } from "@/components/ui/button";
import { GridApi } from "ag-grid-community";
import { toast } from "sonner";
import { updateUser } from "@/lib/formActions";
import { User } from "@prisma/client";
import { useTheme } from "next-themes";
import { AdminPageUser } from "../admin/page";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

const UserAdminGrid = ({
  dataIn,
}: // onCellValueChange
{
  dataIn: AdminPageUser[];
  // onCellValueChange: (event: any) => void
}) => {
  const { theme } = useTheme();
  const agGridTheme =
    theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine";
  const gridRef = useRef<AgGridReact>(null);
  // console.log({ dataIn });

  const createAgGridData = useMemo(
    () => (data: any[]) => {
      // console.log({ data });
      if (!data || !data.length) return { data: [], colDefs: [] };

      const keys = Object.keys(data[0]);
      let colDefs = keys.map((key, index) => {
        if (["queryEdit", "admin"].includes(key)) {
          return {
            field: key.trim(),
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,
            cellDataType: "boolean",
            autoSize: true,
            // minWidth: 100,
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
        } else if (key === "category") {
          return {
            field: key.trim(),
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,
            valueFormatter: (params) => params.value?.label,
            autoSize: true,
            // minWidth: 100,
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
        } else if (key === "favorites") {
          return {
            field: key.trim(),
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: false,
            valueFormatter: (params) => {
              if (!params.value) return '';
              // Assuming each favorite object has a name property
              return params.value.map(favorite => favorite.name).join(', ');
            },
            autoSize: true,
            cellStyle: { whiteSpace: "normal" },
          };
        } else if (key === "UserSchool") {
          return {
            field: "Aeries - School Access",
            resizable: true,
            sortable: true,
            filter: false,
            floatingFilter: false,
            editable: false,
            autoHeight: true,
            cellDataType: "dropdown",
            autoSize: true,
            valueFormatter: (params) => {
              // console.log("params: ", params.data.UserSchool);
              const schoolList = params.data.UserSchool.map(
                (school) => school.school.name
              );
              return schoolList.join("\n");
            },
            // minWidth: 100,
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
        } else if (key === "userRole") {
          return {
            field: "Aeries - School Access",
            resizable: true,
            sortable: true,
            filter: false,
            floatingFilter: false,
            editable: false,
            autoHeight: true,
            // cellDataType: "dropdown",
            autoSize: true,
            valueFormatter: (params) => {
              // console.log("params: ", params.data.userRole);
              const userRoleList = params.data.userRole.map(
                (role) => role.role
              );
              // console.log(userRoleList);
              return userRoleList.join(", ");
            },
            // minWidth: 100,
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
        } else
          return {
            field: key.trim(),
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,

            autoSize: true,
            // minWidth: 100,
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
      });

      let formattedData = data.map((row) =>
        keys.reduce((acc, key) => {
          if (!row[key]) return acc;
          acc[key.trim()] = row[key] ?? "";
          // acc = {
          //   ...acc,
          //   checkboxSelection: true,
          // };
          // console.log({ acc });
          return acc;
        }, {})
      );

      return { data: formattedData, colDefs };
    },
    [dataIn]
  );

  const { data, colDefs } = useMemo(
    () => createAgGridData(dataIn),
    [dataIn, createAgGridData]
  );

  const autoSizeStrategy = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.autoSizeAllColumns(false, ["setColumnWidth"]);
      gridRef.current.api.sizeColumnsToFit();
    }
  };

  useEffect(() => {
    autoSizeStrategy();
  }, [data]);

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      // console.log("Selected rows:", selectedRows);
    }
  }, []);
  const onExportToCsv = () => {
    {
      // console.log("CLICK");
      gridApi.exportDataAsCsv();
    }
  };
  // console.log(data);
  let gridApi: GridApi;
  const onGridReady = (params) => {
    gridApi = params.api;
    autoSizeStrategy();
  };

  const onCellValueChanged = async (event) => {
    const { data, colDef, newValue } = event;
    const field = colDef.field;

    if (field === "userRole") {
      // Handle userRole changes
      try {
        const response = await updateUser(
          {
            ...data,
            userRole: newValue,
          },
          field
        );
        // console.log({ response });
        toast.success("User roles updated successfully");
      } catch (error) {
        console.error("Error updating user roles:", error);
        toast.error("Error updating user roles");
        return error;
      }
    } else {
      // Handle other field changes
      try {
        const response = await updateUser(data, field);
        // console.log({ response });
        toast.success("User updated successfully");
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Error updating user");
        return error;
      }
    }
  };

  return (
    <div className={agGridTheme} style={{ height: "100%", width: "100%" }}>
      <div className="mt-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="Users">
            <AccordionTrigger className="text-3xl text-foreground">Users

              </AccordionTrigger>
              <AccordionContent>
            <Button
              onClick={onExportToCsv}
              className="my-2 text-foreground"
              variant="outline"
              >
              Export to CSV
            </Button>


            <AgGridReact
              ref={gridRef}
              rowData={data}
              columnDefs={colDefs}
              domLayout="autoHeight"
              pagination={true}
              onGridReady={onGridReady}
              rowSelection="multiple"
              onSelectionChanged={onSelectionChanged}
              onCellValueChanged={onCellValueChanged}
              />
              </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default UserAdminGrid;
