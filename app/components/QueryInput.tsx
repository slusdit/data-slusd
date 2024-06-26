"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { runQuery } from "@/lib/aeries";
import { IRecordSet } from "mssql";
import { useState } from "react";
import DynamicTable from "./DynamicTable";
import { format } from "sql-formatter";

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
    <div>
      <div className="flex w-full items-center justify-center gap-2">
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

      <div>
        {error && <div>Error: {error}</div>}
       
      </div>
      <div>
        <div className="mt-4 flex items-center justify-center w-full">
          <div className="m-auto">
            
        <DynamicTable data={result} />
        </div>
        </div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export default QueryInput;
