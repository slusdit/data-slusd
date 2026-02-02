import dynamic from 'next/dynamic';
import { Suspense, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { flexRender } from "@tanstack/react-table";

// Type placeholder for DataTableProps
interface DataTableProps<T> {
  data: T[];
  id?: string;
  showChart?: boolean;
  chartTitle?: string;
  chartValueKey?: string;
  chartColumnKey?: string;
}

// Placeholder for reactTable - this file appears to be a test/example file
declare const reactTable: ReturnType<typeof import("@tanstack/react-table").useReactTable>;
declare function exportToCSV(table: unknown): void;
declare function exportToExcel(table: unknown): void;

function DataTable<T extends object>({ 
  data, 
  id,
  showChart,
  chartTitle,
  chartValueKey,
  chartColumnKey 
}: DataTableProps<any>) {
  // ... other code ...

  const Chart = useMemo(() => {
    if (!showChart || !id) return null;

    const DynamicChart = dynamic(() => {
      switch (id) {
        case 'cly54bp030001hv31khj4zt38':
          return import('@/app/tests/DiyChartBySchool');
        case 'clyva7j4s0005qwsuwm3qol0n':
          return import('@/app/tests/BarChartCustomGraph');
        // Add more cases as needed
        default:
          return Promise.resolve(() => <div>Chart not found</div>);
      }
    }, {
      suspense: true,
    });

    // Higher-order component to pass props
    return function ChartWrapper(props: any) {
      return (
        <DynamicChart
          data={data}
          title={chartTitle}
          valueKey={chartValueKey}
          {...props}
        />
      );
    };
  }, [showChart, id, data, chartTitle, chartValueKey]);

  return (
    <>
      <div className="w-full flex flex-col justify-center">
        {Chart && (
          <div className="w-full flex justify-center">
            <Suspense fallback={<div>Loading chart...</div>}>
              <Chart
                table={reactTable}
                chartKey={chartColumnKey}
              />
            </Suspense>
          </div>
        )}
      </div>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {reactTable
            .getAllColumns()
            .filter(
              (column) => column.getCanHide()
            )
            .map((column) => {
              // console.log(column)
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
              )
            })}
        </DropdownMenuContent>
          </DropdownMenu>
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
                  {reactTable.getRowModel().rows.map((row) => {
                    return(
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className='p-1 text-xs border bg-card text-center '
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}