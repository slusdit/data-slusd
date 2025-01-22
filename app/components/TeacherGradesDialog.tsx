'use client'
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
    colField 
}: { 
    children: React.ReactNode, 
    teacher: string, 
    sc: number, 
    tn: number, 
    colField: string 
}) => {
    const [gradeData, setGradeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();

    const columnDefs = [
      { field: 'CN', headerName: 'Course Number', filter: true },
      { field: 'SE', headerName: 'Section', filter: true },
      { field: 'TERM', headerName: 'Term', filter: true },
      { field: 'MARK', headerName: 'Mark', filter: true },
      { field: 'StudentCount', headerName: 'Grade Count', filter: 'agNumberColumnFilter' }
    ];
  
    const defaultColDef = useMemo(() => ({
      sortable: true,
      resizable: true,
      filter: true
    }), []);
  
    useEffect(() => {
      if (open && sc && tn) {
        setLoading(true);
        const fetchData = async () => {
          const mark = colField.toUpperCase().substring(0, 1);
          const query = `
          SELECT CN, SE, TERM,
          CASE WHEN MARK LIKE '${mark}%' THEN '${mark}' END as MARK,
          COUNT(*) as StudentCount 
          FROM SLUSD_GRADES 
          WHERE sc = ${sc} AND tn = ${tn} AND MARK LIKE '${mark}%'
          GROUP BY CN, SE, TERM, MARK
          ORDER BY CN, SE, TERM`;
          
          try {
            const result = await runQuery(query);
            setGradeData(result);
          } catch (error) {
            console.error('Error fetching grade data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    }, [open, sc, tn, colField]);
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full h-full text-right pr-2 underline hover:text-primary">
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{teacher} - {colField} Grades</h3>
            {loading ? (
              <p>Loading...</p>
            ) : gradeData && gradeData.length ? (
              <div style={{ height: '800px', width: '800px' }} className={`ag-theme-alpine${theme === 'dark' ? '-dark' : ''}`}>
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