'use client';
// Standalone AG Charts enterprise features + licence for dashboard charts (finding P1)
import "@/app/components/providers/AgChartsSetup";
import { AgCharts } from "ag-charts-react";
import { useMemo } from "react";

interface DataChartProps {
  chartOptions: any;
  theme?: string;
  height?: number | string;
  className?: string;
}

export function DataChart({ chartOptions, theme = 'light', height = 350, className = '' }: DataChartProps) {
  const themeClass = theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";

  // Merge height into chart options
  const optionsWithHeight = useMemo(() => ({
    ...chartOptions,
    // a numeric height is applied to the chart; otherwise it fills the container (autoSize is gone in v14)
    height: typeof height === 'number' ? height : undefined,
  }), [chartOptions, height]);

  const containerStyle = useMemo(() => ({
    height: typeof height === 'string' ? height : `${height}px`,
    width: '100%',
  }), [height]);

  return (
    <div
      className={`${themeClass} w-full ${className}`}
      style={containerStyle}
    >
      <AgCharts options={optionsWithHeight} />
    </div>
  );
}