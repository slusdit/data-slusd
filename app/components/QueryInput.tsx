"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { runQuery } from "@/lib/aeries";
import { IRecordSet } from "mssql";
import { useState } from "react";

const QueryInput = ({
  initialValue = "",
  initialResult = undefined,
}: {
  initialValue: string;
  initialResult: IRecordSet<any> | undefined;
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState(initialResult);
  const handleQuery = () => runQuery(value).then(setResult).catch(setError);
  return (
    <div>
      <div className="flex w-full items-center justify-center gap-2">
        <Input
          type="text"
          name="query"
          id="query"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="outline" onClick={handleQuery}>
          Query
        </Button>
      </div>

      <div>
        Error:
        <span>{JSON.stringify(error)}</span>
      </div>
      <div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export default QueryInput;
