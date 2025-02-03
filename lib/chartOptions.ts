import { ChartOptionsProps } from "@/types/types";
import { AgFinancialCharts } from "ag-charts-react";

export async function createChartOptions({
  chartTitle,
  chartXKey,
  chartYKey,
  chartTypeKey,
  visibleColumns,
  chartStackKey,
  theme,
  rowData,
  selectedRows,
  chartSeriesOverride,
}: ChartOptionsProps) {
  const agTheme = "ag-polychroma";

  const baseChartOptions = {
    autoSize: true,
    title: {
      text: chartTitle || "Data Chart",
    },
    theme: theme === "dark" ? `${agTheme}-dark` : `${agTheme}`,
    data: selectedRows?.length ? selectedRows : rowData,
    series: [
      {
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: chartYKey || "ID",
        cornerRadius: 5,
      },
    ],
  };

  let chartYKeyArray = chartYKey?.split(",").map((item) => item.trim()) || [];

  // if (visibleColumns && chartYKeyArray.length > 0) {
  //   chartYKeyArray = chartYKeyArray.filter((key) =>
  //     visibleColumns.includes(key.trim())
  //   );
  // }
  if (chartSeriesOverride) {
    const finalChartOptions = {
      ...baseChartOptions,
      series: chartSeriesOverride,
    };
    return finalChartOptions;
  }


  if (chartYKeyArray && chartYKeyArray.length > 0) {
    const finalChartOptions = {
      ...baseChartOptions,
      series: chartYKeyArray.map((key) => ({
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: key || "ID",
        yName: key,
        stacked: chartStackKey || false,
        cornerRadius: 5,
      })),
    };

    return finalChartOptions;
  }

  return baseChartOptions;
}

export async function createChartOptions2({
  chartTitle,
  chartXKey,
  chartYKey,
  chartTypeKey,
  visibleColumns,
  chartStackKey,
  aggFunction,
}: {
  chartTitle?: string | null;
  chartXKey?: string | null;
  chartYKey?: string | null;
  chartTypeKey?: string | null;
  visibleColumns?: string[];
  chartStackKey?: boolean | null;
  aggFunction?: string | null;
}) {
  const baseChartOptions = {
    autoSize: true,
    title: {
      text: chartTitle || "Data Chart",
    },
    theme: theme === "dark" ? `${agTheme}-dark` : `${agTheme}`,
    data: selectedRows.length ? selectedRows : rowData,
    series: [
      {
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: chartYKey || "ID",
        cornerRadius: 5,
      },
    ],
  };

  let chartYKeyArray = chartYKey?.split(",") || [];

  // Filter yKeys based on visible columns
  if (visibleColumns && chartYKeyArray.length > 0) {
    chartYKeyArray = chartYKeyArray.filter((key) =>
      visibleColumns.includes(key.trim())
    );
  }

  if (chartYKeyArray.length > 0) {
    return {
      ...baseChartOptions,
      series: chartYKeyArray.map((key) => ({
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: key.trim(),
        yName: key.trim(),
        stacked: chartStackKey || false,
        cornerRadius: 5,
      })),
    };
  }

  return baseChartOptions;
}
