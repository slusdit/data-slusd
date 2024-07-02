'use client'
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  RowSelectionState
} from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import * as XLSX from 'xlsx';

interface DataTableProps<T extends object> {
  data: T[];
}

function DT<T extends object>({ data }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useMemo<ColumnDef<T>[]>(() => {
    if (data.length === 0) return [];
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...Object.keys(data[0]).map((key) => ({
        id: key,
        header: ({ column }) => {
          return (
            <div className="flex items-center justify-center">
              <button
                className="flex items-center gap-1"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <span>{key}</span>
                {{
                  asc: <ArrowUp className="h-4 w-4 ml-1" />,
                  desc: <ArrowDown className="h-4 w-4 ml-1" />,
                }[column.getIsSorted() as string] ?? <ArrowUpDown className="h-4 w-4 ml-1" />}
              </button>
            </div>
          )
        },
        accessorKey: key,
      }))
    ];
  }, [data]);

  const reactTable = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  })

  const exportToCSV = () => {
    let rowsToExport = reactTable.getSelectedRowModel().rows

    // If no rows are selected, export all rows
    if (rowsToExport.length === 0) {
      rowsToExport = reactTable.getRowModel().rows
    }

    const headers = Object.keys(data[0]).join(',')
    const csvData = rowsToExport.map(row => 
      Object.values(row.original as Record<string, unknown>).join(',')
    )
    const csvString = [headers, ...csvData].join('\n')

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'exported_data.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const exportToExcel = () => {
    let rowsToExport = reactTable.getSelectedRowModel().rows

    // If no rows are selected, export all rows
    if (rowsToExport.length === 0) {
      rowsToExport = reactTable.getRowModel().rows
    }

    const worksheet = XLSX.utils.json_to_sheet(
      rowsToExport.map(row => row.original)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save to file
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(data);
      link.setAttribute('href', url);
      link.setAttribute('download', 'exported_data.xlsx');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  if (data.length === 0) {
    return <div>No data available</div>
  }

  return (
    <div>
      <div className="mb-4 space-x-2">
        <button 
          onClick={exportToCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export to CSV
        </button>
        <button 
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="border border-black">
          <thead>
            {reactTable.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="border-b bg-title text-mainTitle-foreground font-bold p-2 text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {reactTable.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    className="p-2 border bg-card text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DT;