'use client'
import sql from "mssql";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
  
const DynamicTable = ({
    data, 
    caption
}: {
        data: object[],
        caption?: string
}) => {
    if(!data || data.length === 0) return(<></>)

    const header = Object.keys(data[0])
    console.log(header)
    return (
        <Table className="w-3/4 bg-card border">
            {caption && <TableCaption>{caption}</TableCaption>}
            
            <TableHeader className="bg-muted ">
                <TableRow>
                    {header.map((key: string, index: number) =>(
                        <TableHead className="text-foreground font-bold text-center " key={index}>{key}</TableHead>
                    ))}
                    
                </TableRow>
            </TableHeader>
            <TableBody>
                    {data.map((row) => (
                        <TableRow>
                            {header.map((key: string, index: number) => (
                                <TableCell className="text-foreground text-center" key={index}>{row[key]}</TableCell>
                            ))}
                                
                            
                </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}
export default DynamicTable