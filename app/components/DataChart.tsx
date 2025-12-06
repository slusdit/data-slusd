'use client';
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
    height: typeof height === 'number' ? height : undefined,
    autoSize: typeof height !== 'number', // Only autoSize if height is not a number
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