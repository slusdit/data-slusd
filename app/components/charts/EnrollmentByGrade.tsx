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

interface EnrollmentByGradeChartProps<T> {
  chartConfig?: ChartConfig
  chartData?: ChartDataType[]
  school?: string
}

export function EnrollmentByGradeChart<T>({
  chartConfig = defaultChartConfig,
  chartData = defaultChartData as T[],
  school = "Placeholder School",
}:EnrollmentByGradeChartProps<T>) {
  return (
    <Card
        className="border border-muted-foreground m-2"
    >
      <CardHeader>
        <CardTitle>School Enrollment</CardTitle>
        <CardDescription>{school} School</CardDescription>
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
