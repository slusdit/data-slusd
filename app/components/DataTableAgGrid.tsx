"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, GridApi } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AgCharts } from "ag-charts-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { colorSchemeDarkBlue, themeQuartz } from 'ag-grid-enterprise';

const transformLabel = (label: string) => {
  if (typeof label === 'string' && label.startsWith('SLVA')) {
    if (label.includes('Elementary')) return 'SLVA - Elem';
    if (label.includes('Middle')) return 'SLVA - Mid';
    if (label.includes('High')) return 'SLVA - High';
  }
  return label;
};

const IdCellRenderer = (props: any) => {
  const sc = props.data.sc || props.data.SC;
  return (
    <Link
      href={`/${sc}/student/${props.value}`}
      className="text-blue-500 hover:text-blue-700 hover:underline"
    >
      {props.value}
    </Link>
  );
};

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
  chartSeriesOverride?: string;
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
  chartSeriesOverride,
  title = "Data",
}: DataTableProps<T>) {
  const { resolvedTheme } = useTheme();
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columns, setColumns] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<T[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);

  const gridThemeClass = useMemo(() => {
    return resolvedTheme === 'dark'
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);

  const baseChartTheme = useMemo(() =>
    resolvedTheme === 'dark' ? 'ag-sheets-dark' : 'ag-sheets'
  , [resolvedTheme]);

  const enableCharts = true;
  const cellSelection = useMemo(() => {
    return true;
  }, []);

  const updateChartData = useCallback((params: any) => {
    const updatedData: T[] = [];
    params.api.forEachNodeAfterFilterAndSort((node: any) => {
      updatedData.push(node.data);
    });
    setFilteredData(updatedData);
  }, []);

  const onFilterChanged = useCallback((params: any) => {
    updateChartData(params);
  }, [updateChartData]);

  const onSortChanged = useCallback((params: any) => {
    updateChartData(params);
  }, [updateChartData]);

  const createChartOptions = useCallback(({
    chartTitle,
    chartXKey,
    chartYKey,
    chartTypeKey,
    visibleColumns,
    chartStackKey,
  }: {
    chartTitle?: string | null;
    chartXKey?: string | null;
    chartYKey?: string | null;
    chartTypeKey?: string | null;
    visibleColumns?: string[];
    chartStackKey?: boolean | null;
  }) => {
    const chartYKeyArray = chartYKey?.split(",").map(key => key.trim()) || [chartYKey];
    
    const transformedData = (selectedRows.length ? selectedRows : filteredData).map(row => ({
      ...row,
      [chartXKey]: chartXKey ? transformLabel(row[chartXKey]) : row[chartXKey]
    }));

    const baseOptions = {
      // height: 350,
      title: { 
        text: chartTitle || "Data Chart",
        fontSize: 20,
        padding: { top: 10, bottom: 20 }
      },
      theme: baseChartTheme,
      data: transformedData,
      series: chartYKeyArray.map(key => ({
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: key,
        yName: key,
        stacked: chartStackKey || false,
      })),
      axes: [
        {
          type: 'category',
          position: 'bottom',
          label: { 
            rotation: 45,
            fontSize: 12
          },
          title: {
            text: chartXKey || '',
            fontSize: 14
          }
        },
        {
          type: 'number',
          position: 'left',
          title: { 
            text: 'Values',
            fontSize: 14
          },
          label: {
            fontSize: 12
          }
        }
      ],
      padding: {
        top: 10,
        right: 40,
        bottom: 10,
        left: 60
      },
      legend: {
        position: 'top',
        spacing:5,
        fontSize: 12
      }
    };

    return baseOptions;
  }, [baseChartTheme, selectedRows, filteredData]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    pivot: true,
    enableRowGroup: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
  }), []);

  const columnDefs = useMemo(() => {
    if (!data || data.length === 0) return [];

    const checkboxCol = {
      headerName: "",
      field: "checkboxCol",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      filter: false,
      width: 50,
      flex: 0.5,
      hide: false,
    };

    const dataCols = Object.keys(data[0]).map((key) => {
      const baseCol = {
        field: key,
        headerName: key,
        hide: hiddenColumns?.includes(key.toUpperCase()),
      };

      if (key.toLowerCase() === "id" && ("sc" in data[0] || "SC" in data[0])) {
        return {
          ...baseCol,
          cellRenderer: IdCellRenderer,
          aggFunc: "count",
        };
      }

      if (["dt", "date", "day"].includes(key.toLowerCase())) {
        return {
          ...baseCol,
          filter: "agDateColumnFilter",
          filterParams: {
            buttons: ['apply', 'reset'],
            closeOnApply: true,
            comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
              if (!cellValue) return -1;
              const dateParts = cellValue.split("/");
              const cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[0]) - 1,
                Number(dateParts[1])
              );
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              return 1;
            },
          },
        };
      }

      // Handle numeric columns
      if (typeof data[0][key] === 'number') {
        return {
          ...baseCol,
          filter: 'agNumberColumnFilter',
          filterParams: {
            buttons: ['apply', 'reset'],
            closeOnApply: true,
          },
        };
      }

      return baseCol;
    });

    return [checkboxCol, ...dataCols];
  }, [data, hiddenColumns]);

  const exportToCSV = useCallback(() => {
    if (!gridApi) return;

    const exportParams = {
      skipHeader: false,
      suppressQuotes: true,
      columnSeparator: ',',
      onlySelected: gridApi.getSelectedRows().length > 0,
      fileName: `${title}_${new Date().toISOString().split('T')[0]}.csv`,
      processCellCallback: (params: any) => {
        if (params.value === null || params.value === undefined) return '';
        return params.value.toString();
      },
    };

    gridApi.exportDataAsCsv(exportParams);
  }, [gridApi, title]);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumns(params.api.getColumns()?.map(col => col.getColDef()) || []);

    // Initialize with data if available
    if (data?.length) {
      setRowData(data);
    }

    params.api.sizeColumnsToFit();
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (data?.length) {
      setRowData(data);
      setFilteredData(data);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data || !data.length) {
    return <div className="text-center p-4">No data available</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {showChart && (
        <div className="w-full min-h-fit border rounded-lg overflow-hidden">
          <AgCharts
            options={createChartOptions({
              chartTitle,
              chartXKey,
              chartYKey,
              chartTypeKey,
              chartStackKey,
              visibleColumns,
            })}
          />
        </div>
      )}

      <div className="flex justify-between items-center p-4">
        <Button
          onClick={exportToCSV}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Export to CSV
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
            {columns
              .filter((col) => col.field !== "checkboxCol")
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.field}
                  className="capitalize"
                  checked={!column.hide}
                  onCheckedChange={(value) =>
                    gridApi?.setColumnVisible(column.field!, value)
                  }
                >
                  {column.headerName || column.field}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[600px] w-full">
        <AgGridReact
          // containerStyle={containerStyle}
          theme={gridThemeClass}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onSelectionChanged={(event) =>
            setSelectedRows(event.api.getSelectedRows())
          }
          onFilterChanged={onFilterChanged}
          onSortChanged={onSortChanged}
          enableCellTextSelection={true}
          suppressRowClickSelection={true}
          pagination={true}
          animateRows={true}
          suppressLoadingOverlay={false}
          suppressNoRowsOverlay={false}
          enableCharts={enableCharts}
          cellSelection={cellSelection}
          pivotMode={false}
          pivotPanelShow='onlyWhenPivoting'
          sideBar={['columns']}
        />
      </div>
    </div>
  );
}

export default DataTable;