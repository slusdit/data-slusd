"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { removeCommentsFromQuery, runQuery } from "@/lib/aeries";
import { IRecordSet } from "mssql";
import { useEffect, useState } from "react";
import DataTable from "@/app/components/DataTable";
import { format } from "sql-formatter";
import { LoaderCircle } from "lucide-react";

const QueryInput = ({
  id,
  initialValue: initialQueryRow,
  initialResult = undefined,
  showChart = false,
  chartTitle,
}: {
  id: string;
  initialValue: any;
  initialResult: IRecordSet<any> | undefined;
  showChart?: boolean;
  chartTitle?: string;
}) => {
  const [value, setValue] = useState("");

  const [error, setError] = useState<string>();
  const [result, setResult] = useState(initialResult);
  const [loading, setLoading] = useState(false);
  function formatAndSetValue(value: string) {
    const formattedValue = format(value, { language: "tsql" }) || value;
    console.log(formattedValue);

    setValue(formattedValue);
    return null;
  }

  useEffect(() => {
    formatAndSetValue(initialQueryRow);
  }, []);

  const handleQuery = async () => {
    setLoading(true);
    // console.log(value);

    const cleanQuery = await removeCommentsFromQuery(value);

    // console.log(cleanQuery);
    runQuery(cleanQuery)
      .then(setResult)
      .then()
      .catch(setError)
      .finally(() => setLoading(false));
    // setLoading(false);
  };

  console.log(showChart);

  return (
    <div className="mt-4">
      <div className="flex flex-col w-full items-center justify-center gap-2">
        <Textarea
          name="query"
          id="query"
          typeof="code"
          value={value}
          className="w-1/2 place-content-start whitespace-pre-wrap min-h-40"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="outline" onClick={handleQuery}>
          Query
        </Button>
      </div>

      <div>{error && <div>Error: {error}</div>}</div>

      <div>
        {loading ? (
          <div className="mt-2 flex  justify-center w-full">
            Loading...
            <LoaderCircle className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <div className="mt-2 flex  justify-center w-full">
            <DataTable
              data={result}
              showChart={showChart}
              chartTitle={chartTitle}
              id={id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryInput;
