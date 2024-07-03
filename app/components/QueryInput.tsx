"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { runQuery } from "@/lib/aeries";
import { IRecordSet } from "mssql";
import { useState } from "react";
import DataTable from "@/app/components/DataTable";

const QueryInput = ({
  initialValue: initialQueryRow,
  initialResult = undefined,
}: {
  initialValue: any;
  initialResult: IRecordSet<any> | undefined;
}) => {
  const [value, setValue] = useState(initialQueryRow);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState(initialResult);
  const handleQuery = () => runQuery(value).then(setResult).catch(setError);
  return (
    <div className="mt-4">
      <div className="flex flex-col w-full items-center justify-center gap-2">
        <Textarea
          name="query"
          id="query"
          value={value}
          className="w-1/2 place-content-start"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="outline" onClick={handleQuery}>
          Query
        </Button>
      </div>

      <div>{error && <div>Error: {error}</div>}</div>

      <div className="mt-2 flex  justify-center w-full">
        
          <DataTable data={result} />
        
      </div>
    </div>
  );
};

export default QueryInput;
