"use client";

import { SessionUser } from "@/auth";
import { Card, CardTitle } from "@/components/ui/card";
import { getQueryData } from "@/lib/getQuery";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";

const FavoritesCard = ({ user }: { user: SessionUser }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [queryData, setQueryData] = useState([]);
    const [category, setCategory] = useState();
    console.log(user.favorites)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const queryData = await getQueryData({ queryLabel: "daily-attendance-school" });
                console.log(queryData)
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
        <h1 className="text-3xl font-weight-800 mb-5 text-center">
          Welcome {user?.name}
        </h1>
        {/* Main section for district users */}
        <div className="grid grid-cols-1 h-lg w-md items-center">
          Add reports to your favorites to view them here
        </div>
      </Card>
    );
  }
  if (user.activeSchool == 0) {
    return (
      <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
        <h1 className="text-3xl font-weight-800 mb-5 text-center">
          Welcome {user?.name}
        </h1>
        {/* Main section for district users */}

        <div className="grid grid-cols-1 h-lg w-md items-center">
          District View
        </div>
      </Card>
    );
  }
    return (
      
    <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
      <h1 className="text-3xl font-weight-800 mb-5 text-center">
        Welcome {user?.name}
      </h1>

      <div className="grid grid-cols-2 h-lg w-md items-center">
        {user.favorites.map((query) => (
            <Card className="w-full p-2 mr-4 justify-center flex flex-col h-full">
                <Link href={`/query/${query.category.label.toLowerCase()}/${query.id}`}>
            <CardTitle className="mb-5 text-center">
              {query.name}
                </CardTitle>
                </Link>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default FavoritesCard;
