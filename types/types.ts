import { ColDef, GridApi } from "ag-grid-community";

export interface DataTableProps<T extends object> {
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

export interface ChartOptionsProps {
  chartTitle?: string | null;
  chartXKey?: string | null;
  chartYKey?: string | null;
  chartTypeKey?: string | null;
  visibleColumns?: string[];
  chartStackKey?: boolean | null;
  aggFunction?: string | null;
  theme?: string;
  rowData?: any[];
  selectedRows?: any[];
  angleKey?: string;
  calloutLabelKey?: string;
  sectorLabelKey?: string;
  sectorLabel?: SectorLabel;
  chartSeriesOverride?: string;
}

export interface SectorLabel {
  color?: string;
  fontWeight?: string;
}