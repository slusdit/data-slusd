"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import { DataTablePagination } from "@/components/DataTablePagination"
import { DataTablePagination } from "@/app/components/DataTablePagination";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { downloadToExcel } from "@/lib/xlsx";

import { SelectTrigger } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { TeacherCardType } from "@/lib/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TeacherCardType[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>([]);
  // const [plexRequests, setPlexRequests] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  useEffect(() => {
    setColumnVisibility({
      errorCount: false,
      completeCount: false,
      warningCount: false,
      complete: false,
    });
    setColumnFilters([{ id: "requested", value: true }]);
  }, []);

  const existingTeachers = data.filter((t) => {
    if (t.seid != null) {
      return t;
    }
  });

  const table = useReactTable<TeacherCardType>({
    // @ts-ignore
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

//   function handleSeidFilterChange(e: any) {
//     return table.getColumn("seid")?.setFilterValue(e.target.value);
//   }
//   function handleScFilterChange(e: any) {
//     return table.getColumn("sc")?.setFilterValue(e.target.value);
//   }
//   function handleStringFilterChange(e: any, col: string) {
//     return table.getColumn(col)?.setFilterValue(e.target.value);
//   }

//   function handleBooleanFilterChange(e: any, col: string) {
//     if (!table.getColumn(col)?.setFilterValue()) {
//       console.log({ e });
//       console.log(e.target);
//       table.getColumn(col)?.setFilterValue(e.target);
//       return;
//     }
//     table.getColumn(col)?.setFilterValue(false);
//   }
  function getUniqueValues(data: [], key: string) {
    const uniqueValues = new Set();
    data.forEach((row) => {
      if (key in row) {
        uniqueValues.add(row[key]);
      }
    });

    return Array.from(uniqueValues);
  }

  return (
    <div>
      <div className="flex py-4 justify-between ">
        {/* Filters */}
        {/* <div className="bg-card mt-4 rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-bold text-center">Filters</h2>
          </div>
          <div className="flex flex-col p-4"> */}
            {/* Filter Group */}
            {/* <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <Label htmlFor="first-name-filter"> First Name</Label>
                  <Input
                    id="first-name-filter"
                    placeholder="Filter by First Name"
                    value={
                      (table
                        .getColumn("firstName")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) => handleStringFilterChange(e, "firstName")}
                    className="max-w-sm shadow-sm rounded-md border-gray-300 px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="last-name-filter"> Last Name</Label>
                  <Input
                    id="last-name-filter"
                    placeholder="Filter by Last Name"
                    value={
                      (table
                        .getColumn("lastName")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) => handleStringFilterChange(e, "lastName")}
                    className="max-w-sm shadow-sm rounded-md border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <Label htmlFor="sc-filter"> SC</Label>
                  <Input
                    id="sc-filter"
                    placeholder="Filter by SC"
                    value={
                      (table.getColumn("sc")?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) => handleStringFilterChange(e, "sc")}
                    className="max-w-sm shadow-sm rounded-md border-gray-300 px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="seid-filter"> SEID</Label>
                  <Input
                    id="seid-filter"
                    placeholder="Filter by seid..."
                    value={
                      (table.getColumn("seid")?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={(e) => handleSeidFilterChange(e)}
                    className="max-w-sm shadow-sm rounded-md border-gray-300 px-3 py-2"
                  />
                </div> 
              </div> */}
            </div> 

            {/* <DataTableEmailFilter /> */}
            {/* Error Only Filter (disabled) */}
            {/* <div className="flex items-center mt-4">
              <Label className="ml-2" htmlFor="error-only-filter">Errors Only</Label>
              <Switch
                id="error-only-filter"
                checked={(table.getColumn("complete")?.getFilterValue() as boolean) ?? false}
                onCheckedChange={e => handleBooleanFilterChange(e, "complete")}
                className="ml-2 rounded-full ring-2 ring-primary"
              />
            </div> */}
            <Button
              // variant="primary"
              className="mt-4 bg-green-500 hover:bg-green-600 text-gray-900
               font-bold max-w-md mx-auto"
              onClick={() => downloadToExcel(table)}
            >
              Export to Excel
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Show/Hide Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
