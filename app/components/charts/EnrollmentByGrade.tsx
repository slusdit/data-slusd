"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Link from "next/link"
import { SchoolInfo } from "@prisma/client"

const defaultChartData = [
  { grade: "K", count: 186 },
  { grade: "1", count: 305 },
  { grade: "2", count: 237 },
  { grade: "3", count: 73 },
  { grade: "4", count: 209 },
  { grade: "5", count: 214 },
]

const defaultChartConfig = {
  count: {
    label: "Enrollment",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type ChartDataType = {
  grade: string
  count: number
}

interface EnrollmentByGradeChartProps {
  chartConfig?: ChartConfig
  chartData?: ChartDataType[]
  school?: SchoolInfo
  url?: string
}

const placeholderSchool = {
  id: "placeholder",
  sc: "placeholder",
  name: "Placeholder School",
  logo: ""
}

export function EnrollmentByGradeChart({
  chartConfig = defaultChartConfig,
  chartData = defaultChartData ,
  school = placeholderSchool,
  url
}: EnrollmentByGradeChartProps) {
  
  return (
    <Card
      className="border  m-2"
    >
      <CardHeader>
        {url ?
          <Link href={url}>
            <CardTitle>{school.name.split(" ")[0]} Enrollment</CardTitle>
          </Link> :
          <CardTitle>School Enrollment</CardTitle>
        }
        <CardDescription>Total: {chartData.reduce((a, b) => a + b.count, 0)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="grade"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">

      </CardFooter>
    </Card>
  )
}
