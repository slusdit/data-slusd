'use client'
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AgCharts } from 'ag-charts-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { runQuery } from '@/lib/aeries';
import TeacherGradesDialog from './TeacherGradesDialog';



const PercentCellRenderer = (props) => {
  const value = props.value;
  const count = Math.round((value / 100) * props.data.Total_Marks);
  
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
    const [hoveredTeacher, setHoveredTeacher] = useState(null);
    const { theme } = useTheme();


  const columnDefs = useMemo(() => [
    {
      field: 'Teacher',
      filter: true,
      sortable: true
    },
    {
      field: 'A%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer
    },
    {
      field: 'B%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer
    },
    {
      field: 'C%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer
    },
    { 
      field: 'D%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer },
    { 
      field: 'F%',
      type: 'numericColumn',
      cellRenderer: PercentCellRenderer },
    { 
      field: 'Other_Percent',
      type: 'numericColumn', headerName: 'Other %',
      cellRenderer: PercentCellRenderer },
    // { 
    //   field: 'Total_Marks',
    //   type: 'numericColumn',
    //    }
  ]);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true
  }));

  const chartOptions = {
    title: { text: 'Grade Distribution by Teacher' },
    data: data,
    theme: `ag-sheets${theme === 'dark' ? '-dark' : ''}`,
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
  };

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onChartHover = useCallback((event) => {
    if (event?.datum?.Teacher) {
      setHoveredTeacher(event.datum.Teacher);
      // Here you would trigger the query to fetch class breakdown
      console.log(`Fetch class breakdown for teacher: ${event.datum.TN}`);
    }
  }, []);

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }} className={`ag-sheets${theme === 'dark' ? '-dark' : ''}`}>
            <AgCharts options={chartOptions} onNodeClick={onChartHover} theme={`ag-sheets${theme === 'dark' ? '-dark' : ''}`} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '600px' }} className={`ag-theme-alpine${theme === 'dark' ? '-dark' : ''}`}>
            <AgGridReact
              rowData={data}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
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