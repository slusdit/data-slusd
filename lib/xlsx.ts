
import { Row, Table } from '@tanstack/react-table'
import xlsx, { IContent, IJsonSheet } from 'json-as-xlsx'
import { TeacherCardType } from './types'
export function downloadToExcel(
    table: Table<any>,
    // exportAll: boolean
){
    
    const { data } = table.options
    const { rowSelection, columnFilters, columnVisibility } = table.options.state
    // console.log(exportAll)

    let filteredData= table.getRowModel().rows.map((row:Row<any>) => row.original)

    // if (!exportAll) {

        if (columnFilters && columnFilters.length > 0) {
            filteredData = table.getFilteredRowModel()
                .rows.map((row) => row.original)

            console.log({ filteredData })

        }
        console.log(table.getSelectedRowModel().rows.length)
        if (rowSelection && table.getSelectedRowModel().rows.length > 0) {
            console.log(rowSelection)
            filteredData = table.getSelectedRowModel()
                .rows.map((row) => row.original)
            }
            // }
            
            console.log({ filteredData })

    let columns: IJsonSheet[] = [
        {
            sheet: 'Plex Requests',
            columns: [
                { label: 'SEID', value: 'seid' },
                { label: 'Last Name', value: 'lastName' },
                { label: 'First Name', value: 'firstName' },
                { label: 'Credential Count', value: 'credentials.length' },
                { label: 'Section Count', value: 'sections.length' },
                { label: 'Error', value: 'counts.errorCount' },
                { label: 'Warning', value: 'counts.noMatchCount' },
                { label: 'Complete', value: 'counts.matchCount' },
                { label: 'Match Count', value: (row) => (row?.matchCountBadges?.matchCount ? row.matchCountBadges.matchCount : 'matchCountBadges') },

                // { label: 'Date', value: (row: any) => row.date ? new Date(row.date).toLocaleDateString() : '' },
            ],
            content: filteredData
        }

    ]
    let settings = {
        fileName: 'Teachers', // Name of the resulting spreadsheet
    }
    xlsx(columns, settings)
}