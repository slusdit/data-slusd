"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { colorSchemeDarkBlue, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { GridApi } from "ag-grid-community"; // Import GridApi type
// Import the server action
import {
  getStudentGrades,
  checkGradeDistributionData,
} from "@/lib/prismaActions";

const TeacherStudentGradesDialog = ({
  children,
  teacher,
  sc,
  tn,
  department,
  term,
  courseTitle,
  genderStatus,
  ellStatus,
  specialEdStatus,
  ardStatus,
}: {
  children: React.ReactNode;
  teacher: string;
  sc: number;
  tn: string; // Match the type with the server action parameter
    department: string;
    term?: string;
    courseTitle?: string;
    genderStatus?: string;
  ellStatus?: string;
  specialEdStatus?: string;
  ardStatus?: string;
  }) => {
  console.log("Gender Status2:", genderStatus);
  const [gradeData, setGradeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const { resolvedTheme } = useTheme();
  console.log("TeacherStudentGradesDialog props:", {
    teacher,
    sc,
    tn,
    department,
    term,
    courseTitle,
    genderStatus,
    ellStatus,
    specialEdStatus,
    ardStatus,
  });

  const gridThemeClass = useMemo(() => {
    return resolvedTheme === "dark"
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);
  
  // console.log("Props received:", { sc, tn, term, courseTitle, ellStatus, specialEdStatus, ardStatus });
  
  // Define column definitions for student-level grade data
  const columnDefs = useMemo(
    () => [
      {
        field: "teacherName",
        headerName: "Teacher",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
      },
      {
        field: "term",
        headerName: "Term",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
      },
      {
        field: "studentId",
        headerName: "Student ID",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 125,
      },
      {
        field: "gender",
        headerName: "Gender",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 75,
      },
      {
        field: "studentNumber",
        headerName: "Student #",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 120,
        hide: true,
      },
      {
        field: "courseTitle",
        headerName: "Course Name",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "grade",
        headerName: "Gr",
        filter: true,
        sortable: true,
        minWidth: 75,
        flex: 1,
      },
      {
        field: "courseNumber",
        headerName: "Course #",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 120,
        hide: true,
      },
      {
        field: "section",
        headerName: "Section",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 90,
        hide: true,
      },
      {
        field: "period",
        headerName: "Per.",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 90,
      },
      {
        field: "mark",
        headerName: "Grade",
        filter: true,
        sortable: true,
        minWidth: 100,
        flex: 1,
        cellStyle: (params) => {
          // Apply different colors based on grades
          const grade = params.value;
          if (grade === "A" || grade === "A+" || grade === "A-") {
            return {
              backgroundColor: "rgba(46, 134, 193, 0.2)",
              fontWeight: "bold",
            };
          } else if (grade === "B" || grade === "B+" || grade === "B-") {
            return {
              backgroundColor: "rgba(93, 173, 226, 0.2)",
              fontWeight: "bold",
            };
          } else if (grade === "C" || grade === "C+" || grade === "C-") {
            return {
              backgroundColor: "rgba(244, 208, 63, 0.2)",
              fontWeight: "bold",
            };
          } else if (grade === "D" || grade === "D+" || grade === "D-") {
            return {
              backgroundColor: "rgba(230, 126, 34, 0.2)",
              fontWeight: "bold",
            };
          } else if (grade === "F" || grade === "F+" || grade === "F-") {
            return {
              backgroundColor: "rgba(192, 57, 43, 0.2)",
              fontWeight: "bold",
            };
          }
          return {};
        },
      },
      {
        field: "ell",
        headerName: "ELL",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 80,
      },
      {
        field: "specialEd",
        headerName: "Special Ed",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
      },
      {
        field: "ard",
        headerName: "Race/Ethnicity",
        filter: true,
        sortable: true,
        flex: 1,
        minWidth: 130,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    }),
    []
  );

  // Function to handle grid ready event and capture the grid API
  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  // Export to CSV function
  const exportToCSV = useCallback(() => {
    if (!gridApi) return;

    setExporting(true);

    try {
      const exportParams = {
        skipHeader: false,
        suppressQuotes: true,
        columnSeparator: ",",
        onlyFilteredAndSortedData: true,
        processCellCallback: (params) => {
          // Handle null or undefined values
          if (params.value === null || params.value === undefined) return "";

          // Return numbers as is
          if (typeof params.value === "number") return params.value;

          // Convert other values to string
          return params.value.toString();
        },
        fileName: `${teacher}_Student_Grades_${term || "All"}_${new Date().toISOString().split("T")[0]}.csv`,
      };

      gridApi.exportDataAsCsv(exportParams);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setExporting(false);
    }
  }, [gridApi, teacher, term]);

  useEffect(() => {
    if (open && sc && tn) {
      setLoading(true);
      setError(null);

      const fetchData = async () => {
        try {
          // console.log("Fetching data with params:", {
          //   sc,
          //   tn,
          //   term,
          //   courseTitle,
          // });

          // check if there's any data in the table (for debugging)
          // const dataCheck = await checkGradeDistributionData();
          // console.log("Database check result:", dataCheck);

          const result = await getStudentGrades(sc, tn, term, courseTitle, genderStatus, ellStatus, specialEdStatus, ardStatus);
          // console.log(
          //   "Student grade data retrieved:",
          //   result?.length || 0,
          //   "records"
          // );

          setGradeData(Array.isArray(result) ? result : []);
        } catch (error) {
          console.error("Error fetching student grade data:", error);
          setError(error.message || "Failed to load data");
          setGradeData([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [open, sc, tn, term, courseTitle]);

  // Calculate summary statistics
  const gradeSummary = useMemo(() => {
    if (!gradeData || gradeData.length === 0) return null;

    const grades = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
      Other: 0,
      Total: gradeData.length,
    };

    gradeData.forEach((student) => {
      const mark = student.mark?.charAt(0) || "Other";
      if (["A", "B", "C", "D", "F"].includes(mark)) {
        grades[mark]++;
      } else {
        grades.Other++;
      }
    });

    return grades;
  }, [gradeData]);

  return (
    <Dialog open={open} onOpenChange={setOpen} className="w-full h-full">
      <DialogTrigger className="hover:underline text-left hover:text-primary">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">
              {teacher} - Student Grade Details
              {courseTitle && ` - ${courseTitle}`}
              {term && ` (${term})`}
            </DialogTitle>
            <Button
              onClick={exportToCSV}
              className="bg-primary mr-6 text-primary-foreground hover:bg-primary/90"
              disabled={loading || exporting || !gradeData?.length}
            >
              {exporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                "Export to CSV"
              )}
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            {gradeSummary && (
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-blue-600">A: {gradeSummary.A}</Badge>
                <Badge className="bg-green-600">B: {gradeSummary.B}</Badge>
                <Badge className="bg-yellow-500">C: {gradeSummary.C}</Badge>
                <Badge className="bg-orange-500">D: {gradeSummary.D}</Badge>
                <Badge className="bg-red-600">F: {gradeSummary.F}</Badge>
                {gradeSummary.Other > 0 && (
                  <Badge className="bg-gray-600">
                    Other: {gradeSummary.Other}
                  </Badge>
                )}
                <Badge variant="outline">Total: {gradeSummary.Total}</Badge>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center h-60 w-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm font-medium">Loading student data...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                <p>Error: {error}</p>
                <p className="text-sm mt-2">
                  Please try again or contact support if the issue persists.
                </p>
              </div>
            ) : gradeData.length > 0 ? (
              <div style={{ height: "75vh", width: "90vw", maxWidth: "1400px" }}>
                <AgGridReact
                  theme={gridThemeClass}
                  rowData={gradeData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  pagination={true}
                  paginationPageSize={20}
                  domLayout="autoHeight"
                      onGridReady={onGridReady}
                      className="max-h-full"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No student grade data available for this teacher.
                <p className="text-sm mt-2">
                  Parameters: School: {sc}, Teacher: {tn}
                  {term && `, Term: ${term}`}
                  {courseTitle && `, Course: ${courseTitle}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherStudentGradesDialog;