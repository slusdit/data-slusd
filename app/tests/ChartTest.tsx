'use client';
import { AgCharts } from "ag-charts-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { initialData } from "./initialData";

const GroupedGradeChart = () => {
  const { resolvedTheme } = useTheme();
  const baseChartTheme = useMemo(
    () => (resolvedTheme === "dark" ? "ag-sheets-dark" : "ag-sheets"),
    [resolvedTheme]
  );

  // Process the data to create grouped categories
  const processedData = useMemo(() => {
    return initialData.map(record => ({
      ...record,
      // Create an array for grouped categories
      categories: [record.Department, record.Term, record.Teacher]
    }));
  }, []);

    const chartOptions = useMemo(
        () => {
            if (!initialData || !Array.isArray(initialData)) {
                return null;
            }
            return {
                title: { 
                  text: "Grade Distribution by Department, Term, and Teacher",
                  fontSize: 18
                },
                data: processedData,
                theme: {
                  baseTheme: baseChartTheme,
                  palette: {
                    fills: [
                      "#2E86C1", // A - Blue
                      "#5DADE2", // B - Light Blue
                      "#F4D03F", // C - Yellow
                      "#E67E22", // D - Orange
                      "#C0392B", // F - Red
                      "#808080", // Other - Gray
                    ],
                    strokes: ["gray"],
                  },
                },
                series: [
                  {
                    type: "bar",
                    xKey: "categories",
                    yKey: "A%",
                    yName: "A%",
                    stacked: true,
                    tooltip: {
                      renderer: (params) => ({
                        content: `${params.yName}: ${params.value.toFixed(1)}%`,
                      }),
                    },
                  },
                  {
                    type: "bar",
                    xKey: "categories",
                    yKey: "B%",
                    yName: "B%",
                    stacked: true,
                    tooltip: {
                      renderer: (params) => ({
                        content: `${params.yName}: ${params.value.toFixed(1)}%`,
                      }),
                    },
                  },
                  {
                    type: "bar",
                    xKey: "categories",
                    yKey: "C%",
                    yName: "C%",
                    stacked: true,
                    tooltip: {
                      renderer: (params) => ({
                        content: `${params.yName}: ${params.value.toFixed(1)}%`,
                      }),
                    },
                  },
                  {
                    type: "bar",
                    xKey: "categories",
                    yKey: "D%",
                    yName: "D%",
                    stacked: true,
                    tooltip: {
                      renderer: (params) => ({
                        content: `${params.yName}: ${params.value.toFixed(1)}%`,
                      }),
                    },
                  },
                  {
                    type: "bar",
                    xKey: "categories",
                    yKey: "F%",
                    yName: "F%",
                    stacked: true,
                    tooltip: {
                      renderer: (params) => ({
                        content: `${params.yName}: ${params.value.toFixed(1)}%`,
                      }),
                    },
                  },
                  {
                    type: "bar",
                    xKey: "categories",
                    yKey: "Other_Percent",
                    yName: "Other %",
                    stacked: true,
                    tooltip: {
                      renderer: (params) => ({
                        content: `${params.yName}: ${params.value.toFixed(1)}%`,
                      }),
                    },
                  },
                ],
                axes: [
                  {
                    type: "grouped-category",
                    position: "bottom",
                    groupPaddingInner: 0.1,
                    paddingInner: 0.1,
                    label: {
                      rotation: 45,
                    },
                  },
                  {
                    type: "number",
                    position: "left",
                    title: { text: "Grade Distribution (%)" },
                    min: 0,
                    max: 100,
                  },
                ],
                legend: {
                  position: "bottom",
                  spacing: 40,
                },
                container: {
                  padding: {
                    left: 50,
                    right: 50,
                  }
                }
              };
        },
        [baseChartTheme, processedData]
    ); 

  return (
    <div className="w-full h-[800px]">
          <AgCharts options={chartOptions} />
          <pre>{JSON.stringify(chartOptions, null, 2)}</pre>
      </div>
  );
};

export default GroupedGradeChart;