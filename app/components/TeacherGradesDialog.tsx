"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { runQuery } from "@/lib/aeries";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

const TeacherGradesDialog = ({
  children,
  teacher,
  sc,
  tn,
  colField,
  params,
}: {
  children: React.ReactNode;
  teacher: string;
  sc: number;
  tn: number;
  colField: string;
  params: any;
}) => {
  const [gradeData, setGradeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
    const { theme } = useTheme();
    const mark = colField.toUpperCase().substring(0, 1);
//   console.log(params.rowModel.rowsToDisplay);
  const columnDefs = [
    // { field: 'TERM', headerName: 'Term', filter: true },
    {
      field: "TERM",
      headerName: "Term",
          filter: "agSetColumnFilter",
      maxWidth: 100,
      filterParams: {
        values: (params: any) => {
          // Get unique TERM values
          return [
            ...new Set(
              params.rowModel.rowsToDisplay.map(
                (row: { data: { TERM: any } }) => row.data.TERM
              )
            ),
          ].sort();
        },
      },
    },
    { field: 'CN', headerName: 'Course Num', filter: true, maxWidth: 100 },
    { field: 'SE', headerName: 'Section', filter: true, maxWidth: 100 },
    { field: "CO", headerName: "Course Name", filter: true, maxWidth: 150 },
    { field: "PD", headerName: "Period", filter: true, maxWidth: 100 },
      { field: 'Mark_Count', headerName: `${mark} Count`, filter: true, maxWidth: 125 },
   
    {
      field: 'Total_Grades',
      headerName: "Students",
        filter: "agNumberColumnFilter",
      maxWidth: 125,
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
//         const query = `
//           WITH
//     AllGradeCounts
//     AS
//     (
//         SELECT
//             CRS.CN,
//             CRS.CO as [name],
//             SE,
//             PD,
//             TERM,
//             COUNT(*) as Total_Grade_Count
//         FROM SLUSD_GRADES
//             left join CRS on SLUSD_GRADES.cn = CRS.CN
//         WHERE sc = ${sc} AND tn = ${tn}
//         GROUP BY CRS.CN, CRS.CO, SE, PD, TERM
//     )
// SELECT
//     g.CN,
//     CRS.CO,    
//     g.SE,
//     g.PD,
//     g.TERM,
//     COUNT(*) as Grade_Count,
//     agc.Total_Grade_Count,
//     '${mark}' as 'MARK'
// FROM SLUSD_GRADES g
//     left join CRS on g.cn = CRS.CN
//     left join AllGradeCounts agc
//     on g.CN = agc.CN
//         and g.SE = agc.SE
//         and g.PD = agc.PD
//         and g.TERM = agc.TERM
// WHERE g.sc = ${sc} AND g.tn = ${tn} AND g.MARK LIKE '${mark}%'
// GROUP BY g.CN, CRS.CO, g.SE, g.PD, g.TERM, MARK, agc.Total_Grade_Count  
// ORDER BY g.TERM, g.CN`;
        console.log(query);
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

  return (
    <Dialog open={open} onOpenChange={setOpen} className="w-full h-full">
      <DialogTrigger className="w-full h-full text-right pr-2 underline hover:text-primary">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {teacher} - {colField.substring(0, 1)} Grades
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : gradeData && gradeData.length ? (
            <div
              style={{ height: "800px", width: "800px" }}
              className={`ag-theme-alpine${theme === "dark" ? "-dark" : ""}`}
            >
              <AgGridReact
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
