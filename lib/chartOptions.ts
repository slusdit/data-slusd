import { ChartOptionsProps } from "@/types/types";

// Helper to abbreviate long labels (especially dates and school names)
function abbreviateLabel(label: string): string {
  if (!label || typeof label !== 'string') return label;

  // Abbreviate school names
  if (label.startsWith("SLVA")) {
    if (label.includes("Elementary")) return "SLVA-E";
    if (label.includes("Middle")) return "SLVA-M";
    if (label.includes("High")) return "SLVA-H";
  }

  // Abbreviate dates like "2024-01-15" to "1/15" or "Jan 15"
  const dateMatch = label.match(/^\d{4}-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    return `${parseInt(dateMatch[1])}/${parseInt(dateMatch[2])}`;
  }

  // Abbreviate long text
  if (label.length > 12) {
    return label.substring(0, 10) + "...";
  }

  return label;
}

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
  height,
  showTitle = true,
}: ChartOptionsProps & { height?: number; showTitle?: boolean }) {
  const agTheme = "ag-polychroma";

  // Determine if this is a compact chart (for dashboard cards)
  const isCompact = height && height < 300;

  // For compact charts, abbreviate x-axis labels to save space
  const chartData = selectedRows?.length ? selectedRows : rowData;
  const processedData = isCompact && chartXKey
    ? chartData?.map((row: any) => ({
        ...row,
        [chartXKey]: abbreviateLabel(String(row[chartXKey] || '')),
      }))
    : chartData;

  const baseChartOptions = {
    ...(height ? { height } : { autoSize: true }),
    // Hide title for compact charts - it's redundant with the card header
    ...(showTitle && !isCompact ? {
      title: {
        text: chartTitle || "Data Chart",
        fontSize: 14,
      },
    } : {}),
    theme: theme === "dark" ? `${agTheme}-dark` : `${agTheme}`,
    data: processedData,
    padding: isCompact
      ? { top: 5, right: 10, bottom: 5, left: 35 }
      : { top: 10, right: 20, bottom: 20, left: 45 },
    series: [
      {
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: chartYKey || "ID",
        cornerRadius: 3,
      },
    ],
  };

  let chartYKeyArray = chartYKey?.split(",").map((item) => item.trim()) || [];

  // Add axes and legend configuration based on size
  const axesAndLegend = {
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          // No rotation - use abbreviated labels instead
          rotation: 0,
          fontSize: isCompact ? 9 : 11,
          // Limit max width to prevent overlap
          ...(isCompact ? { maxWidth: 60 } : {}),
        },
        // Hide axis title for compact charts
        ...(isCompact ? {} : {
          title: chartXKey ? { text: chartXKey, fontSize: 11 } : undefined,
        }),
      },
      {
        type: "number",
        position: "left",
        label: {
          fontSize: isCompact ? 9 : 11,
          // Use compact number formatting
          formatter: (params: any) => {
            const val = params.value;
            if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
            if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
            return val;
          },
        },
        // Hide axis title for compact charts
        ...(isCompact ? {} : {
          title: chartYKey ? { text: chartYKey, fontSize: 11 } : undefined,
        }),
      },
    ],
    legend: {
      enabled: chartYKeyArray.length > 1,
      position: isCompact ? "right" as const : "bottom" as const,
      item: {
        label: {
          fontSize: isCompact ? 9 : 11,
        },
        marker: {
          size: isCompact ? 8 : 12,
        },
      },
      ...(isCompact ? { spacing: 4 } : {}),
    },
  };

  if (chartSeriesOverride) {
    const finalChartOptions = {
      ...baseChartOptions,
      ...axesAndLegend,
      series: chartSeriesOverride,
    };
    return finalChartOptions;
  }

  if (chartYKeyArray && chartYKeyArray.length > 0) {
    const finalChartOptions = {
      ...baseChartOptions,
      ...axesAndLegend,
      series: chartYKeyArray.map((key) => ({
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: key || "ID",
        yName: key,
        stacked: chartStackKey || false,
        cornerRadius: 3,
      })),
    };

    return finalChartOptions;
  }

  return { ...baseChartOptions, ...axesAndLegend };
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
