'use client'

import { runQuery } from "@/lib/aeries"
import { getQueryData } from "@/lib/getQuery"
import { useEffect, useState } from "react"
import { DiyChartBySchool } from "./charts/DiyChartBySchool"
import { StackedBarChart } from "./charts/StackedBar"
import DataTable from "./DataTable"
import { EnrollmentByGradeChart } from "./charts/EnrollmentByGrade"

const SchoolEnroolmentGraph = ({
    schools,
    queryId
}: {
    schools: number[]
    queryId: string
}) => {
    const [data, setData] = useState<any>({})

    function formatData(data: any) {


        return formattedData
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQueryData(queryId)
            console.log(data)
            if (!data) return

            setData(data)
        }


        fetchData()


    }, [])

    const school = schools[0]

    return (
        <>
            {data &&

                <div className="max-w-md">
                    <EnrollmentByGradeChart data={data} school={school} />
                </div>
            }
        </>
    )
}

export default SchoolEnroolmentGraph