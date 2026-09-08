// Registers AG Grid Enterprise modules + licence for this grid (finding P1)
import "@/app/components/providers/AGGridProvider";
import { AgGridReact } from "ag-grid-react"

interface ReportGridType<T> {
    data: T[]
    id: string
}

type DataType = {
    columns: string[]
}
function ReportGrid<T>({
    data,
    id
}: ReportGridType<T>) {
    const {columns, ...data} = data
    
    // console.log({data})
    return (
        <>
            <div>

            Report Grid
            </div>
            <AgGridReact
                rowData={data}
                />
        </>
        
    )   
}

export default ReportGrid