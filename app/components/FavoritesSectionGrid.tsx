"use client";

import { SessionUser } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getQueryData } from "@/lib/getQuery";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import FavoriteCard from "./FavoriteCard";

function createChartOptions({
  chartTitle,
  chartXKey,
  chartYKey,
  chartTypeKey,
  visibleColumns,
  chartStackKey,
  aggFunction,
}: {
  chartTitle?: string | null;
  chartXKey?: string | null;
  chartYKey?: string | null;
  chartTypeKey?: string | null;
  visibleColumns?: string[];
  chartStackKey?: boolean | null;
  aggFunction?: string | null;
}) {
  const baseChartOptions = {
    autoSize: true,
    title: {
      text: chartTitle || "Data Chart",
    },
    theme: theme === "dark" ? `${agTheme}-dark` : `${agTheme}`,
    data: selectedRows.length ? selectedRows : rowData,
    series: [
      {
        type: chartTypeKey || "bar",
        xKey: chartXKey || "SC",
        yKey: chartYKey || "ID",
        cornerRadius: 5,
      },
    ],
  };
}
const FavoritesSectionGrid = ({ user }: { user: SessionUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryData, setQueryData] = useState([]);
  const [category, setCategory] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const queryData = await getQueryData({ queryId: user.favorites[0] });
        // console.log(queryData)
        setQueryData(queryData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (user.favorites.length == 0) {
    return (
      <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
        <CardTitle className="mb-5 text-center">Welcome {user?.name}</CardTitle>
        {/* Main section for district users */}
        <CardContent className="grid grid-cols-1 h-lg w-md items-center">
          Add reports to your favorites to view them here
        </CardContent>
      </Card>
    );
  }
  // if (user.activeSchool == 0) {
  //   return (
  //     <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
  //       <h1 className="text-3xl font-weight-800 mb-5 text-center">
  //         Welcome {user?.name}
  //       </h1>
  //       {/* Main section for district users */}

  //       <div className="grid grid-cols-1 h-lg w-md items-center">
  //         District View
  //       </div>
  //     </Card>
  //   );
  // }
  return (
    <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
      <CardTitle className="mb-5 text-center">Welcome {user?.name}</CardTitle>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-lg w-md gap-4 items-center">
        {user.favorites.map((query) => {
          if (query.chart) {
            return <FavoriteCard key={query.id} query={query} user={user} />;
          }
        })}
      </CardContent>
    </Card>
  );
};

export default FavoritesSectionGrid;
