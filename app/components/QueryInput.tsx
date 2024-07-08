"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { removeCommentsFromQuery, runQuery } from "@/lib/aeries";
import { IRecordSet } from "mssql";
import { useState } from "react";
import DataTable from "@/app/components/DataTable";

const QueryInput = ({
  initialValue: initialQueryRow,
  initialResult = undefined,
  showChart = false,
  chartTitle
}: {
  initialValue: any;
  initialResult: IRecordSet<any> | undefined;
  showChart?: boolean;
  chartTitle?: string;
}) => {
  const [value, setValue] = useState(initialQueryRow);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState(initialResult);
  const handleQuery = async () =>{
    console.log(value);
    
    const cleanQuery = await removeCommentsFromQuery(value);

    console.log(cleanQuery);
    runQuery(cleanQuery).then(setResult).catch(setError);
  }

  console.log(showChart)
    
  return (
    <div className="mt-4">
      <div className="flex flex-col w-full items-center justify-center gap-2">
        <Textarea
          name="query"
          id="query"
          value={value}
          className="w-1/2 place-content-start whitespace-pre-wrap"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="outline" onClick={handleQuery}>
          Query
        </Button>
      </div>

      <div>{error && <div>Error: {error}</div>}</div>

      <div className="mt-2 flex  justify-center w-full">
        
          <DataTable data={result} showChart={showChart} chartTitle={chartTitle}/>
        
      </div>
    </div>
  );
};

export default QueryInput;
