"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import TeacherGradesDialog from "./TeacherGradesDialog";
import { Button } from "@/components/ui/button";
import {
  colorSchemeDarkBlue,
  SideBarDef,
  themeQuartz,
} from "ag-grid-enterprise";
import { GridApi } from "ag-grid-community"; // Import GridApi type
import { generatePaginationOptions } from "@/lib/utils";
import MultiDropdownSelector from "./MultiDropdownSelector";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
// Import the aggregateTeacherGradeSummaries function
import { aggregateTeacherGradeSummaries } from "@/lib/syncGradeDistribution";
import SyncGradeDistributionButton from "./SyncGradeDistributionButton";
import { Separator } from "@/components/ui/separator";
const PercentCellRenderer = (props) => {
  const value = props.value;
  if (value === null || value === undefined) return "0%";

  return (
    <TeacherGradesDialog
      teacher={props.data?.teacherName || ""}
      sc={props.data?.sc || ""}
      tn={props.data?.tn || ""}
      department={props.data?.department || ""}
      params={props}
      colField={props.colDef.field}
    >
      {value.toFixed(1)}%
    </TeacherGradesDialog>
  );
};

interface StudentAttributes {
  ellOptions?: string[];
  specialEdOptions?: string[];
  ardOptions?: string[];
}

interface GradeDistribution2Props {
  data: any[];
  isLoading?: boolean;
  studentAttributes?: StudentAttributes;
}

