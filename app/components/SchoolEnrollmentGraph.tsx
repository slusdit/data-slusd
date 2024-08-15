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
import { SchoolInfo } from "@prisma/client"

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
    activeSchool,
    initialQueryId,
    queryLabel,
    containerStyle = ' flex flex-col  items-center'
}: {
    schools: number[]
    activeSchool: SchoolInfo
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

            if (!data) return
            const gradeMap = {
                TK: 'TK',
                K: 'K',
                '1 ': '1',
                '2 ': '2',
                '3 ': '3',
                '4 ': '4',
                '5 ': '5',
                '6 ': '6',
                '7 ': '7',
                '8 ': '8',
                '9 ': '9',
                '10 ': '10',
                '11 ': '11',
                '12 ': '12'
            };

            console.log(data)
            if (data.length === 0) return 
            const processedData = Object.entries(data[0])
                .filter(([key, value]) => gradeMap.hasOwnProperty(key) && value !== 0)
                .map(([key, value]) => ({
                    grade: gradeMap[key].trim(),
                    count: value
                }));
            console.log(processedData)

            setData(processedData)
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
    console.log(activeSchool)
    return (
        <div className={containerStyle}>
            <EnrollmentByGradeChart chartData={data} url={url} school={activeSchool} />
        </div>
    )
}

export default SchoolEnrollmentGraph