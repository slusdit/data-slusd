import { ChartOptionsProps } from "@/types/types";

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
  }: ChartOptionsProps) {
    const agTheme = 'ag-polychroma';
    
    const baseChartOptions = {
      autoSize: true,
      title: {
        text: chartTitle || "Data Chart",
      },
      theme: theme === "dark" ? `${agTheme}-dark` : `${agTheme}`,
      data: rowData,
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
  
    if (visibleColumns && chartYKeyArray.length > 0) {
      chartYKeyArray = chartYKeyArray.filter(key => 
        visibleColumns.includes(key.trim())
      );
    }
  
  if (chartYKeyArray.length > 0) {
      const finalChartOptions = {
        ...baseChartOptions,
        series: chartYKeyArray.map((key) => ({
          type: chartTypeKey || "bar",
          xKey: chartXKey || "SC",
          yKey: chartYKey || "ID",
          stacked: chartStackKey || false,
          cornerRadius: 5
        }
      )),
    };
    console.log("finalChartOptions", finalChartOptions);
    return finalChartOptions;
    }
    
    return baseChartOptions;
  }