'use client'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ColumnVisibility, Table } from "@tanstack/react-table"

export type SchoolByGrade = {
    'Sch#': number,
    School: string,
    TK: number,
    K: number,
    '1': number,
    '2': number,
    '3': number,
    '4': number,
    '5': number,
    '6': number,
    '7': number,
    '8': number,
    '9': number,
    '10': number,
    '11': number,
    '12': number,
    Total: number,
    el?: number,
    fre?: number,
}

type SDCEnrollmentPercentByGrade = {
    'Sch#': number,
    'School': string,
    'TK': number,
    'SDC-TK': number,
    'K': number,
    'GR 1': number,
    'SDC-1': number,
    'Gr 2': number,
    'SDC-2': number,
    'Gr 3': number,
    'SDC-3': number,
    'Gr 4': number,
    'SDC-4': number,
    'Gr 5': number,
    'SDC-5': number,
    'Gr 6': number,
    'SDC-6': number,
    'Gr 7': number,
    'SDC-7': number,
    'Gr 8': number,
    'SDC-8': number,
    'Gr 9': number,
    'SDC-9': number,
    'Gr 10': number,
    'SDC-10': number,
    'Gr 11': number,
    'SDC-11': number,
    'Gr 12': number,
    'SDC-12': number,
    'Total': number,
    'Total-SDC': number,
    'Total-NoSDC': number,

}

type BaseChartConfig = {
    label: string,
    data?: { [key: string | number]: number | string },
    color: string,
}
type BaseBySchoolChartConfig = {
    [key: string]: BaseChartConfig
}

const defaultChartData = [
    {
        'Sch#': 2,
        School: 'Garfield',
        TK: 31,
        K: 45,
        '1': 64,
        '2': 49,
        '3': 49,
        '4': 48,
        '5': 51,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 337
    },
    {
        'Sch#': 3,
        School: 'Jefferson',
        TK: 39,
        K: 78,
        '1': 94,
        '2': 78,
        '3': 103,
        '4': 91,
        '5': 106,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 589
    },
    {
        'Sch#': 4,
        School: 'Madison',
        TK: 51,
        K: 125,
        '1': 106,
        '2': 110,
        '3': 102,
        '4': 96,
        '5': 95,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 685
    },
    {
        'Sch#': 5,
        School: 'McKinley',
        TK: 23,
        K: 69,
        '1': 72,
        '2': 60,
        '3': 74,
        '4': 67,
        '5': 83,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 448
    },
    {
        'Sch#': 6,
        School: 'Monroe',
        TK: 25,
        K: 54,
        '1': 51,
        '2': 60,
        '3': 67,
        '4': 81,
        '5': 64,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 402
    },
    {
        'Sch#': 7,
        School: 'Roosevelt',
        TK: 40,
        K: 88,
        '1': 72,
        '2': 91,
        '3': 74,
        '4': 91,
        '5': 88,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 544
    },
    {
        'Sch#': 8,
        School: 'Washington',
        TK: 21,
        K: 67,
        '1': 66,
        '2': 57,
        '3': 64,
        '4': 58,
        '5': 70,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 403
    },
    {
        'Sch#': 9,
        School: 'Halkin',
        TK: 45,
        K: 105,
        '1': 102,
        '2': 108,
        '3': 123,
        '4': 116,
        '5': 117,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 716
    },
    {
        'Sch#': 11,
        School: 'Bancroft',
        TK: 0,
        K: 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 314,
        '7': 288,
        '8': 316,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 918
    },
    {
        'Sch#': 12,
        School: 'Muir',
        TK: 0,
        K: 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 317,
        '7': 302,
        '8': 310,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 929
    },
    {
        'Sch#': 15,
        School: 'Lincoln',
        TK: 0,
        K: 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 1,
        '10': 19,
        '11': 84,
        '12': 68,
        Total: 172
    },
    {
        'Sch#': 16,
        School: 'SLHS',
        TK: 0,
        K: 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 608,
        '10': 606,
        '11': 584,
        '12': 620,
        Total: 2418
    },
    {
        'Sch#': 50,
        School: 'NPS',
        TK: 0,
        K: 0,
        '1': 0,
        '2': 1,
        '3': 3,
        '4': 3,
        '5': 1,
        '6': 3,
        '7': 5,
        '8': 2,
        '9': 6,
        '10': 2,
        '11': 2,
        '12': 4,
        Total: 32
    },
    {
        'Sch#': 60,
        School: 'SLVA Elementary School',
        TK: 0,
        K: 2,
        '1': 5,
        '2': 3,
        '3': 6,
        '4': 10,
        '5': 2,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 28
    },
    {
        'Sch#': 61,
        School: 'SLVA Middle School',
        TK: 0,
        K: 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 7,
        '7': 10,
        '8': 8,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        Total: 25
    },
    {
        'Sch#': 62,
        School: 'SLVA High School',
        TK: 0,
        K: 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 19,
        '10': 22,
        '11': 16,
        '12': 20,
        Total: 77
    }
]




