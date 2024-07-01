'use client'
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

interface DataTableProps<T extends object> {
  data: T[];
}

function DT<T extends object>({ data }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<T>[]>(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
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
    }));
  }, [data]);

  const reactTable = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (data.length === 0) {
    return (<div className='font-bold'>
      No data available
      </div>)
  }

  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        {reactTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th 
                key={header.id} 
                style={{
                  borderBottom: 'hsl(var(--border))',
                  background: 'hsl(var(--title))',
                  color: 'hsl(var(--mainTitle-foreground))',
                  fontWeight: 'bold',
                  padding: '8px',
                  textAlign: 'center',
                }}
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
                style={{
                  padding: '10px',
                  border: 'solid 1px hsl(var(--foreground))',
                  background: 'hsl(var(--card))',
                  textAlign: 'center',
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DT;