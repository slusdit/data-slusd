"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { runQuery } from "@/lib/aeries";
import { colorSchemeDarkBlue, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

const TeacherStudentGradesDialog = ({
  children,
  teacher,
  sc,
  tn,
  department,
  term,
  courseTitle,
}: {
  children: React.ReactNode;
  teacher: string;
  sc: number;
  tn: string; // Change type to string to match the model
  department: string;
  term?: string;
  courseTitle?: string;
}) => {
  const [gradeData, setGradeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  
  const gridThemeClass = useMemo(() => {
    return resolvedTheme === 'dark'
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);

  // Define column definitions for student-level grade data
  const columnDefs = useMemo(() => [
    {
      field: "studentId",
      headerName: "Student ID",
      filter: true,
      sortable: true,
      minWidth: 120,
    },
    {
      field: "studentNumber",
      headerName: "Student #",
      filter: true,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "term",
      headerName: "Term",
      filter: true,
      sortable: true,
      minWidth: 100,
    },
    {
      field: "courseTitle",
      headerName: "Course",
      filter: true,
      sortable: true,
      minWidth: 200,
      flex: 1,
    },
    {
      field: "courseNumber",
      headerName: "Course #",
      filter: true,
      sortable: true,
      minWidth: 120,
    },
    {
      field: "section",
      headerName: "Section",
      filter: true,
      sortable: true,
      minWidth: 90,
    },
    {
      field: "period",
      headerName: "Period",
      filter: true,
      sortable: true,
      minWidth: 90,
    },
    {
      field: "mark",
      headerName: "Grade",
      filter: true,
      sortable: true,
      minWidth: 90,
      cellStyle: (params) => {
        // Apply different colors based on grades
        const grade = params.value;
        if (grade === 'A' || grade === 'A+' || grade === 'A-') {
          return { backgroundColor: 'rgba(46, 134, 193, 0.2)', fontWeight: 'bold' };
        } else if (grade === 'B' || grade === 'B+' || grade === 'B-') {
          return { backgroundColor: 'rgba(93, 173, 226, 0.2)', fontWeight: 'bold' };
        } else if (grade === 'C' || grade === 'C+' || grade === 'C-') {
          return { backgroundColor: 'rgba(244, 208, 63, 0.2)', fontWeight: 'bold' };
        } else if (grade === 'D' || grade === 'D+' || grade === 'D-') {
          return { backgroundColor: 'rgba(230, 126, 34, 0.2)', fontWeight: 'bold' };
        } else if (grade === 'F' || grade === 'F+' || grade === 'F-') {
          return { backgroundColor: 'rgba(192, 57, 43, 0.2)', fontWeight: 'bold' };
        }
        return {};
      }
    },
    {
      field: "grade",
      headerName: "Student Grade",
      filter: true,
      sortable: true,
      minWidth: 90,
    },
    {
      field: "ell",
      headerName: "ELL",
      filter: true,
      sortable: true,
      minWidth: 80,
      cellRenderer: (params) => {
        return params.value === 'Y' ? 
          <Badge className="bg-blue-500">ELL</Badge> : 
          '';
      }
    },
    {
      field: "specialEd",
      headerName: "Special Ed",
      filter: true,
      sortable: true,
      minWidth: 100,
      cellRenderer: (params) => {
        return params.value === 'Y' ? 
          <Badge className="bg-purple-500">SPED</Badge> : 
          '';
      }
    },
    {
      field: "ard",
      headerName: "Race/Ethnicity",
      filter: true,
      sortable: true,
      minWidth: 130,
    },
  ], []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    }),
    []
  );

  useEffect(() => {
    if (open && sc && tn) {
      setLoading(true);
      const fetchData = async () => {
        // Build the SQL query based on parameters
        let query = `
          SELECT 
            studentId,
            studentNumber,
            grade,
            period,
            departmentCode,
            courseNumber,
            courseTitle,
            section,
            term,
            mark,
            teacherName,
            specialEd,
            ell,
            ard
          FROM GradeDistribution
          WHERE teacherNumber = '${tn}'
            AND sc = ${sc}`;
        
        // Add optional filters if provided
        if (term) {
          query += `\n AND term = '${term}'`;
        }
        if (courseTitle) {
          query += `\n AND courseTitle = '${courseTitle}'`;
        }
        
        query += `\n ORDER BY term, courseTitle, studentId`;

        try {
          const result = await runQuery(query);
          console.log("Student grade data retrieved:", result?.length || 0, "records");
          setGradeData(result || []);
        } catch (error) {
          console.error("Error fetching student grade data:", error);
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
      A: 0, B: 0, C: 0, D: 0, F: 0, Other: 0, Total: gradeData.length
    };
    
    gradeData.forEach(student => {
      const mark = student.mark?.charAt(0) || 'Other';
      if (['A', 'B', 'C', 'D', 'F'].includes(mark)) {
        grades[mark]++;
      } else {
        grades.Other++;
      }
    });
    
    return grades;
  }, [gradeData]);
  console.log("Grade summary:", gradeSummary);
  console.log("Grade data:", gradeData);
  return (
    <Dialog open={open} onOpenChange={setOpen} className="w-full h-full">
      <DialogTrigger className="hover:underline text-left hover:text-primary">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogTitle className="text-lg font-semibold">
          {teacher} - Student Grade Details
          {courseTitle && ` - ${courseTitle}`}
          {term && ` (${term})`}
        </DialogTitle>
        <div className="flex flex-col items-center space-y-4">         
          {gradeSummary && (
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-blue-600">A: {gradeSummary.A}</Badge>
              <Badge className="bg-green-600">B: {gradeSummary.B}</Badge>
              <Badge className="bg-yellow-500">C: {gradeSummary.C}</Badge>
              <Badge className="bg-orange-500">D: {gradeSummary.D}</Badge>
              <Badge className="bg-red-600">F: {gradeSummary.F}</Badge>
              {gradeSummary.Other > 0 && (
                <Badge className="bg-gray-600">Other: {gradeSummary.Other}</Badge>
              )}
              <Badge variant="outline">Total: {gradeSummary.Total}</Badge>
            </div>
          )}
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-60 w-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm font-medium">Loading student data...</p>
            </div>
          ) : gradeData.length > 0 ? (
            <div
              style={{ height: "75vh", width: "90vw", maxWidth: "1400px" }}
            >
              <AgGridReact
                theme={gridThemeClass}
                rowData={gradeData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                pagination={true}
                paginationPageSize={20}
                domLayout="autoHeight"
              />
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No student grade data available for this teacher.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherStudentGradesDialog;