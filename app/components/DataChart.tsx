'use client';
import { AgCharts } from "ag-charts-react";

interface DataChartProps {
  chartOptions: any;
  theme?: string;
}

export function DataChart({ chartOptions, theme = 'light' }: DataChartProps) {
    console.log(chartOptions);
    console.log(theme);
  const agTheme = "ag-polychroma";
    const themeClass = theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";
    
    console.log

  return (
    <div className={`${themeClass} w-full h-full border-b-2 border-muted/20 pb-4`}>
      <AgCharts options={chartOptions} />
    </div>
  );
}