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
import { AgCharts } from "ag-charts-react";
import { useTheme } from "next-themes";

interface DataTableProps<T extends object> {
  data: T[];
  id?: string;
  showChart?: boolean;
  chartTitle?: string;
  chartTypeKey?: string | null;
  chartXKey?: string | null;
  chartYKey?: string | null;
  chartStackKey?: boolean | null;
  hiddenColumns?: string[];
  title?: string;
  aggFunction?: string;
}

function DataTable<T extends object>({
  data,
  id,
  showChart,
  chartTitle,
  chartXKey,
  chartYKey,
  chartTypeKey,
  chartStackKey,
  hiddenColumns,
  aggFunction,
  title = "Data",
}: DataTableProps<T>) {
  function createChartOptions({
    chartTitle,
    chartXKey,
    chartYKey,
    chartTypeKey,
    hiddenColumns,
    chartStackKey,
    aggFunction,
  }: {
    chartTitle?: string | null;
    chartXKey?: string | null;
    chartYKey?: string | null;
    chartTypeKey?: string | null;
    chartStackKey?: boolean | null;
    hiddenColumns?: string[] | null;
    aggFunction?: string | null;
  }) {
    const baseChartOptions = {
      autoSize: true,
      title: {
        text: chartTitle || "Data Chart",
      },
      theme: theme === "dark" ? `${agTheme}-dark` : `${agTheme}`,

      data: selectedRows.length ? selectedRows : rowData, // Use selected or all data

      series: [
        {
          type: chartTypeKey || "bar",
          xKey: chartXKey || "SC",
          yKey: chartYKey || "ID",
          cornerRadius: 5,
          // aggFunc: aggFunction || 'count'
        },
      ],
    };
    let chartYKeyArray = chartYKey?.split(",")

    if (hiddenColumns && hiddenColumns?.length > 0) {
      chartYKeyArray = chartYKeyArray.filter((key) => !key.includes(hiddenColumns))
      
    }
    if (chartYKey && chartYKey.includes(",")) {
      return {
        ...baseChartOptions,
        series: chartYKeyArray.map((key) => ({
          type: chartTypeKey || "bar",
          xKey: chartXKey || "SC",
          yKey: key.toString(),
          yName: key.toString(),
          stacked: chartStackKey || false,
          cornerRadius: 5,
          
        })),
      };
    } else {
      return baseChartOptions;
    }
  }

  const { theme } = useTheme();

  const agTheme = "ag-polychroma";

  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columns, setColumns] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<T[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [chartOptions, setChartOptions] = useState(
    createChartOptions({
      chartTitle,
      chartXKey,
      chartYKey,
      chartTypeKey,
      hiddenColumns,
      chartStackKey,
      aggFunction,
    })
  );
  const [agGridTheme, setAgGridTheme] = useState(
    theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"
  );
  const [filteredData, setFilteredData] = useState<T[]>(data || []);
  // const chartOptions = useMemo(() => {
  //   return createChartOptions()
  // }, [filteredData,chartTitle, chartXKey, chartYKey, chartTypeKey, hiddenColumns, aggFunction]);
  useEffect(() => {
    if (data) {
      setRowData(data);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setAgGridTheme(
      theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"
    );
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      theme: theme === "dark" ? "ag-sheets-dark" : "ag-sheets",
    }));
    console.log(chartOptions);
  }, [theme]);

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      data: selectedRows.length ? selectedRows : rowData,
    }));
  }, [selectedRows, rowData]);

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
      const keyLoopDefault = {
        ...defaultColDef,
        field: key,
        headerName: key,
        hide: hiddenColumns?.includes(key.toUpperCase()) ? true : false,
      };
      if (key === "ID") {
        return {
          ...keyLoopDefault,
          hide: hiddenColumns?.includes(key.toUpperCase()) ? true : false,
          resizable: true,
          aggFunc: "count",
        };
      }
      if (["dt", "date", "day"].includes(key)) {
        return {
          ...keyLoopDefault,
          filter: "agDateColumnFilter",
          filterParams: {
            comparator: (
              filterLocalDateAtMidnight: Date,
              cellValue: string
            ) => {
              var dateAsString = cellValue;
              if (dateAsString == null) return -1;
              var dateParts = dateAsString.split("/");
              console.log(dateParts)
              var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[0]) - 1,
                Number(dateParts[1]),
              );
              console.log(cellDate)
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
              return 0;
            },
          },
        };
      }
      return {
        ...keyLoopDefault,
        // headerName: key,
        // field: key,
        // hide: hiddenColumns?.includes(key.toUpperCase()) ? true : false,
        // floatingFilter: true,
        // resizable: true,
      };
    });

    return [checkboxCol, ...dataCols];
  }, [data, hiddenColumns, filteredData]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumns(params.api.getColumnDefs() as ColDef[]);
    params.api.addEventListener("filterChanged", onFilterChanged);
    setLoading(false);
  };
  const onFilterChanged = () => {
    if (gridApi) {
      const filteredNodes: T[] = [];
      gridApi.forEachNodeAfterFilter((node) => {
        if (node.data) {
          filteredNodes.push(node.data);
        }
      });
      setFilteredData(filteredNodes);
    }
  };
  const exportToCSV = () => {
    if (!gridApi) return;

    const visibleColumns = columns
      .filter((col) => !col.hide && col.field !== "checkboxCol")
      .map((col) => col.field);

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
    const updatedColumns = columns.map((col) => {
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
        <div
          className={`${agGridTheme} w-full h-full border-b-2 border-muted/20 pb-4`}
        >
          <AgCharts options={chartOptions} />
        </div>
      )}

      <div className="w-full py-4 grid grid-cols-1 gap-4 items-center">
        <div className="mb-4 flex justify-between items-center w-full ">
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
            <DropdownMenuContent
              align="end"
              className="max-h-96 overflow-y-auto"
            >
              {columns
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