const GradeDistribution2 = ({
  data: initialData,
  isLoading = false,
  studentAttributes = {
    ellOptions: [],
    specialEdOptions: [],
    ardOptions: []
  }
}: GradeDistribution2Props) => {
  const [data, setData] = useState(initialData || []);
  const [filteredData, setFilteredData] = useState(initialData || []);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCourseTitles, setSelectedCourseTitles] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [selectedEll, setSelectedEll] = useState<string[]>([]);
  const [selectedSpecialEd, setSelectedSpecialEd] = useState<string[]>([]);
  const [selectedArd, setSelectedArd] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { resolvedTheme } = useTheme();
  const chartRef = React.useRef(null);

  const baseChartTheme = useMemo(
    () => (resolvedTheme === "dark" ? "ag-sheets-dark" : "ag-sheets"),
    [resolvedTheme]
  );

  // Generate pagination options based on total data size
  const paginationPageSizes = useMemo(() => {
    return generatePaginationOptions(data?.length || 0);
  }, [data?.length]);

  const gridThemeClass = useMemo(() => {
    return resolvedTheme === "dark"
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);

  // Helper function to get teacher number from teacher name
  const getTeacherNumberFromName = useCallback((teacherName) => {
    if (!initialData || initialData.length === 0) return undefined;

    const teacher = initialData.find(item => item.teacherName === teacherName);
    return teacher ? teacher.tn : undefined;
  }, [initialData]);

  // Custom tooltip for enhanced chart tooltips
  const CustomTooltip = useCallback((params) => {
    const { datum, xKey, yKey, yName } = params;

    if (!datum) return null;

    const grade = yName.replace('%', '');
    const countField = `${grade.toLowerCase()}Count`;
    const percentField = `${grade.toLowerCase()}Percent`;

    const count = datum[countField] || 0;
    const percent = datum[percentField] ? Number(datum[percentField]).toFixed(1) : '0.0';
    const totalStudents = datum.totalGrades || 0;

    // Create the HTML content
    return {
      title: `${datum.teacherName} - ${datum.courseTitle || 'Unknown Course'}`,
      content: `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <strong>${grade} Grade:</strong> <span>${percent}%</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>Students with ${grade}:</span> <span>${count}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Total Students:</span> <span>${totalStudents}</span>
        </div>
      `
    };
  }, []);

  // Update internal data when props change
  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setFilteredData(initialData);
    }
  }, [initialData]);

  // Update effect for handling filter changes
  useEffect(() => {
    if (!initialData || isLoading) return;

    setIsProcessing(true);

    try {
      let result = initialData;

      if (selectedTeachers.length > 0) {
        result = result.filter(item => selectedTeachers.includes(item.teacherName));
      }

      if (selectedDepartments.length > 0) {
        result = result.filter(item => selectedDepartments.includes(item.department));
      }

      if (selectedCourseTitles.length > 0) {
        result = result.filter(item => selectedCourseTitles.includes(item.courseTitle));
      }

      if (selectedTerms.length > 0) {
        result = result.filter(item => selectedTerms.includes(item.term));
      }

      if (selectedEll.length > 0) {
        result = result.filter(item => selectedEll.includes(item.ell));
      }

      if (selectedSpecialEd.length > 0) {
        result = result.filter(item => selectedSpecialEd.includes(item.specialEd));
      }

      if (selectedArd.length > 0) {
        result = result.filter(item => selectedArd.includes(item.ard));
      }

      setData(result);

      // Update chart data when filters change
      setFilteredData(result);

      // Apply filters to grid if it exists
      // if (gridApi) {
      //   gridApi.setRowData(result);
      // }

      // Run the aggregation function with the current filters
      aggregateTeacherGradeSummaries({
        term: selectedTerms.length > 0 ? selectedTerms : undefined,
        teacherNumber: selectedTeachers.length > 0 ?
          selectedTeachers.map(teacher => getTeacherNumberFromName(teacher)).filter(Boolean) :
          undefined,
        departmentCode: selectedDepartments.length > 0 ? selectedDepartments : undefined,
        courseTitle: selectedCourseTitles.length > 0 ? selectedCourseTitles : undefined,
        ell: selectedEll.length > 0 ? selectedEll : undefined,
        specialEd: selectedSpecialEd.length > 0 ? selectedSpecialEd : undefined,
        ard: selectedArd.length > 0 ? selectedArd : undefined,
      });
    } catch (error) {
      console.error("Error filtering data:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [
    selectedTeachers,
    selectedDepartments,
    selectedCourseTitles,
    selectedTerms,
    selectedEll,
    selectedSpecialEd,
    selectedArd,
    initialData,
    gridApi,
    isLoading,
    getTeacherNumberFromName
  ]);

  const exportToCSV = useCallback(() => {
    if (!gridApi) return;

    setIsProcessing(true);

    try {
      const exportParams = {
        skipHeader: false,
        suppressQuotes: true,
        columnSeparator: ",",
        onlyFilteredAndSortedData: true,
        processCellCallback: (params) => {
          // Handle null or undefined values
          if (params.value === null || params.value === undefined) return "";

          // Format percentages to 1 decimal place
          if (params.column.colDef.headerName &&
            (params.column.colDef.headerName.includes('%') ||
              ['aPercent', 'bPercent', 'cPercent', 'dPercent', 'fPercent', 'otherPercent'].includes(params.column.colDef.field))) {
            return Number(params.value).toFixed(1);
          }

          // Return numbers as is
          if (typeof params.value === "number") return params.value;

          // Convert other values to string
          return params.value.toString();
        },
        fileName: `Grade_Distribution_${new Date().toISOString().split("T")[0]}.csv`,
      };

      gridApi.exportDataAsCsv(exportParams);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [gridApi]);

  // Updated column definitions to match your data structure
  const columnDefs = useMemo(
    () => [
      {
        field: "teacherName",
        headerName: "Teacher",
        filter: true,
        sortable: true,
        floatingFilter: true,
        flex: 2,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "department",
        headerName: "Department",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "term",
        headerName: "Term",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "courseTitle",
        headerName: "Course",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1.5,
        pivot: true,
        enableRowGroup: true,
      },
      {
        field: "aPercent",
        headerName: "A%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) => params.value ? params.value.toFixed(1) : '',
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "bPercent",
        headerName: "B%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) => params.value ? params.value.toFixed(1) : '',
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "cPercent",
        headerName: "C%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) => params.value ? params.value.toFixed(1) : '',
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "dPercent",
        headerName: "D%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) => params.value ? params.value.toFixed(1) : '',
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "fPercent",
        headerName: "F%",
        type: "numericColumn",
        cellRenderer: PercentCellRenderer,
        valueFormatter: (params) => params.value ? params.value.toFixed(1) : '',
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "otherPercent",
        headerName: "Other %",
        type: "numericColumn",
        cellRenderer: (props) => `${props.value ? props.value.toFixed(1) : 0}%`,
        filter: "agNumberColumnFilter",
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "totalGrades",
        headerName: "Total",
        type: "numericColumn",
        filter: "agNumberColumnFilter",
        floatingFilter: true,
        flex: 1,
        pivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      {
        field: "ell",
        headerName: "ELL",
        filter: true,
        sortable: true,
        floatingFilter: true,
        flex: 0.8,
        pivot: true,
        enableRowGroup: true,
        cellRenderer: (params) => {
          if (!params.value) return '';
          return params.value === 'Y' ? 'Yes' : 'No';
        },
      },
      {
        field: "specialEd",
        headerName: "Special Ed",
        filter: true,
        sortable: true,
        floatingFilter: true,
        flex: 0.8,
        pivot: true,
        enableRowGroup: true,
        cellRenderer: (params) => {
          if (!params.value) return '';
          return params.value === 'Y' ? 'Yes' : 'No';
        },
      },
      {
        field: "ard",
        headerName: "ARD",
        filter: true,
        sortable: true,
        floatingFilter: true,
        flex: 0.8,
        pivot: true,
        enableRowGroup: true,
        cellRenderer: (params) => {
          if (!params.value) return '';
          return params.value === 'Y' ? 'Yes' : 'No';
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 100,
    }),
    []
  );

  const cellSelection = useMemo(() => {
    return true;
  }, []);

  // Updated chart options configuration to match your data structure
  const chartOptions = useMemo(
    () => ({
      title: {
        text: `Grade Distribution by Teacher${selectedDepartments.length === 1 ? ` - ${selectedDepartments[0]}` :
          selectedDepartments.length > 1 ? ` - Multiple Departments` : ''
          }${
            selectedCourseTitles.length === 1 ? ` for ${selectedCourseTitles[0]}` :
            selectedCourseTitles.length > 1 ? ` for Multiple Courses` : ''
          }${selectedTerms.length === 1 ? ` (${selectedTerms[0]})` :
            selectedTerms.length > 1 ? ` (Multiple Terms)` : ''
          }${(selectedEll.length > 0 || selectedSpecialEd.length > 0 || selectedArd.length > 0) ?
            ' [' +
            [
              selectedEll.length > 0 ? 'ELL' : '',
              selectedSpecialEd.length > 0 ? 'SpecialEd' : '',
              selectedArd.length > 0 ? 'ARD' : ''
            ].filter(Boolean).join('/') +
            ' Students]' : ''
          }`
      },
      data: filteredData,
      theme: {
        baseTheme: baseChartTheme,
        palette: {
          fills: [
            "#2E86C1",  // A - Blue
            "#5DADE2",  // B - Light Blue
            "#F4D03F",  // C - Yellow
            "#E67E22",  // D - Orange
            "#C0392B",  // F - Red
            "#7F8C8D",  // Other - Gray
          ],
          strokes: ["gray"],
        },
      },
      series: [
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "aPercent",
          yName: "A%",
          stacked: true,
          tooltip: { renderer: CustomTooltip }
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "bPercent",
          yName: "B%",
          stacked: true,
          tooltip: { renderer: CustomTooltip }
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "cPercent",
          yName: "C%",
          stacked: true,
          tooltip: { renderer: CustomTooltip }
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "dPercent",
          yName: "D%",
          stacked: true,
          tooltip: { renderer: CustomTooltip }
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "fPercent",
          yName: "F%",
          stacked: true,
          tooltip: { renderer: CustomTooltip }
        },
        {
          type: "bar",
          xKey: "teacherName",
          yKey: "otherPercent",
          yName: "Other%",
          stacked: true,
          tooltip: { renderer: CustomTooltip }
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
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
      padding: {
        top: 10,
        right: 20,
        bottom: 40,
        left: 40,
      },
      navigator: {
        enabled: filteredData.length > 10,
        height: 30,
        min: 0,
        max: 1,
      },
    }),
    [filteredData, baseChartTheme, selectedDepartments, selectedTerms, selectedEll, selectedSpecialEd, selectedArd, CustomTooltip]
  );

  const onGridSizeChanged = useCallback((params) => {
    const gridWidth = document.querySelector(".ag-center-cols")?.clientWidth;
    if (gridWidth) {
      params.api.sizeColumnsToFit();
    }
  }, []);

  const updateChartData = useCallback((params) => {
    setIsProcessing(true);
    try {
      const sortedData = [];
      params.api.forEachNodeAfterFilterAndSort((node) => {
        sortedData.push(node.data);
      });

      // Update the chart data when grid filters change
      setFilteredData(sortedData);

      // Create title sections for each filter type
      const departmentSection = selectedDepartments.length === 1
        ? ` - ${selectedDepartments[0]}`
        : selectedDepartments.length > 1 ? ` - Multiple Departments` : '';

      const termSection = selectedTerms.length === 1
        ? ` (${selectedTerms[0]})`
        : selectedTerms.length > 1 ? ` (Multiple Terms)` : '';

      const studentFilters = [];
      if (selectedEll.length > 0) studentFilters.push('ELL');
      if (selectedSpecialEd.length > 0) studentFilters.push('SpecialEd');
      if (selectedArd.length > 0) studentFilters.push('ARD');

      const studentSection = studentFilters.length > 0
        ? ` [${studentFilters.join('/')} Students]`
        : '';

      // Update the chart options to ensure it refreshes
      const updatedOptions = {
        ...chartOptions,
        data: sortedData,
        title: {
          text: `Grade Distribution by Teacher${departmentSection}${termSection}${studentSection}`
        }
      };

      // Force chart update by temporarily setting to null and then to new data
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.updateData(sortedData);
      }
    } catch (error) {
      console.error("Error updating chart data:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [chartOptions, selectedDepartments, selectedTerms, selectedEll, selectedSpecialEd, selectedArd]);

  const onFilterChanged = useCallback(
    (params) => {
      updateChartData(params);

      // Run the aggregation with grid filters
      // This captures filters applied directly in the grid
      try {
        const model = params.api.getFilterModel();
        const filterProps = {};

        if (model.teacherName) {
          // For complex grid filter models, we may need to extract values differently
          const teacherNames = model.teacherName.values ||
            (model.teacherName.filter ? [model.teacherName.filter] : []);

          if (teacherNames.length > 0) {
            filterProps.teacherNumber = teacherNames.map(name =>
              getTeacherNumberFromName(name)).filter(Boolean);
          }
        }

        if (model.department) {
          const departments = model.department.values ||
            (model.department.filter ? [model.department.filter] : []);

          if (departments.length > 0) {
            filterProps.departmentCode = departments;
          }
        }

        if (model.term) {
          const terms = model.term.values ||
            (model.term.filter ? [model.term.filter] : []);

          if (terms.length > 0) {
            filterProps.term = terms;
          }
        }

        if (model.ell) {
          const ellValues = model.ell.values ||
            (model.ell.filter ? [model.ell.filter] : []);

          if (ellValues.length > 0) {
            filterProps.ell = ellValues;
          }
        }

        if (model.specialEd) {
          const specialEdValues = model.specialEd.values ||
            (model.specialEd.filter ? [model.specialEd.filter] : []);

          if (specialEdValues.length > 0) {
            filterProps.specialEd = specialEdValues;
          }
        }

        if (model.ard) {
          const ardValues = model.ard.values ||
            (model.ard.filter ? [model.ard.filter] : []);

          if (ardValues.length > 0) {
            filterProps.ard = ardValues;
          }
        }

        aggregateTeacherGradeSummaries(filterProps);
      } catch (error) {
        console.error("Error aggregating based on grid filters:", error);
      }
    },
    [updateChartData, getTeacherNumberFromName]
  );

  const onSortChanged = useCallback(
    (params) => {
      updateChartData(params);
    },
    [updateChartData]
  );

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gridApi]);

  const resetFilters = useCallback(() => {
    setIsProcessing(true);
    try {
      setSelectedTeachers([]);
      setSelectedDepartments([]);
      setSelectedTerms([]);
      setSelectedEll([]);
      setSelectedSpecialEd([]);
      setSelectedArd([]);

      // Reset filtered data to show all records
      setFilteredData(initialData || []);

      // Run the aggregation with no filters when resetting
      aggregateTeacherGradeSummaries({});

      // Also reset the grid filters if the grid API is available
      if (gridApi) {
        gridApi.setFilterModel(null);
      }

      // Update chart if reference exists
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.updateData(initialData || []);
      }
    } catch (error) {
      console.error("Error resetting filters:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [gridApi, initialData]);

  const teacherItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];

    // Get unique teachers sorted alphabetically
    const uniqueTeachers = [...new Set(initialData.map(item => item.teacherName))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return uniqueTeachers.map(teacher => ({
      id: teacher,
      label: teacher
    }));
  }, [initialData]);

  const departmentItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];

    // Get unique departments sorted alphabetically
    const uniqueDepartments = [...new Set(initialData.map(item => item.department))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return uniqueDepartments.map(department => ({
      id: department,
      label: department
    }));
  }, [initialData]);

  const courseTitleItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];

    const uniqueCourseTitles = [...new Set(initialData.map(item => item.courseTitle))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return uniqueCourseTitles.map(courseTitle => ({
      id: courseTitle,
      label: courseTitle
    }));
  }, [initialData]);

  const termItems = useMemo(() => {
    if (!initialData || initialData.length === 0) return [];


    const uniqueTerms = [...new Set(initialData.map(item => item.term))]
      .filter(Boolean);


    uniqueTerms.sort((a, b) => {

      const aMatch = a.match(/(\D+)(\d+)/);
      const bMatch = b.match(/(\D+)(\d+)/);

      if (aMatch && bMatch && aMatch[1] === bMatch[1]) {
        return parseInt(aMatch[2]) - parseInt(bMatch[2]);
      }


      return a.localeCompare(b);
    });


    return uniqueTerms.map(term => ({
      id: term,
      label: term
    }));
  }, [initialData]);


  const ellItems = useMemo(() => {

    const options = studentAttributes.ellOptions && studentAttributes.ellOptions.length > 0
      ? studentAttributes.ellOptions
      : ['Y', 'N'];


    return options.map(value => ({
      id: value,
      label: value
    }));
  }, [studentAttributes.ellOptions]);

  const specialEdItems = useMemo(() => {

    const options = studentAttributes.specialEdOptions && studentAttributes.specialEdOptions.length > 0
      ? studentAttributes.specialEdOptions
      : ['Y', 'N'];


    return options.map(value => ({
      id: value,
      label: value
    }));
  }, [studentAttributes.specialEdOptions]);

  const ardItems = useMemo(() => {

    const options = studentAttributes.ardOptions && studentAttributes.ardOptions.length > 0
      ? studentAttributes.ardOptions
      : ['Y', 'N'];


    return options.map(value => ({
      id: value,
      label: value
    }));
  }, [studentAttributes.ardOptions]);

  // Determine if we should show loading state
  const showLoading = isLoading || isProcessing;

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading data...</p>
      </div>
    </div>
  );

  // Initial aggregation on component mount
  useEffect(() => {
    if (initialData && initialData.length > 0 && !isLoading) {
      aggregateTeacherGradeSummaries({});
    }
  }, [initialData, isLoading]);

  return (
    <div className="w-full space-y-4 relative">
      {showLoading && <LoadingOverlay />}
      <SyncGradeDistributionButton />
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <MultiDropdownSelector
                  items={teacherItems}
                  values={selectedTeachers}
                  onChange={setSelectedTeachers}
                  placeholder="Select teachers"
                  label="Teachers"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={2}
                />

                <MultiDropdownSelector
                  items={departmentItems}
                  values={selectedDepartments}
                  onChange={setSelectedDepartments}
                  placeholder="Select departments"
                  label="Departments"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={1}
                />
                <MultiDropdownSelector
                  items={courseTitleItems}
                  values={selectedCourseTitles}
                  onChange={setSelectedCourseTitles}
                  placeholder="Select Courses"
                  label="Courses"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={1}
                />

                <MultiDropdownSelector
                  items={termItems}
                  values={selectedTerms}
                  onChange={setSelectedTerms}
                  placeholder="Select terms"
                  label="Terms"
                  width="w-full"
                  disabled={showLoading}
                  maxDisplayItems={2}
                />
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <MultiDropdownSelector
                  items={ellItems}
                  values={selectedEll}
                  onChange={setSelectedEll}
                  placeholder="Select ELL status"
                  label="ELL Status"
                  width="w-full"
                  disabled={showLoading || ellItems.length === 0}
                  maxDisplayItems={1}
                />

                <MultiDropdownSelector
                  items={specialEdItems}
                  values={selectedSpecialEd}
                  onChange={setSelectedSpecialEd}
                  placeholder="Select Special Ed status"
                  label="Special Ed Status"
                  width="w-full"
                  disabled={showLoading || specialEdItems.length === 0}
                  maxDisplayItems={1}
                />

                <MultiDropdownSelector
                  items={ardItems}
                  values={selectedArd}
                  onChange={setSelectedArd}
                  placeholder="Select ARD status"
                  label="ARD Status"
                  width="w-full"
                  disabled={showLoading || ardItems.length === 0}
                  maxDisplayItems={1}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {selectedTeachers.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Teachers:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedTeachers.map(teacherId => {
                        const teacher = teacherItems.find(t => t.id === teacherId);
                        return (
                          <Badge key={teacherId} variant="outline" className="text-xs py-0">
                            {teacher?.label || teacherId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedDepartments.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Departments:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedDepartments.map(deptId => {
                        const dept = departmentItems.find(d => d.id === deptId);
                        return (
                          <Badge key={deptId} variant="outline" className="text-xs py-0">
                            {dept?.label || deptId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedCourseTitles.length > 0 && (
                  <div className="flex items-center">

                    <span className="text-sm mr-1">Courses:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCourseTitles.map(courseId => {
                        const course = courseTitleItems.find(c => c.id === courseId);
                        return (
                          <Badge key={courseId} variant="outline" className="text-xs py-0">
                            {course?.label || courseId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedTerms.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Terms:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedTerms.map(termId => {
                        const term = termItems.find(t => t.id === termId);
                        return (
                          <Badge key={termId} variant="outline" className="text-xs py-0">
                            {term?.label || termId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedEll.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">ELL:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedEll.map(ellId => {
                        const ell = ellItems.find(e => e.id === ellId);
                        return (
                          <Badge key={ellId} variant="outline" className="text-xs py-0">
                            {ell?.label || ellId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedSpecialEd.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">Special Ed:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedSpecialEd.map(specialEdId => {
                        const specialEd = specialEdItems.find(s => s.id === specialEdId);
                        return (
                          <Badge key={specialEdId} variant="outline" className="text-xs py-0">
                            {specialEd?.label || specialEdId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedArd.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm mr-1">ARD:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedArd.map(ardId => {
                        const ard = ardItems.find(a => a.id === ardId);
                        return (
                          <Badge key={ardId} variant="outline" className="text-xs py-0">
                            {ard?.label || ardId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="ml-auto">
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="ml-2"
                    disabled={showLoading}
                  >
                    {showLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      'Reset Filters'
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-[250px] w-full" />
            </div>
          ) : (
            <div className="h-[500px] relative">
              <AgCharts 
              options={chartOptions} 
              ref={chartRef} 
              style={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
        </CardContent>
      </Card>



      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Grade Distribution Data</CardTitle>
            <Button
              onClick={exportToCSV}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={showLoading || !data?.length}
            >
              {showLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                'Export to CSV'
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[600px] w-full">
              <Skeleton className="h-full w-full" />
            </div>
          ) : (
            <div className="h-[600px] w-full relative">
              <AgGridReact
                theme={gridThemeClass}
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                onGridSizeChanged={onGridSizeChanged}
                onFilterChanged={onFilterChanged}
                onSortChanged={onSortChanged}
                animateRows={true}
                pagination={true}
                paginationPageSizeSelector={paginationPageSizes}
                paginationPageSize={data?.length > 20 ? data.length : 20}
                enableCharts={true}
                cellSelection={cellSelection}
                pivotMode={false}
                pivotPanelShow="onlyWhenPivoting"
                sideBar={["columns", "filters"]}
                loadingOverlayComponent="Loading..."
                loadingOverlayComponentParams={{ loadingMessage: "Loading data..." }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeDistribution2;