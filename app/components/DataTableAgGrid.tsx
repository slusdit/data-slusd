"use client";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, GridApi } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DiyChartBySchool } from "./charts/DiyChartBySchool";
import { BarChartCustomGraph } from "./charts/BarChartCustom";
import { AttendanceOverTimeChart } from "./charts/AttendanceOverTime";

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useTheme } from "next-themes";

interface DataTableProps<T extends object> {
  data: T[];
  id?: string;
  showChart?: boolean;
  chartTitle?: string;
  chartValueKey?: string | null;
  chartColumnKey?: string | null;
  hiddenColumns?: string[];
  title?: string;
}

function DataTable<T extends object>({
  data,
  id,
  showChart,
  chartTitle,
  chartValueKey,
  chartColumnKey,
  hiddenColumns,
  title="Data",
}: DataTableProps<T>) {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columns, setColumns] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<T[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);

  const { theme } = useTheme();
  const [agGridTheme, setAgGridTheme] = useState(theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine")

  useEffect(() => {
    if (data) {
      setRowData(data);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setAgGridTheme(theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine")
  }, [theme])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
    headerClass: "text-center flex justify-center items-center text-sm",
    cellClass: "text-center text-xs bg-card",
  }), []);

  const columnDefs = useMemo(() => {
    if (!data || data.length === 0) return [];

    const checkboxCol = {
      headerName: "",
      field: "checkboxCol",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      filter: false,

      width: 10,

      flex: 0.5,
      hide: false,
    };

    const dataCols = Object.keys(data[0]).map((key) => {
      console.log(hiddenColumns?.includes(key))
      console.log(hiddenColumns)
      console.log('key', key)
      return ({
        headerName: key,
        field: key,
        hide: hiddenColumns?.includes(key.toUpperCase()) ? true : false,
        floatingFilter: true,
        resizable: true,

      })
    });

    return [checkboxCol, ...dataCols];
  }, [data]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumns(params.api.getColumnDefs() as ColDef[]);
    setLoading(false)


  };

  const exportToCSV = () => {
    if (!gridApi) return;
    console.log('gridApi', gridApi)

    const visibleColumns = columns
      .filter(col => !col.hide && col.field !== 'checkboxCol')
      .map(col => col.field);

    const exportParams = {
      skipHeader: false,
      columnKeys: visibleColumns,
      onlySelected: gridApi.getSelectedRows().length > 0,
      allColumns: false,
      fileName: `${title} - ${new Date().toISOString().split('T')[0]}.csv`,
      processCellCallback: (params: any) => {
        return params.value?.toString() ?? '';
      }
    };

    gridApi.exportDataAsCsv(exportParams);
  };

  const toggleColumnVisibility = (field: string, visible: boolean) => {
    const updatedColumns = columns.map(col => {
      if (col.field === field) {
        return { ...col, hide: !visible };
      }
      return col;
    });

    setColumns(updatedColumns);
    // gridApi?.setColumnDefs(updatedColumns);
  };

  const onSelectionChanged = () => {
    const selectedData = gridApi?.getSelectedRows() || [];
    setSelectedRows(selectedData);
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        {/* Custom loader here (e.g., a spinner or skeleton) */}
        <div className="loader">Loading...</div>
      </div>
    );
  }


  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center">
      {showChart && (
        <div className="w-full flex justify-center">
          {showChart && id === "cly54bp030001hv31khj4zt38" && (
            <DiyChartBySchool data={selectedRows.length ? selectedRows : rowData} title={chartTitle} />
          )}
          {showChart && id === "clyva7j4s0005qwsuwm3qol0n" && (
            <BarChartCustomGraph
              data={selectedRows.length ? selectedRows : rowData}
              title={chartTitle ? chartTitle : ""}
              chartKey={chartColumnKey ? chartColumnKey : ""}
              chartDataKey={chartValueKey ? chartValueKey : ""}
            />
          )}
          {showChart && id === "clziv5kbm00018un4swvvb5a7" && (
            <AttendanceOverTimeChart
              itinalChartData={selectedRows.length ? selectedRows : rowData}
              chartTitle={chartTitle}
            />
          )}
        </div>
      )}

      <div className="w-full py-4">
        <div className="mb-4 space-x-2 flex justify-center">
          <Button
            onClick={exportToCSV}
            className="bg-primary text-white hover:bg-blue-600"
          >
            Export to CSV
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
              {columns
                .filter(col => col.field !== 'checkboxCol')
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
              rowData={rowData}
              columnDefs={columns.length ? columns : columnDefs}
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
    </div>
  );
}

export default DataTable;