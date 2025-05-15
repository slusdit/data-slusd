"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { runQuery } from "@/lib/aeries";
import { colorSchemeDarkBlue, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

const TeacherGradesDialog = ({
  children,
  teacher,
  sc,
    tn,
  department,
  colField,
  params,
}: {
  children: React.ReactNode;
  teacher: string;
  sc: number;
        tn: number;
  department: string;
  colField: string;
  params: any;
}) => {
  const [gradeData, setGradeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const { theme } = useTheme();
  const mark = colField.toUpperCase().substring(0, 1);
  //   console.log(params.rowModel.rowsToDisplay);
  const { resolvedTheme } = useTheme();
  const gridThemeClass = useMemo(() => {
    return resolvedTheme === 'dark'
      ? themeQuartz.withPart(colorSchemeDarkBlue)
      : themeQuartz;
  }, [resolvedTheme]);

  const columnDefs = [
    // { field: 'TERM', headerName: 'Term', filter: true },
    {
      field: "TERM",
      headerName: "Term",
      filter: true,
      maxWidth: 150,
      flex: 2,
    },
    {
      field: "CO",
      headerName: "Course Name",
      filter: true,
      flex: 1,
    },
    {
      field: 'CN',
      headerName: 'Course Num',
      filter: true,
      flex: 1,
    },
    {
      field: 'SE',
      headerName: 'Section',
      filter: true,
      flex: 1,
    },
    {
      field: "PD",
      headerName: "Period",
      filter: true,
      flex: 1,
    },
    {
      field: 'Mark_Count',
      headerName: `${mark} Count`,
      filter: true,
      flex: 1,

    },

    {
      field: 'Total_Grades',
      headerName: "Students",
      filter: "agNumberColumnFilter",
      flex: 1,
    },
    //   { field: 'MARK', headerName: 'Mark', filter: true },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
    }),
    []
  );

  useEffect(() => {
    if (open && sc && tn) {
      setLoading(true);
      const fetchData = async () => {

        const query = `
          WITH GradeCounts AS (
    SELECT
        SLUSD_MARKS_GRD.SC,
        SLUSD_MARKS_GRD.TN,
        tch.TLN,
        tch.TF,
        SLUSD_MARKS_GRD.PD,
        CN,
        CO,
        SE,
        TERM,
        MARK,
        COUNT(*) as Grade_Count
    FROM
        (SELECT * FROM SLUSD_MARKS_GRD WHERE LEFT(TERM, 3) IN('GRD', 'SEM')) SLUSD_MARKS_GRD
        JOIN TCH ON SLUSD_MARKS_GRD.TN = TCH.TN
            AND SLUSD_MARKS_GRD.SC = TCH.SC
            AND TCH.del = 0
    GROUP BY
        SLUSD_MARKS_GRD.SC,
        SLUSD_MARKS_GRD.TN,
        tch.TLN,
        tch.TF,
        SLUSD_MARKS_GRD.PD,
        CN,
        CO,
        SE,
        TERM,
        MARK
)
SELECT 
    CN,
    CO,
    PD,
    SE,
    TERM,
    SUM(CASE WHEN MARK = '${mark}' THEN Grade_Count ELSE 0 END) as Mark_Count,
    SUM(CASE WHEN MARK = 'A' THEN Grade_Count ELSE 0 END) as A_Count,
    SUM(CASE WHEN MARK = 'B' THEN Grade_Count ELSE 0 END) as B_Count,
    SUM(CASE WHEN MARK = 'C' THEN Grade_Count ELSE 0 END) as C_Count,
    SUM(CASE WHEN MARK = 'D' THEN Grade_Count ELSE 0 END) as D_Count,
    SUM(CASE WHEN MARK = 'F' THEN Grade_Count ELSE 0 END) as F_Count,
    SUM(CASE WHEN MARK != 'A' and MARK != 'B' and MARK != 'C' and MARK != 'D' and MARK != 'F' THEN Grade_Count ELSE 0 END) as Other_Count,
    SUM(Grade_Count) as Total_Grades,
    MAX(TLN) as Teacher_Last_Name,
    MAX(TF) as Teacher_First_Name
FROM GradeCounts

WHERE TN = ${tn}
and sc = ${sc}
GROUP BY CN, CO, SE, TERM, PD
ORDER BY CN, PD, TERM;`

        try {
          const result = await runQuery(query);
          setGradeData(result);
        } catch (error) {
          console.error("Error fetching grade data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [open, sc, tn, colField]);
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
        fileName: `${teacher}_${mark}_Grades_${new Date().toISOString().split("T")[0]}.csv`,
      };

      gridApi.exportDataAsCsv(exportParams);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setExporting(false);
    }
  }, [gridApi, teacher, mark]);
  return (
    <Dialog open={open} onOpenChange={setOpen} className="w-full h-full" title>
      <DialogTrigger className="w-full h-full pr-2 underline hover:text-primary">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold">
            {teacher} - {colField.substring(0, 1)} Grades
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : gradeData && gradeData.length ? (
            <div
              style={{ height: "75vh", width: "60vw" }}
              
            >
              <AgGridReact
                theme={gridThemeClass}
                rowData={gradeData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                pagination={true}
              />
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherGradesDialog;
function setExporting(arg0: boolean) {
  throw new Error("Function not implemented.");
}

