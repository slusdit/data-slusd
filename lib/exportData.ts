import xlsx from 'json-as-xlsx';
import { Table } from '@tanstack/react-table'

export const exportToCSV = (reactTable: Table<any>) => {
  let rowsToExport = reactTable.getSelectedRowModel().rows
  
  // If no rows are selected, export all rows
  if (rowsToExport.length === 0) {
    rowsToExport = reactTable.getRowModel().rows
  }
  
  
  if (reactTable.options.state.columnVisibility?.requested === true) {

    // console.log(reactTable.options.state.columnVisibility)
    
    // rowsToExport = reactTable.getFilteredRowModel().rows
  }
  // console.log(reactTable.options.state.columnVisibility)
  
  // console.log(rowsToExport)

  
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

export const exportToExcel = (reactTable: any) => {
  let rowsToExport = reactTable.getSelectedRowModel().rows

  // If no rows are selected, export all rows
  if (rowsToExport.length === 0) {
    rowsToExport = reactTable.getRowModel().rows
  }

  const rows = rowsToExport.map((row: { original: Record<string, unknown> }) => row.original)

  // Get column headers from the first row
  const columns = rows.length > 0
    ? Object.keys(rows[0]).map((key) => ({ label: key, value: key }))
    : []

  const data = [
    {
      sheet: "Sheet1",
      columns,
      content: rows,
    },
  ]

  const settings = {
    fileName: "exported_data",
  }

  xlsx(data, settings)
}
