'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AgCharts } from 'ag-charts-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import TeacherGradesDialog from './TeacherGradesDialog';
import { Button } from '@/components/ui/button';
import { themeQuartz } from 'ag-grid-enterprise';

const PercentCellRenderer = (props) => {
  const value = props.value;
  return (
    <TeacherGradesDialog 
      teacher={props.data.Teacher}
      sc={props.data.SC}
      tn={props.data.TN}
      params={props}
      colField={props.colDef.field}
    >
      {value}%
    </TeacherGradesDialog>
  );
};

const GradeDistribution = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [gridApi, setGridApi] = useState(null);
  const { resolvedTheme } = useTheme();
  const baseChartTheme = useMemo(() => (resolvedTheme === 'dark' ? 'ag-sheets-dark' : 'ag-sheets'), [resolvedTheme]);

  const gridThemeClass = useMemo(() => {
    console.log(resolvedTheme);
    return resolvedTheme === 'dark' 
      ? 'ag-theme-quartz-dark' 
      : 'ag-theme-quartz';
  }, [resolvedTheme]);
  console.log(gridThemeClass);
  // Rest of the component remains the same...
  const exportToCSV = useCallback(() => {
    if (!gridApi) return;

    const exportParams = {
      skipHeader: false,
      suppressQuotes: true,
      columnSeparator: ',',
      onlyFilteredAndSortedData: true,
      processCellCallback: (params) => {
        if (params.value === null || params.value === undefined) return '';
        if (typeof params.value === 'number') return params.value;
        return params.value.toString();
      },
      fileName: `Grade_Distribution_${new Date().toISOString().split('T')[0]}.csv`
    };

    gridApi.exportDataAsCsv(exportParams);
  }, [gridApi]);

  const columnDefs = useMemo(() => [
    {
      field: 'Teacher',
      filter: true,
      sortable: true,
      width: 225,
      filterParams: {
        buttons: ['reset', 'apply'],
        closeOnApply: true
      }
    },
    {
      field: 'Department',
      filter: 'agSetColumnFilter',
      sortable: true,
      filterParams: {
        buttons: ['reset', 'apply'],
        closeOnApply: true
      }
    },
    {
      field: 'A%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer,
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'B%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer,
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'C%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'D%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'F%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'Other_Percent',
      type: 'numericColumn', 
      headerName: 'Other %',
      cellRenderer: (props) => `${props.value}%`,
      filter: 'agNumberColumnFilter'
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true
  }), []);

  const chartOptions = useMemo(() => ({
    title: { text: 'Grade Distribution by Teacher' },
    data: filteredData,
    theme: {
      baseTheme: baseChartTheme,
      palette: { 
        fills: ['#2E86C1','#5DADE2','#F4D03F','#E67E22','#C0392B','#000000'],
        strokes: ['gray'], 
      },
    },
    series: [
      { type: 'bar', xKey: 'Teacher', yKey: 'A%', yName: 'A%', stacked: true },
      { type: 'bar', xKey: 'Teacher', yKey: 'B%', yName: 'B%', stacked: true },
      { type: 'bar', xKey: 'Teacher', yKey: 'C%', yName: 'C%', stacked: true }, 
      { type: 'bar', xKey: 'Teacher', yKey: 'D%', yName: 'D%', stacked: true },
      { type: 'bar', xKey: 'Teacher', yKey: 'F%', yName: 'F%', stacked: true },
      { type: 'bar', xKey: 'Teacher', yKey: 'Other_Percent', yName: 'Other %', stacked: true }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          rotation: 45,
        },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Grade Distribution (%)' },
        min: 0,
        max: 100
      }
    ]
  }), [filteredData, baseChartTheme]);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }, []);

  const updateChartData = useCallback((params) => {
    const sortedData = [];
    params.api.forEachNodeAfterFilterAndSort((node) => {
      sortedData.push(node.data);
    });
    setFilteredData(sortedData);
  }, []);

  const onFilterChanged = useCallback((params) => {
    updateChartData(params);
  }, [updateChartData]);

  const onSortChanged = useCallback((params) => {
    updateChartData(params);
  }, [updateChartData]);

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <AgCharts options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Grade Distribution Data</CardTitle>
            <Button
              onClick={exportToCSV}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Export to CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`h-[600px] w-full `}>
            <AgGridReact
              theme={themeQuartz}
              rowData={data}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              onFilterChanged={onFilterChanged}
              onSortChanged={onSortChanged}
              animateRows={true}
              pagination={true}

            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeDistribution;