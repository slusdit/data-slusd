'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Check, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { credentialAuthMatch, jp } from "@/lib/utils";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { redirect, useRouter } from "next/navigation"
// import Link from "next/link"
// import { toast } from "sonner"
import { type TeacherCardType } from "@/lib/types"
import { type Teacher } from "@prisma/client"
import MatchCountBadges from "../../cards/MatchCountBadges"
import Link from "next/link"
import { countMatches } from "../TeacherSearch"

// export type Payment = {
//     id: string
//     amount: number
//     status: "pending" | "processing" | "success" | "failed"
//     email: string
// }




export type TeacherRow = {

}



export const columns: ColumnDef<TeacherCardType, unknown>[] = (data:any[]) => {
    console.log(data)
    return [

        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        // dataColumns.map()
        

    ]
        
}