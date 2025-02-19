'use client';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { colorSchemeDarkBlue, themeQuartz } from 'ag-grid-community';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface Student {
  firstName: string;
  lastName: string;
  id: number;
  quarter: string;
  progressReportFs: number;
  finalGradeFs: number;
  elaStarBand: string;
  mathStarBand: string;
  referrals: number;
  suspensionDays: number;
  academicInterventionLevel: number;
  behavioralInterventionLevel: number;
  attendanceInterventionLevel: number;
  isSped: boolean;
  isEL: boolean;
  costReferralSubmitted: boolean;
  sc: number;
}

interface InterventionsProps {
  data: Student[];
  title?: string;
}

const StudentLinkCellRenderer = (props: any) => {
  const id = props.value;
  const sc = props.data.sc;
  
  return (
    <Link
      href={`/${sc}/student/${id}`}
      className="text-blue-500 hover:text-blue-700 hover:underline"
    >
      {id}
    </Link>
  );
};

const LevelCellRenderer = (props: any) => {
  const level = props.value;
  let bgColor = '';
  let textColor = 'text-foreground';

  switch (level) {
    case 3:
      bgColor = 'bg-red-200 dark:bg-red-900';
      break;
    case 2:
      bgColor = 'bg-yellow-200 dark:bg-yellow-900';
      break;
    case 1:
      bgColor = 'bg-blue-200 dark:bg-blue-900';
      break;
    default:
      bgColor = 'bg-green-200 dark:bg-green-900';
  }

  return (
    <div className={`w-full h-full flex items-center justify-center ${bgColor} ${textColor} rounded px-2 py-1`}>
      {level}
    </div>
  );
};

const BooleanCellRenderer = (props: any) => {
  const value = props.value;
  return (
    <div className="flex items-center justify-center">
      {value ? '✓' : ''}
    </div>
  );
};

const Interventions: React.FC<InterventionsProps> = ({ 
  data, 
  title = "Student Interventions" 
}) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<Student[]>([]);
  const { resolvedTheme } = useTheme();
  const [selectedRows, setSelectedRows] = useState<Student[]>([]);

  const gridThemeClass = useMemo(() => {
    return resolvedTheme === 'dark' 
      ? themeQuartz.withPart(colorSchemeDarkBlue) 
      : themeQuartz;
  }, [resolvedTheme]);

  useEffect(() => {
    if (data) {
      setRowData(data);
    }
  }, [data]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100,
  }), []);

  const createColumnDefs = useCallback(() => {
    const cols: ColDef[] = [
      {
        headerName: '',
        field: 'checkboxCol',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        filter: false,
        width: 50,
        flex: 0.5,
      },
      {
        headerName: 'Student First Name',
        field: 'firstName',
        filter: 'agTextColumnFilter',
        flex: 1.2,
      },
      {
        headerName: 'Last Name',
        field: 'lastName',
        filter: 'agTextColumnFilter',
        flex: 1.2,
      },
      {
        headerName: 'Student ID',
        field: 'id',
        cellRenderer: StudentLinkCellRenderer,
        filter: 'agNumberColumnFilter',
        width: 120,
        flex: 1,
      },
      {
        headerName: 'Quarter',
        field: 'quarter',
        filter: 'agTextColumnFilter',
        width: 100,
        flex: 0.8,
      },
      {
        headerName: '# of Progress Report F\'s',
        field: 'progressReportFs',
        filter: 'agNumberColumnFilter',
        width: 180,
        flex: 1.2,
      },
      {
        headerName: '# of Final Grades F\'s',
        field: 'finalGradeFs',
        filter: 'agNumberColumnFilter',
        width: 160,
        flex: 1.2,
      },
      {
        headerName: 'ELA STAR Band',
        field: 'elaStarBand',
        filter: 'agTextColumnFilter',
        width: 140,
        flex: 1,
      },
      {
        headerName: 'Math STAR Band',
        field: 'mathStarBand',
        filter: 'agTextColumnFilter',
        width: 140,
        flex: 1,
      },
      {
        headerName: '# of Referrals',
        field: 'referrals',
        filter: 'agNumberColumnFilter',
        width: 130,
        flex: 1,
      },
      {
        headerName: '# Days of Suspensions',
        field: 'suspensionDays',
        filter: 'agNumberColumnFilter',
        width: 180,
        flex: 1.2,
      },
      {
        headerName: 'Academic Level of Intervention',
        field: 'academicInterventionLevel',
        cellRenderer: LevelCellRenderer,
        filter: 'agNumberColumnFilter',
        width: 220,
        flex: 1.5,
      },
      {
        headerName: 'Behavioral Level of Intervention',
        field: 'behavioralInterventionLevel', 
        cellRenderer: LevelCellRenderer,
        filter: 'agNumberColumnFilter',
        width: 220,
        flex: 1.5,
      },
      {
        headerName: 'Attendance Level of Intervention',
        field: 'attendanceInterventionLevel',
        cellRenderer: LevelCellRenderer,
        filter: 'agNumberColumnFilter',
        width: 220,
        flex: 1.5,
      },
      {
        headerName: 'SPED?',
        field: 'isSped',
        cellRenderer: BooleanCellRenderer,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: [true, false],
          valueFormatter: (params: any) => params.value ? 'Yes' : 'No',
        },
        width: 100,
        flex: 0.8,
      },
      {
        headerName: 'EL Student?',
        field: 'isEL',
        cellRenderer: BooleanCellRenderer,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: [true, false],
          valueFormatter: (params: any) => params.value ? 'Yes' : 'No',
        },
        width: 120,
        flex: 0.8,
      },
      {
        headerName: 'COST Referral Submitted',
        field: 'costReferralSubmitted',
        cellRenderer: BooleanCellRenderer,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: [true, false],
          valueFormatter: (params: any) => params.value ? 'Yes' : 'No',
        },
        width: 200,
        flex: 1.3,
      }
    ];

    return cols;
  }, []);

  useEffect(() => {
    setColumnDefs(createColumnDefs());
  }, [createColumnDefs]);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }, []);

  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  }, [gridApi]);

  const exportToCSV = useCallback(() => {
    if (!gridApi) return;

    const exportParams = {
      skipHeader: false,
      suppressQuotes: true,
      columnSeparator: ',',
      onlySelected: gridApi.getSelectedRows().length > 0,
      fileName: `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`,
      processCellCallback: (params: any) => {
        if (params.value === null || params.value === undefined) return '';
        if (typeof params.value === 'boolean') return params.value ? 'Yes' : 'No';
        return params.value.toString();
      },
    };

    gridApi.exportDataAsCsv(exportParams);
  }, [gridApi, title]);

  const onGridSizeChanged = useCallback((params: any) => {
    const gridWidth = document.querySelector('.ag-center-cols')?.clientWidth;
    if (gridWidth) {
      params.api.sizeColumnsToFit();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gridApi]);

  return (
    <Card className="w-full max-w-none mx-0">
      <CardHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Export to CSV
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
                {columnDefs
                  .filter((col) => col.field !== "checkboxCol")
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.field}
                      className="capitalize"
                      checked={!column.hide}
                      onCheckedChange={(value) =>
                        gridApi?.setColumnVisible(column.field!, value)
                      }
                    >
                      {column.headerName || column.field}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-0 pb-2">
        <div className="h-[600px] w-full">
          <AgGridReact
            theme={gridThemeClass}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onGridSizeChanged={onGridSizeChanged}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChanged}
            animateRows={true}
            pagination={true}
            paginationPageSize={15}
            enableCellTextSelection={true}
            suppressRowClickSelection={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Interventions;