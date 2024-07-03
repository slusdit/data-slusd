"use client";
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  RowSelectionState,
} from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { exportToCSV, exportToExcel } from "@/lib/exportData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DataTableProps<T extends object> {
  data: T[];
}

function DataTable<T extends object>({ data }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const columns = useMemo<ColumnDef<T>[]>(() => {
    if (data.length === 0) return [];
    return [
      {
        id: "select",
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
        header: ({ column }: { column: any }) => {
          return (
            <div className="flex items-center justify-center">
              <button
                className="flex items-center gap-1"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <span>{key}</span>
                {{
                  asc: <ArrowUp opacity={0.9} className="h-4 w-4 ml-1 " />,
                  desc: <ArrowDown opacity={0.9} className="h-4 w-4 ml-1" />,
                }[column.getIsSorted() as string] ?? (
                  <ArrowUpDown opacity={0.5} className="h-4 w-4 ml-1" />
                )}
              </button>
            </div>
          );
        },
        accessorKey: key,
      })),
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
  });

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="w-full py-4">
      <div className="mb-4 space-x-2 flex justify-center">
        <button
          onClick={() => exportToCSV(reactTable)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
        >
          Export to CSV
        </button>
        <button
          onClick={() => exportToExcel(reactTable)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-spotlight"
        >
          Export to Excel
        </button>
      </div>
      <div className="justify-center m-auto flex align-middle">
        <ScrollArea className="max-w-[95%]">
          <div className="overflow-x-auto">
            <table className="border border-black">
              <thead>
                {reactTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="border-b border-primary bg-title text-mainTitle-foreground p-1 text-center text-sm"
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
                {reactTable.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-1 text-xs border bg-card text-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default DataTable;