function createConfig(chartData: SDCEnrollmentPercentByGrade[], key: string = 'School') {
    // console.log(chartData)
    let config: BaseBySchoolChartConfig = {}

    chartData.forEach(item => {
        // console.log(item)
        let school;
        for (const key in item) {
            if (key.toLowerCase() === 'school' || key.toLowerCase() === 'sch#' || key.toLowerCase() === 'sc') {
                // @ts-ignore
                school = item[key];
                break;
            }
        }
        // @ts-ignore
        config[item[key]] = {
            // @ts-ignore
            'label': item[key],

            // 'data' : {...item}, 
            'color': 'red'//'var(--primary)'  //'var(--color-sc' + school + ')',
        }



    })
    // console.log(config)
    return config
};

function getSelectedData(table: Table<any>) {
    const { data } = table.options
    const { rowSelection, columnFilters, columnVisibility } = table.options.state
    // console.log(exportAll)

    let filteredData= table.getRowModel().rows.map((row:Row<any>) => row.original)

    // if (!exportAll) {

        if (columnFilters && columnFilters.length > 0) {
            filteredData = table.getFilteredRowModel()
                .rows.map((row) => row.original)

            // console.log({ filteredData })

        }
        // console.log(table.getSelectedRowModel().rows.length)
        if (rowSelection && table.getSelectedRowModel().rows.length > 0) {
            // console.log(rowSelection)
            filteredData = table.getSelectedRowModel()
                .rows.map((row) => row.original)
            }
            // }
            
            // console.log({ filteredData })

}
export function removeZeroValues<T>(data: T[]) {
    return data.map(item => {
        const filteredItem = Object.keys(item).reduce((obj, key) => {
            if (item[key] !== 0) {
                obj[key] = item[key];
            }
            return obj;
        }, {});
        return filteredItem;
    });
}

