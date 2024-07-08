import * as XLSX from 'xlsx';
import { Table } from '@tanstack/react-table'

export const exportToCSV = (reactTable: Table<any>) => {
  let rowsToExport = reactTable.getSelectedRowModel().rows
  
  // If no rows are selected, export all rows
  if (rowsToExport.length === 0) {
    rowsToExport = reactTable.getRowModel().rows
  }
  
  
  if (reactTable.options.state.columnVisibility?.requested === true) {

    console.log(reactTable.options.state.columnVisibility)
    
    // rowsToExport = reactTable.getFilteredRowModel().rows
  }
  console.log(reactTable.options.state.columnVisibility)
  
  console.log(rowsToExport)

  
  const headers = reactTable.options.columns.filter((column => column.id !== 'select')).map((column) => column.id)
  const csvData = rowsToExport.map((row: { original: Record<string, unknown> }) => 
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

export const exportToExcel = (reactTable:any) => {
  let rowsToExport = reactTable.getSelectedRowModel().rows
  

  // If no rows are selected, export all rows
  if (rowsToExport.length === 0) {
    rowsToExport = reactTable.getRowModel().rows
  }
  console.log(reactTable.getRowModel())
  // console.log('Made it here')
  // if (columnsToExport.length === 0) {
  //   columnsToExport = reactTable.getColumns().columns
  // }

  const worksheet = XLSX.utils.json_to_sheet(
    rowsToExport.map((row: { original: Record<string, unknown> }) => row.original)
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
