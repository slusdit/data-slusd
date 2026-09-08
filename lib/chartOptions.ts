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
  const seriesType = chartTypeKey || "bar";
  // cornerRadius is only a bar-series option in this AG Charts version
  const seriesShape = seriesType === "bar" ? { cornerRadius: 3 } : {};

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
    // no explicit height: AG Charts fills its container (autoSize is no longer an option)
    ...(height ? { height } : {}),
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
        type: seriesType,
        xKey: chartXKey || "SC",
        yKey: chartYKey || "ID",
        ...seriesShape,
      },
    ],
  };

  let chartYKeyArray = chartYKey?.split(",").map((item) => item.trim()) || [];

  // Add axes and legend configuration based on size
  // AG Charts 14: axes are keyed by `x` / `y`, not an array
  const axesAndLegend = {
    axes: {
      x: {
        type: "category",
        position: "bottom",
        label: {
          // No rotation - use abbreviated labels instead
          rotation: 0,
          fontSize: isCompact ? 9 : 11,
          // labels are already abbreviated for compact charts (maxWidth is not an axis label option)
        },
        // Hide axis title for compact charts
        ...(isCompact ? {} : {
          title: chartXKey ? { text: chartXKey, fontSize: 11 } : undefined,
        }),
      },
      y: {
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
    },
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
        type: seriesType,
        xKey: chartXKey || "SC",
        yKey: key || "ID",
        yName: key,
        stacked: chartStackKey || false,
        ...seriesShape,
      })),
    };

    return finalChartOptions;
  }

  return { ...baseChartOptions, ...axesAndLegend };
}