export function DiyChartBySchool({
    chartData,
    
    title = 'DIY Chart By School',
    table,
}: {
    chartData?: SDCEnrollmentPercentByGrade[]
    title?: string
    table: Table<SDCEnrollmentPercentByGrade>
}) {
    // console.log(table.options)
    const { data } = table.options
    const { rowSelection, columnFilters, columnVisibility } = table.options.state
    // console.log(exportAll)

    let filteredDataBySchool = table.getRowModel().rows.map((row:Row<any>) => row.original)

    // if (!exportAll) {
    // console.log(rowSelection)
    // console.log(columnFilters)

        if (columnFilters && columnFilters.length > 0) {
            filteredDataBySchool = table.getFilteredRowModel()
                .rows.map((row) => row.original)

            // console.log({ filteredData: filteredDataBySchool })

        }
       

        if (rowSelection && table.getSelectedRowModel().rows.length > 0) {
            // console.log(rowSelection)
            filteredDataBySchool = table.getSelectedRowModel()
                .rows.map((row) => row.original)
            }
            // }
            
            // console.log({ filteredData: filteredDataBySchool })
    // console.log(chartData)        

    const chartConfig = createConfig(filteredDataBySchool as SDCEnrollmentPercentByGrade[])


    

    const filteredData = removeZeroValues(filteredDataBySchool);
    // const filteredData = filteredDataBySchool
    // console.log(filteredData)

    const customColor = 'green' //'var(--color-sc' + school + ')';

    return (
        <div>
            <h1>{title}</h1>
            <ChartContainer className="min-h-[400px]" config={chartConfig} >
                <BarChart accessibilityLayer data={filteredData} >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="School"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {/* <ChartLegend content={<ChartLegendContent nameKey='School' />} /> */}

                    {/* SDC and Non-SDC Side by side */}
                    {/* <Bar dataKey="TK" fill="hsl(var(--chart-1))"  stackId={'a'}/>
                    <Bar dataKey="SDC-TK" fill="hsl(var(--chart-7))"  stackId={'b'}/>
                    <Bar dataKey="K" fill="hsl(var(--chart-2))"  stackId={'a'}/>
                    <Bar dataKey="SDC-K" fill="hsl(var(--chart-8))"  stackId={'b'}/>
                    <Bar dataKey="Gr 1" fill="hsl(var(--chart-3))"  stackId={'a'}/>
                    <Bar dataKey="SDC-1" fill="hsl(var(--chart-9))"  stackId={'b'}/>
                    <Bar dataKey="Gr 2" fill="hsl(var(--chart-4))"  stackId={'a'}/>
                    <Bar dataKey="SDC-2" fill="hsl(var(--chart-10))"  stackId={'b'}/>
                    <Bar dataKey="Gr 3" fill="hsl(var(--chart-5))"  stackId={'a'}/>
                    <Bar dataKey="SDC-3" fill="hsl(var(--primary))"  stackId={'b'}/>
                    <Bar dataKey="Gr 4" fill="hsl(var(--chart-6))"  stackId={'a'}/>
                    <Bar dataKey="SDC-4" fill="hsl(var(--chart-6))"  stackId={'b'}/>
                    <Bar dataKey="Gr 5" fill="hsl(var(--chart-7))"  stackId={'a'}/>
                    <Bar dataKey="SDC-5" fill="hsl(var(--chart-7))"  stackId={'b'}/>
                    <Bar dataKey="Gr 6" fill="hsl(var(--chart-8))"  stackId={'a'}/>
                    <Bar dataKey="SDC-6" fill="hsl(var(--chart-8))"  stackId={'b'}/>
                    <Bar dataKey="Gr 7" fill="hsl(var(--chart-9))"  stackId={'a'}/>
                    <Bar dataKey="SDC-7" fill="hsl(var(--chart-9))"  stackId={'b'}/>
                    <Bar dataKey="Gr 8" fill="hsl(var(--chart-10))"  stackId={'a'}/>
                    <Bar dataKey="SDC-8" fill="hsl(var(--chart-10))"  stackId={'b'}/>
                    <Bar dataKey="Gr 9" fill="hsl(var(--chart-1))"  stackId={'a'}/>
                    <Bar dataKey="SDC-9" fill="hsl(var(--chart-1))"  stackId={'b'}/>
                    <Bar dataKey="Gr 10" fill="hsl(var(--chart-2))"  stackId={'a'}/>
                    <Bar dataKey="SDC-10" fill="hsl(var(--chart-2))"  stackId={'b'}/>
                    <Bar dataKey="Gr 11" fill="hsl(var(--chart-3))"  stackId={'a'}/>
                    <Bar dataKey="SDC-11" fill="hsl(var(--chart-3))"  stackId={'b'}/>
                    <Bar dataKey="Gr 12" fill="hsl(var(--chart-4))"  stackId={'a'}/>
                    <Bar dataKey="SDC-12" fill="hsl(var(--chart-4))"  stackId={'b'}/> */}

                    { }
                    <Bar dataKey="TK" fill="hsl(var(--chart-1))" stackId={'a'} />
                    <Bar dataKey="K" fill="hsl(var(--chart-2))" stackId={'a'} />
                    <Bar dataKey="Gr 1" fill="hsl(var(--chart-3))" stackId={'a'} />
                    <Bar dataKey="Gr 2" fill="hsl(var(--chart-4))" stackId={'a'} />
                    <Bar dataKey="Gr 3" fill="hsl(var(--chart-5))" stackId={'a'} />
                    <Bar dataKey="Gr 4" fill="hsl(var(--chart-6))" stackId={'a'} />
                    <Bar dataKey="Gr 5" fill="hsl(var(--chart-7))" stackId={'a'} />
                    <Bar dataKey="Gr 6" fill="hsl(var(--chart-8))" stackId={'a'} />
                    <Bar dataKey="Gr 7" fill="hsl(var(--chart-9))" stackId={'a'} />
                    <Bar dataKey="Gr 8" fill="hsl(var(--chart-10))" stackId={'a'} />
                    <Bar dataKey="Gr 9" fill="hsl(var(--chart-1))" stackId={'a'} />
                    <Bar dataKey="Gr 10" fill="hsl(var(--chart-2))" stackId={'a'} />
                    <Bar dataKey="Gr 11" fill="hsl(var(--chart-3))" stackId={'a'} />
                    <Bar dataKey="Gr 12" fill="hsl(var(--chart-4))" stackId={'a'} />

                    <Bar dataKey="SDC-TK" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-K" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-1" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-2" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-3" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-4" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-5" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-6" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-7" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-8" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-9" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-10" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-11" fill="hsl(var(--spotlight))" stackId={'a'} />
                    <Bar dataKey="SDC-12" fill="hsl(var(--spotlight))" stackId={'a'} />

                    <Bar dataKey="Total-NoSDC" fill="hsl(var(--chart-6))" stackId={'c'} />
                    <Bar dataKey="Total-SDC" fill="hsl(var(--spotlight))" stackId={'c'} />
                    {/* <Bar dataKey="Total-NoSDC" fill="hsl(var(--chart-6))"  stackId={'d'}/> */}
                    {/* <Bar dataKey="Total" fill="purple" radius={4} /> */}
                </BarChart>
            </ChartContainer>
        </div>
    )
}