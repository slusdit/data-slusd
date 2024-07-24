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

const SchoolEnrollmentGraph = ({
    schools,
    queryId,
    containerStyle = ' flex flex-col  items-center'
}: {
    schools: number[]
    queryId: string
    containerStyle?: string
}) => {
    const [data, setData] = useState<any>({})
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(true)

    function formatData(data: any) {


        return formattedData
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data, query } = await getQueryData(queryId)
            console.log(data)
            console.log(query)
            if (!data) return

            setData(data)
            setCategory(query.category?.label)
            setLoading(false)
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