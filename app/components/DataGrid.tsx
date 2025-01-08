import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataGridProps<T extends object> {
  data: T[];
  columns: ColDef[];
  hiddenColumns?: string[];
  title?: string;
  theme: string;
  onSelectionChange: (rows: T[]) => void;
  onVisibleColumnsChange: (columns: string[]) => void;
}

export function DataGrid<T extends object>({
  data,
  columns,
  hiddenColumns,
  title = "Data",
  theme,
  onSelectionChange,
  onVisibleColumnsChange,
}: DataGridProps<T>) {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(columns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const agGridTheme = theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine";

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    floatingFilter: true,
    minWidth: 100,
    headerClass: "text-center flex justify-center items-center text-sm",
    cellClass: "text-center text-xs bg-card",
  };

  useEffect(() => {
    if (columnDefs.length > 0) {
      const currentVisibleColumns = columnDefs
        .filter(col => !col.hide && col.field !== "checkboxCol")
        .map(col => col.field as string);
      setVisibleColumns(currentVisibleColumns);
      onVisibleColumnsChange(currentVisibleColumns);
    }
  }, [columnDefs]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const exportToCSV = () => {
    if (!gridApi) return;

    const exportParams = {
      skipHeader: false,
      columnKeys: visibleColumns,
      onlySelected: gridApi.getSelectedRows().length > 0,
      allColumns: false,
      fileName: `${title} - ${new Date().toISOString().split("T")[0]}.csv`,
      processCellCallback: (params: any) => {
        return params.value?.toString() ?? "";
      },
    };

    gridApi.exportDataAsCsv(exportParams);
  };

  const toggleColumnVisibility = (field: string, visible: boolean) => {
    const updatedColumns = columnDefs.map((col) => {
      if (col.field === field) {
        return { ...col, hide: !visible };
      }
      return col;
    });

    setColumnDefs(updatedColumns);
    gridApi?.setColumnDefs(updatedColumns);
  };

  const onSelectionChanged = () => {
    const selectedData = gridApi?.getSelectedRows() || [];
    onSelectionChange(selectedData);
  };

  return (
    <div className="w-full py-4 grid grid-cols-1 gap-4 items-center">
      <div className="mb-4 flex justify-between items-center w-full">
        <Button
          onClick={exportToCSV}
          className="bg-primary text-white hover:bg-blue-600"
        >
          Export to CSV
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
            {columnDefs
              .filter((col) => col.field !== "checkboxCol")
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.field}
                  className="capitalize"
                  checked={!column.hide}
                  onCheckedChange={(value) =>
                    toggleColumnVisibility(column.field!, value)
                  }
                >
                  {column.headerName || column.field}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="justify-center m-auto flex align-middle h-[600px] w-[95%]">
        <div className={`${agGridTheme} w-full`}>
          <AgGridReact
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChanged}
            enableCellTextSelection={true}
            suppressRowClickSelection={true}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
}