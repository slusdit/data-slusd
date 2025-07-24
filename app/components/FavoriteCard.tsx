'use client';

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";
import { SessionUser } from "@/auth";
import { DataChart } from "./DataChart";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const FavoriteCard = ({
    query,
    user, 
    theme,
    data = [],
    chartOptions = null,
    loading = true,
    error = null
}: {
    query: QueryWithCategory;
    user: SessionUser;
    theme?: string;
    data?: any[];
    chartOptions?: any;
    loading?: boolean;
    error?: string | null;
}) => {
    if (!theme) {
        const { theme: providerTheme } = useTheme();
        theme = providerTheme;
    }

    const [agGridTheme, setAgGridTheme] = useState(
        theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
    );

    // Update theme when it changes
    useEffect(() => {
        setAgGridTheme(theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz");
    }, [theme]);

    return (       
        <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full shadow-md" key={query.id}>
            <Badge className="mb-5 text-center w-fit text-xs opacity-50">
                {query.category.label}
            </Badge>
            <Link href={query.widgetLinkOverride || `/query/${query.category.label.toLowerCase()}/${query.id}`}>
                <CardTitle className="mb-5 text-center">
                    {query.name}
                </CardTitle>

                <CardContent>
                    {loading || !chartOptions ? (
                        <Skeleton className="text-center grid place-items-center h-[300px]">
                            {error ? `Error: ${error}` : "Loading..."}
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