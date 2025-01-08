'use client';

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";
import { runQuery } from "@/lib/aeries";
import { SessionUser } from "@/auth";
import DataTableAgGrid from "./DataTableAgGrid";
import { DataChart } from "./DataChart";
import { createChartOptions } from "@/lib/chartOptions";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const FavoriteCard = ({
    query,
    user
}: {
    query: QueryWithCategory;
    user: SessionUser
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chartOptions, setChartOptions] = useState({});
    
    const { theme } = useTheme() || "light";


    // useEffect(() => {
    //     console.log("chartOptions updated:", chartOptions);
    // }, [chartOptions]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await runQuery(query.query);
                const chartOpt = await createChartOptions({
                    chartTitle: query.name,
                    chartXKey: query.chartXKey,
                    chartYKey: query.chartYKey,
                    chartTypeKey: query.chartTypeKey,
                    rowData: response,
                    visibleColumns: query.hiddenCols.split(","),
                    chartStackKey: query.chartStackKey || false,
                    aggFunction: "sum"
                });
                
                setData(response);
                setChartOptions(chartOpt); // This is async
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]); // Add query as a dependency

    return (       
        <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full" key={query.id}>
            <Badge className="mb-5 text-center w-fit text-xs opacity-50">
                {query.category.label}
            </Badge>
            <Link href={query.widgetLinkOverride ? query.widgetLinkOverride : `/query/${query.category.label.toLowerCase()}/${query.id}`}>
                <CardTitle className="mb-5 text-center">
                    {query.name}
                </CardTitle>

                <CardContent>
                    {loading ? (
                        <Skeleton className="text-center grid place-items-center h-[300px]">
                            Loading...
                        </Skeleton>
                    ) : (
                        <DataChart chartOptions={chartOptions} theme={theme} />
                    )}
                </CardContent>
            </Link>
        </Card>
    );
};

export default FavoriteCard;