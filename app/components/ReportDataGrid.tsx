"use client";

/**
 * Shared report grid (finding U1): the canonical AG Grid configuration for
 * tabular report output. Owns column inference (NULL-safe numeric typing,
 * number/percent formatting, student-id links), the Enterprise side bar and
 * status bar, theme switching, and per-report column-state persistence.
 *
 * Row-derived state (selection, filtered rows) is reported to the parent so
 * quick stats, charts and the totals footer can be computed there.
 */
import "@/app/components/providers/AGGridProvider";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ColumnState, GridApi, GridReadyEvent } from "ag-grid-community";
import { colorSchemeDarkBlue, themeQuartz } from "ag-grid-enterprise";
import { inferNumericColumn } from "@/lib/reportTotals";

// ---------- cell rendering ----------

/** Thousands separators; "%" columns get one decimal and a % sign. Display only. */
export function formatNumberCell(value: unknown, percent: boolean): string {
  if (value === null || value === undefined || value === "") return "";
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return String(value);
  if (percent) {
    return `${n.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  }
  return Number.isInteger(n) ? n.toLocaleString() : n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

/** Links an `id` column to the student page when the row carries a school code. */
const IdCellRenderer = (props: any) => {
  const sc = props.data?.sc || props.data?.SC || "";
  const value = props.value || "";

  // pinned totals row, group rows and aggregates never link anywhere
  if (props.node.rowPinned || props.node.group || props.node.aggData) {
    const displayValue = props.value?.value || props.value || "";
    return <div>{displayValue}</div>;
  }

  if (!sc) return <div>{value}</div>;

  return (
    <Link href={`/${sc}/student/${value}`} className="text-blue-500 hover:text-blue-700 hover:underline">
      {value}
    </Link>
  );
};

/** Column definitions inferred from the rows (types from the first non-null value in up to 50 rows). */
export function buildReportColumnDefs(rows: any[], hiddenColumns: string[] = []): ColDef[] {
  if (!rows || rows.length === 0) return [];

  const checkboxCol: ColDef = {
    headerName: "",
    field: "checkboxCol",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    filter: false,
    width: 50,
    flex: 0,
    suppressSizeToFit: true,
  };

  const first = rows[0];
  const dataCols: ColDef[] = Object.keys(first).map((key) => {
    const baseCol: ColDef = {
      field: key,
      headerName: key,
      hide: hiddenColumns.includes(key.toUpperCase()),
    };

    if (key.toLowerCase() === "id" && ("sc" in first || "SC" in first)) {
      return { ...baseCol, cellRenderer: IdCellRenderer };
    }

    if (["dt", "date", "day"].includes(key.toLowerCase())) {
      return {
        ...baseCol,
        filter: "agDateColumnFilter",
        filterParams: { buttons: ["apply", "reset"], closeOnApply: true },
      };
    }

    if (inferNumericColumn(rows, key)) {
      const isPercent = key.includes("%");
      return {
        ...baseCol,
        filter: "agNumberColumnFilter",
        filterParams: { buttons: ["apply", "reset"], closeOnApply: true },
        enableValue: true,
        allowedAggFuncs: ["sum", "avg", "count", "min", "max", "first", "last"],
        valueFormatter: (params) => formatNumberCell(params.value, isPercent),
        useValueFormatterForExport: false,
        type: "rightAligned",
      };
    }

    return baseCol;
  });

  return [checkboxCol, ...dataCols];
}

// ---------- export helpers ----------

function exportFileName(name: string, ext: string): string {
  return `${name.replace(/[^a-z0-9]/gi, "_")}_${new Date().toISOString().split("T")[0]}.${ext}`;
}

export function exportGridCsv(api: GridApi, name: string, onlySelected: boolean): void {
  api.exportDataAsCsv({ onlySelected, fileName: exportFileName(name, "csv") });
}

/** Excel export is an AG Grid Enterprise feature (already licensed). */
export function exportGridExcel(api: GridApi, name: string, onlySelected: boolean): void {
  api.exportDataAsExcel({ onlySelected, fileName: exportFileName(name, "xlsx"), sheetName: "Report" });
}

// ---------- grid ----------

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true,
  floatingFilter: true,
  flex: 1,
  minWidth: 100,
  enableValue: true,
  enableRowGroup: true,
  enablePivot: true,
};

const statusBar = {
  statusPanels: [
    { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" as const },
    { statusPanel: "agSelectedRowCountComponent", align: "left" as const },
    {
      statusPanel: "agAggregationComponent",
      align: "right" as const,
      statusPanelParams: { aggFuncs: ["count", "sum", "avg", "min", "max"] },
    },
  ],
};

const sideBar = {
  toolPanels: [
    {
      id: "columns",
      labelDefault: "Columns",
      labelKey: "columns",
      iconKey: "columns",
      toolPanel: "agColumnsToolPanel",
      toolPanelParams: {
        suppressRowGroups: false,
        suppressValues: false,
        suppressPivots: false,
        suppressPivotMode: false,
      },
    },
    {
      id: "filters",
      labelDefault: "Filters",
      labelKey: "filters",
      iconKey: "filter",
      toolPanel: "agFiltersToolPanel",
    },
  ],
  defaultToolPanel: "",
  position: "right" as const,
};

// Column-state changes that came from the user (not from sizeColumnsToFit or the API)
const USER_COLUMN_EVENT_SOURCES = new Set([
  "uiColumnMoved",
  "uiColumnResized",
  "uiColumnDragged",
  "uiColumnSorted",
  "columnMenu",
  "toolPanelUi",
  "autosizeColumns",
  "contextMenu",
]);

function readColumnState(key: string): ColumnState[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ColumnState[]) : null;
  } catch {
    return null;
  }
}

export interface ReportDataGridHandle {
  /** Forget the saved column layout for this report and size columns to fit. */
  resetColumns(): void;
  getApi(): GridApi | null;
}

export interface ReportDataGridProps {
  rows: any[];
  /** upper-cased column names to hide */
  hiddenColumns?: string[];
  pinnedBottomRowData?: any[];
  /** localStorage key for column-state persistence; omit to disable */
  storageKey?: string;
  paginationPageSize?: number;
  onGridReady?: (api: GridApi) => void;
  onSelectionChanged?: (rows: any[]) => void;
  onFilteredRowsChanged?: (rows: any[]) => void;
}

const ReportDataGrid = forwardRef<ReportDataGridHandle, ReportDataGridProps>(function ReportDataGrid(
  {
    rows,
    hiddenColumns = [],
    pinnedBottomRowData,
    storageKey,
    paginationPageSize = 50,
    onGridReady,
    onSelectionChanged,
    onFilteredRowsChanged,
  },
  ref
) {
  const { resolvedTheme } = useTheme();
  const apiRef = useRef<GridApi | null>(null);
  const [api, setApi] = useState<GridApi | null>(null);

  const gridTheme = useMemo(
    () => (resolvedTheme === "dark" ? themeQuartz.withPart(colorSchemeDarkBlue) : themeQuartz),
    [resolvedTheme]
  );

  const columnDefs = useMemo(() => buildReportColumnDefs(rows, hiddenColumns), [rows, hiddenColumns]);

  const emitFilteredRows = useCallback(
    (gridApi: GridApi) => {
      if (!onFilteredRowsChanged) return;
      const visible: any[] = [];
      gridApi.forEachNodeAfterFilterAndSort((node) => {
        if (node.data) visible.push(node.data);
      });
      onFilteredRowsChanged(visible);
    },
    [onFilteredRowsChanged]
  );

  const persistColumnState = useCallback(
    (event: { api: GridApi; source?: string; finished?: boolean }) => {
      if (!storageKey) return;
      if (event.finished === false) return;
      if (event.source && !USER_COLUMN_EVENT_SOURCES.has(event.source)) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify(event.api.getColumnState()));
      } catch {
        // storage unavailable; layout simply is not remembered
      }
    },
    [storageKey]
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent) => {
      apiRef.current = event.api;
      setApi(event.api);
      const saved = storageKey ? readColumnState(storageKey) : null;
      if (saved) {
        event.api.applyColumnState({ state: saved, applyOrder: true });
      } else {
        event.api.sizeColumnsToFit();
      }
      onGridReady?.(event.api);
    },
    [onGridReady, storageKey]
  );

  useImperativeHandle(
    ref,
    () => ({
      resetColumns() {
        const gridApi = apiRef.current;
        if (storageKey) {
          try {
            localStorage.removeItem(storageKey);
          } catch {
            // ignore
          }
        }
        if (gridApi) {
          gridApi.resetColumnState();
          gridApi.sizeColumnsToFit();
        }
      },
      getApi: () => apiRef.current,
    }),
    [storageKey]
  );

  // New rows (e.g. after a refresh) reset the derived filtered set
  useEffect(() => {
    if (api) emitFilteredRows(api);
  }, [api, rows, emitFilteredRows]);

  return (
    <AgGridReact
      theme={gridTheme}
      rowData={rows}
      pinnedBottomRowData={pinnedBottomRowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      onGridReady={handleGridReady}
      rowSelection="multiple"
      onSelectionChanged={(e) => onSelectionChanged?.(e.api.getSelectedRows())}
      onFilterChanged={(e) => emitFilteredRows(e.api)}
      onSortChanged={(e) => {
        emitFilteredRows(e.api);
        persistColumnState(e);
      }}
      onColumnMoved={persistColumnState}
      onColumnResized={persistColumnState}
      onColumnVisible={persistColumnState}
      onColumnPinned={persistColumnState}
      enableCellTextSelection
      suppressRowClickSelection
      pagination
      paginationPageSize={paginationPageSize}
      paginationPageSizeSelector={[25, 50, 100, 500]}
      animateRows
      sideBar={sideBar}
      statusBar={statusBar}
      enableCharts={true}
      cellSelection={true}
    />
  );
});

export default ReportDataGrid;
