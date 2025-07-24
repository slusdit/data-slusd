"use client";

import { SessionUser } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getQueryData } from "@/lib/getQuery";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import { useTheme } from "next-themes";

const FavoritesSectionGrid = ({ user }: { user: SessionUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryData, setQueryData] = useState([]);
  const [category, setCategory] = useState();

  const { theme } = useTheme();
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
  if (user && user?.favorites?.length == 0) {
    return (
      <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full ">
        <CardTitle className="mb-5 text-center">Welcome {user?.name}</CardTitle>
        {/* Main section for district users */}
        <CardContent className="grid grid-cols-1 h-lg w-md items-center">
          Add reports to your favorites to view them here
        </CardContent>
      </Card>
    );
  }

  return (
    // <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
    <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full shadow-md ">
      <CardTitle className="mb-5 text-center">Welcome {user?.name}</CardTitle>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-lg w-md gap-4 items-center">
        {((user && !user.favorites) || (user && user.favorites.length === 0)) ? (
          <div className="grid grid-cols-1 h-lg w-md items-center">
            Add reports to your favorites to view them here
          </div>
        ) : (user &&
          user.favorites.map((query) => {
            if (query.chart) {
              return <FavoriteCard key={query.id} query={query} user={user} theme={theme} />;
            }
            return null;
          })
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesSectionGrid;
