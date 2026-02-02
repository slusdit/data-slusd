// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/exportData";
import { Loader2 } from "lucide-react";

const ExportCsvButton = ({
  data,
  showLoading = false,
} : {
  data: any[];
  showLoading?: boolean;
    }) => {
    
  return (
    <div className="flex justify-between items-center">
      <Button
        onClick={exportToCSV}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={showLoading || !data?.length}
      >
        {showLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          "Export to CSV"
        )}
      </Button>
    </div>
  );
};

export default ExportCsvButton;
