"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartData } from "chart.js"
const defaultChartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const defaultChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

type StackComponentProps<D extends ChartData, C extends ChartConfig> = {
    chartData: D[],
    chartConfig: C,
    title?: string,
    description?: string
}

export function StackComponent<D extends ChartData, C extends ChartConfig>({
    chartData,
    chartConfig,
    title = "Title - Stacked Bar Chart",
    description = "Chart Description",
}: StackComponentProps<D, C>) {

    console.log(chartData)
    console.log(chartConfig)
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        {
                            chartData.map((item, index) => (
                                <Bar
                                    key={index}
                                    dataKey={item.label} // Assuming 'label' is the key for each item in chartData
                                    stackId={index}
                                    fill={chartConfig[item.label]?.color} // Access color from chartConfig based on item.label
                                    radius={[4, 4, 0, 0]}
                                />
                            ))
                        }
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
