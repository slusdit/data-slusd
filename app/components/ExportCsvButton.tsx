"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Serialize an array of row objects to CSV, quoting/escaping every field.
 */
function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Array.from(
    rows.reduce<Set<string>>((keys, row) => {
      Object.keys(row).forEach((k) => keys.add(k));
      return keys;
    }, new Set())
  );

  const escape = (value: unknown): string => {
    const str = value == null ? "" : String(value);
    // Always quote and double any embedded quotes to stay valid for commas/newlines.
    return `"${str.replace(/"/g, '""')}"`;
  };

  const lines = [
    headers.map(escape).join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ];
  return lines.join("\r\n");
}

const ExportCsvButton = ({
  data,
  showLoading = false,
  filename = "export.csv",
}: {
  data: Record<string, unknown>[];
  showLoading?: boolean;
  filename?: string;
}) => {
  const handleExport = () => {
    if (!data?.length) {
      toast.error("There is no data to export.");
      return;
    }
    try {
      const csv = toCsv(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Exported ${data.length} row${data.length === 1 ? "" : "s"} to CSV.`);
    } catch (error) {
      console.error("CSV export failed:", error);
      toast.error("Failed to export CSV.");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={handleExport}
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
