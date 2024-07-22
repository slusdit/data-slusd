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

const SchoolEnroolmentGraph = ({
    schools,
    queryId,
    containerStyle = 'w-full flex flex-col justify-center items-center'
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
            <Skeleton className={"h-10 w-48"} />
            </div>
        )
    }
    return (
        <>
            {data &&

                <div className={containerStyle}>
                    <EnrollmentByGradeChart data={data}  />
                    {category &&
                        <Link href={`/query/${category}/${queryId}`}>Go </Link>
                    }
                </div>
            }
        </>
    )
}

export default SchoolEnroolmentGraph