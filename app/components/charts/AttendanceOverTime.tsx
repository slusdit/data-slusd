"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/db";
import { useEffect, useState } from "react";
import { runQuery } from "@/lib/aeries";
import { getQueryData } from "@/lib/getQuery";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Session } from "next-auth";

interface SchoolAttendanceData {
  SCH: number;
  dt: string; // ISO 8601 date string
  TotalEnrollment: number;
  PresentCount: number;
  UnexAbsCount: number;
  SARBTardyCount: number;
  MedIllCount: number;
  TardyCount: number;
  SuspendedCount: number;
  ExcsdAbsncCount: number;
  SIndStdyCCount: number;
  InSchSusCount: number;
  ExcuseTardCount: number;
  SIndStdyNCCount: number;
  HomeHosptCount: number;
}
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  TotalEnrollment: {
    label: "Enrollment",
    color: "hsl(var(--chart-1))",
  },
  PresentCount: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
  UnexAbsCount: {
    label: "Unexcused",
    color: "hsl(var(--chart-3))",
  },
  SARBTardyCount: {
    label: "SARB Tardy",
    color: "hsl(var(--chart-4))",
  },
  MedIllCount: {
    label: "Medical",
    color: "hsl(var(--chart-5))",
  },
  TardyCount: {
    label: "Tardy",
    color: "hsl(var(--chart-6))",
  },
  SuspendedCount: {
    label: "Suspended",
    color: "hsl(var(--chart-7))",
  },
  ExcsdAbsncCount: {
    label: "Excused",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig;

export function AttendanceOverTimeChart({
  session,
  itinalChartData,
  chartTitle = "School Attendance",
}: {
  session: Session;
  itinalChartData?: SchoolAttendanceData[];
  chartTitle?: string;
  }) {
  console.log(session)
  console.log(`School Attendance ${session.user.manualSchool}`)
  const [chartData, setChartData] = useState<
    SchoolAttendanceData[] | undefined
  >(itinalChartData || []);
  const [loading, setLoading] = useState(false);

  // console.log(chartData)
  // console.log(itinalChartData)

  useEffect(() => {
    if (itinalChartData) {
      setLoading(false);
    }
    if (!itinalChartData) {
      setLoading(true);

      const fetchData = async () => {
        const queryLabel = "daily-attendance-school";
        const { data, query } = await getQueryData({ queryLabel });
        // console.log(data)
        // console.log(query)
        if (!data) return;
        setChartData(data);
        setLoading(false);
      };

      fetchData();
    }
  }, []);

  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.dt);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  if (loading || !chartData) {
    return (
      <Skeleton className="h-[400px] w-full pb-2">
        <div className="h-full w-full animate-pulse rounded-xl bg-muted/20" />
      </Skeleton>
    );
  }
  return (
    <Card className="h-[400px] w-full pb-2">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            <Link href="/query/school/clziv5kbm00018un4swvvb5a7">
              {chartTitle}
            </Link>
          </CardTitle>
          <CardDescription>School attendance</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="365d" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1 ))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1 ))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {/* <Area
              dataKey="TotalEnrollment"
              type="natural"
              fill="url(#fillMobile)"
              stroke="hsl(var(--chart-2))"
              stackId="b"
            /> */}
            {/* <Area
              dataKey="PresentCount"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="hsl(var(--chart-1))"
              stackId="a"
            /> */}
            <Area
              dataKey="UnexAbsCount"
              type="natural"
              fill="hsl(var(--chart-3))"
              stroke="hsl(var(--chart-3))"
              stackId="c"
            />
            <Area
              dataKey="TardyCount"
              type="natural"
              fill="hsl(var(--chart-4))"
              stroke="hsl(var(--chart-4))"
              stackId="c"
            />
            <Area
              dataKey="SARBTardyCount"
              type="natural"
              fill="hsl(var(--chart-5))"
              stroke="hsl(var(--chart-5))"
              stackId="c"
            />
            <Area
              dataKey="SuspendedCount"
              type="natural"
              fill="hsl(var(--chart-6))"
              stroke="hsl(var(--chart-6))"
              stackId="c"
            />
            <Area
              dataKey="MedIllCount"
              type="natural"
              fill="hsl(var(--chart-7))"
              stroke="hsl(var(--chart-7))"
              stackId="c"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
