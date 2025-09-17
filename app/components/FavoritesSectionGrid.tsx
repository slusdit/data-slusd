"use client";

import { SessionUser } from "@/auth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getQueryData } from "@/lib/getQuery";
import { runQuery } from "@/lib/aeries";
import { createChartOptions } from "@/lib/chartOptions";
import { use, useEffect, useMemo, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import { useTheme } from "next-themes";

interface FavoriteData {
  query: any;
  data: any[];
  chartOptions: any;
  loading: boolean;
  error: string | null;
}

const FavoritesSectionGrid = ({ user }: { user: SessionUser }) => {
  const [favoritesData, setFavoritesData] = useState<Record<string, FavoriteData>>({});
  const [globalLoading, setGlobalLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchAllFavorites = async () => {
      if (user.favorites.length === 0) return;

      setGlobalLoading(true);
      
      // Initialize loading state for each favorite
      const initialState: Record<string, FavoriteData> = {};
      user.favorites.forEach(query => {
        if (query.chart) {
          initialState[query.id] = {
            query,
            data: [],
            chartOptions: null,
            loading: true,
            error: null
          };
        }
      });
      setFavoritesData(initialState);

      // Create promises for all data fetching operations
      const fetchPromises = user.favorites
        .filter(query => query.chart)
        .map(async (query) => {
          try {
            // Fetch query data
            const response = await runQuery(query.query);
            
            // Create chart options
            const chartOptions = await createChartOptions({
              chartTitle: query.name,
              chartXKey: query.chartXKey,
              chartYKey: query.chartYKey,
              chartTypeKey: query.chartTypeKey,
              rowData: response,
              visibleColumns: query.hiddenCols?.split(",") || [],
              chartStackKey: query.chartStackKey || false,
              aggFunction: "sum",
              theme: theme,
            });

            return {
              id: query.id,
              query,
              data: response,
              chartOptions,
              loading: false,
              error: null
            };
          } catch (error) {
            console.error(`Error fetching data for query ${query.id}:`, error);
            return {
              id: query.id,
              query,
              data: [],
              chartOptions: null,
              loading: false,
              error: "Error fetching data"
            };
          }
        });

      // Execute all promises in parallel, but update state individually
      fetchPromises.forEach(async (promise) => {
        try {
          const result = await promise;
          
          // Update state immediately when this individual request completes
          setFavoritesData(prev => ({
            ...prev,
            [result.id]: result
          }));
        } catch (error) {
          console.error("Error in individual fetch:", error);
        }
      });

      // Wait for all to complete for global loading state
      try {
        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error in parallel fetch:", error);
      } finally {
        setGlobalLoading(false);
      }
    };

    fetchAllFavorites();
  }, [user.favorites, theme]);

  if (user.favorites.length === 0) {
    return (
      <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
        <CardTitle className="mb-5 text-center">Welcome {user?.name}</CardTitle>
        <CardContent className="grid grid-cols-1 h-lg w-md items-center">
          Add reports to your favorites to view them here
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full shadow-md">
      <CardTitle className="mb-5 text-center">Welcome {user?.name}</CardTitle>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-lg w-md gap-4 items-center">
        {((user && !user.favorites) || (user && user.favorites.length === 0)) ? (
          <div className="grid grid-cols-1 h-lg w-md items-center">
            Add reports to your favorites to view them here
          </div>
        ) : (user &&
          user.favorites.map((query) => {
            if (query.chart) {
              const favoriteData = favoritesData[query.id];
            return (
              <FavoriteCard 
                key={query.id} 
                query={query} 
                user={user} 
                theme={theme}
                data={favoriteData?.data || []}
                chartOptions={favoriteData?.chartOptions}
                loading={favoriteData?.loading ?? true}
                error={favoriteData?.error}
              />
            );
            }
            return null;
          })
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesSectionGrid;