"use client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useMemo, useState } from "react";
import { uploadRFEP } from "@/lib/fastAPI";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Expected FastAPI response. Mirrors the IEP upload contract; adjust once the
// RFEP endpoint is built.
interface ExtractedDoc {
  file: string;
  stu_id: string;
  rfep_date: string;
  pages: number;
}

interface RfepError {
  stu_id?: string;
  rfep_date?: string;
  file?: string;
  message?: string;
}

interface UploadResponse {
  status: string;
  message: string;
  total_documents: number;
  extracted_docs: ExtractedDoc[];
  errors: unknown[];
}

const parseError = (error: unknown): RfepError => {
  if (typeof error === "object" && error !== null) return error as RfepError;
  if (typeof error === "string") {
    try {
      const parsed = JSON.parse(error);
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
      // plain message
    }
    return { message: error };
  }
  return { message: String(error) };
};

const csvCell = (value: string) =>
  /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

const RfepDropzone = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateProgress = () => {
    setProgress(0);
    return setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90; // hold until the upload completes
        return prev + Math.max(1, Math.floor((90 - prev) / 10));
      });
    }, 200);
  };

  const handleDrop = async (dropped: File[]) => {
    setFiles(dropped);
    setUploadResult(null);
    setUploadError(null);
    setProgress(0);
    if (dropped.length === 0) return;

    setIsUploading(true);
    const progressInterval = simulateProgress();
    try {
      const response = await uploadRFEP(dropped);
      const parsed: UploadResponse =
        typeof response === "string" ? JSON.parse(response) : response;
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid response format from server");
      }
      setProgress(100);
      setUploadResult(parsed);
    } catch (error) {
      console.error("RFEP upload failed:", error);
      setProgress(0);
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
    }
  };

  const errors = useMemo(
    () => (uploadResult?.errors ?? []).map(parseError),
    [uploadResult]
  );

  const successfulDocs = useMemo(() => {
    const errorIds = new Set(errors.map((e) => e.stu_id).filter(Boolean));
    return (uploadResult?.extracted_docs ?? []).filter(
      (doc) => !errorIds.has(String(doc.stu_id))
    );
  }, [uploadResult, errors]);

  const downloadErrorsAsCsv = () => {
    if (errors.length === 0) return;
    const headers = ["Row", "Student ID", "RFEP Date", "File", "Error Message"];
    const rows = errors.map((e, i) => [
      String(i + 1),
      e.stu_id || "N/A",
      e.rfep_date || "N/A",
      e.file || "N/A",
      e.message || "Unknown error",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    link.href = url;
    link.download = `RFEP_Upload_Errors_${timestamp}.csv`;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isSuccess = uploadResult?.status === "SUCCESS";

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-96 max-w-full border-primary/50 border-2 rounded-md mt-4 flex items-center justify-center">
        <Dropzone
          accept={{ "application/pdf": [] }}
          maxFiles={10}
          maxSize={1024 * 1024 * 10} // 10MB
          minSize={1024} // 1KB
          onDrop={handleDrop}
          onError={(error) => setUploadError(error.message)}
          src={files}
          disabled={isUploading}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>

      {isUploading && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md space-y-3 w-96 max-w-full">
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              Uploading and processing files...
            </p>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-mono">{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-xs text-blue-600 dark:text-blue-400">
            {progress < 30
              ? "Uploading files..."
              : progress < 70
              ? "Processing documents..."
              : progress < 90
              ? "Extracting information..."
              : "Finalizing..."}
          </p>
        </div>
      )}

      {uploadError && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md w-96 max-w-full">
          <p className="text-sm text-red-700 dark:text-red-300 font-semibold">Upload Error:</p>
          <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
        </div>
      )}

      {uploadResult && (
        <div className="mt-6 space-y-4 w-full max-w-4xl">
          <div
            className={`p-4 rounded-md border ${
              isSuccess
                ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                : "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                isSuccess ? "text-green-700 dark:text-green-300" : "text-yellow-700 dark:text-yellow-300"
              }`}
            >
              Status: {uploadResult.status}
            </p>
            <p
              className={`text-sm ${
                isSuccess ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {uploadResult.message}
            </p>
          </div>

          {errors.length > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-red-700 dark:text-red-300 font-semibold">
                  Processing Errors:
                </p>
                <Button
                  onClick={downloadErrorsAsCsv}
                  variant="outline"
                  size="sm"
                  className="text-red-700 border-red-300 hover:bg-red-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Errors
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-red-300 bg-background rounded-lg shadow-xs">
                  <thead>
                    <tr className="bg-red-100 dark:bg-red-900">
                      {["Student ID", "RFEP Date", "File", "Error Message"].map((h) => (
                        <th
                          key={h}
                          className="border border-red-300 px-3 py-2 text-left text-sm font-semibold text-red-800 dark:text-red-200"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((e, index) => (
                      <tr key={index}>
                        <td className="border border-red-300 px-3 py-2 text-sm">{e.stu_id || "N/A"}</td>
                        <td className="border border-red-300 px-3 py-2 text-sm">{e.rfep_date || "N/A"}</td>
                        <td className="border border-red-300 px-3 py-2 text-sm break-all">{e.file || "N/A"}</td>
                        <td className="border border-red-300 px-3 py-2 text-sm">{e.message || "Unknown error"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  {errors.length} error{errors.length !== 1 ? "s" : ""} encountered during processing
                </p>
              </div>
            </div>
          )}

          {successfulDocs.length > 0 && (
            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold mb-1">Uploaded RFEP Documents</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {successfulDocs.length} document{successfulDocs.length !== 1 ? "s" : ""} successfully uploaded
              </p>
              <table className="w-full border-collapse border bg-background rounded-lg shadow-xs">
                <thead>
                  <tr className="bg-muted">
                    {["Student ID", "RFEP Date", "Pages", "File Name"].map((h) => (
                      <th key={h} className="border px-4 py-2 text-left text-sm font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {successfulDocs.map((doc, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border px-4 py-2 text-sm">{String(doc.stu_id)}</td>
                      <td className="border px-4 py-2 text-sm">{String(doc.rfep_date)}</td>
                      <td className="border px-4 py-2 text-sm">{String(doc.pages)}</td>
                      <td className="border px-4 py-2 text-sm break-all">{String(doc.file)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RfepDropzone;
