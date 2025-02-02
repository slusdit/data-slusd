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
import { colorSchemeDark, colorSchemeDarkBlue, themeQuartz } from 'ag-grid-enterprise';

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

  // Theme handling
  const gridThemeClass = useMemo(() => {
    return resolvedTheme === 'dark' 
      ? themeQuartz.withPart(colorSchemeDarkBlue) 
      : themeQuartz;
  }, [resolvedTheme]);

  const baseChartTheme = useMemo(() => 
    resolvedTheme === 'dark' ? 'ag-sheets-dark' : 'ag-sheets'
  , [resolvedTheme]);

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
    
    const baseOptions = {
      title: { text: chartTitle || "Data Chart" },
      theme: baseChartTheme,
      data: selectedRows.length ? selectedRows : rowData,
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
          label: { rotation: 45 },
        },
        {
          type: 'number',
          position: 'left',
          title: { text: 'Values' },
        }
      ],
    };

    return baseOptions;
  }, [baseChartTheme, selectedRows, rowData]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true
    }
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
    setColumns(params.api.getColumnDefs() as ColDef[]);
    params.api.sizeColumnsToFit();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (data) {
      setRowData(data);
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
        <div className="w-full h-96 border rounded-lg overflow-hidden">
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

      </div>

      <div className="h-[600px] w-full">
        <AgGridReact
          theme={gridThemeClass}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onSelectionChanged={(event) => 
            setSelectedRows(event.api.getSelectedRows())
          }
          enableCellTextSelection={true}

          pagination={true}
          animateRows={true}
        />
      </div>
    </div>
  );
}

export default DataTable;