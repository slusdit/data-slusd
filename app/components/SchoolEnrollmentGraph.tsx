'use client'

import { runQuery } from "@/lib/aeries"
import { getQueryData } from "@/lib/getQuery"
import { useEffect, useState } from "react"
import { DiyChartBySchool } from "./charts/DiyChartBySchool"
import { StackedBarChart } from "./charts/StackedBar"
import DataTable from "./DataTable"
import { EnrollmentByGradeChart } from "./charts/EnrollmentByGrade"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

type Category = {
    id: string;
    label: string;
    value: string;
    sort: number;
  }
  
  type SchoolEnrollmentSummary = {
    id: string;
    query: string;
    name: string;
    label: string;
    createdBy: string;
    chart: boolean;
    chartColumnKey: string | null;
    chartValueKey: string | null;
    description: string;
    publicQuery: boolean;
    categoryId: string;
    hiddenCols: string;
    category: Category;
  }
const SchoolEnrollmentGraph = ({
    schools,
    initialQueryId,
    queryLabel,
    containerStyle = ' flex flex-col  items-center'
}: {
    schools: number[]
    itinalQueryId?: string
    queryLabel?: string
    containerStyle?: string
}) => {
    const [data, setData] = useState<any>({})
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(true)
    const [queryId, setQueryId] = useState(initialQueryId)

    useEffect(() => {
        const fetchData = async () => {
            // const { data, query } = await getQueryData(queryId)
            const { data, query } = await getQueryData({ queryLabel })
            console.log(data)
            console.log(query)
            if (!data) return

            setData(data)
            setCategory(query.category?.label)
            setLoading(false)
            setQueryId(query.id)
            const category = query.category?.label
        }


        fetchData()


    }, [])

    // const school = schools[0]
    if (loading) {
        return (
            <div className={containerStyle}>
                <Skeleton className={"h-60 w-60 mb-2"} />
                {/* <Skeleton className={"h-10 w-48"} /> */}
            </div>
        )
    }
    const url = `/query/${category}/${queryId}`
    return (
        <>
            {data &&
                <div className={containerStyle}>
                    <EnrollmentByGradeChart data={data} url={url} />
                    
                </div>
            }
        </>
    )
}

export default SchoolEnrollmentGraph