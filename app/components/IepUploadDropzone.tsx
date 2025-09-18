"use client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useEffect, useState } from "react";
import { apiAuth, uploadIEP } from "@/lib/fastAPI";
import { Progress } from "@/components/ui/progress";

// Define TypeScript interfaces for the response
interface ExtractedDoc {
  file: string;
  stu_id: string;
  iep_date: string;
  pages: number;
}

interface UploadResponse {
  status: string;
  message: string;
  total_documents: number;
  extracted_docs: ExtractedDoc[];
  errors: (string | any)[]; // Allow for different error types
}

const IepDropzone = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Move useEffect to the top level of the component
  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const authResponse = await apiAuth();
        const token = authResponse.token;
        setAuthToken(token);
      } catch (error) {
        console.error("Error fetching auth token:", error);
      }
    };

    fetchAuthToken();
  }, []);

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval);
          return 90; // Stop at 90% until actual upload completes
        }
        // Simulate natural progress curve - faster at start, slower as it approaches 90%
        const increment = Math.max(1, Math.floor((90 - prevProgress) / 10));
        return prevProgress + increment;
      });
    }, 200); // Update every 200ms
    return interval;
  };

  const handleDrop = async (files: File[]) => {
    console.log("Files dropped:", files);
    setFiles(files);
    setUploadResult(null); // Clear previous results
    setUploadError(null); // Clear previous errors
    setProgress(0); // Reset progress

    // Now you can use the authToken here if needed
    if (authToken && files.length > 0) {
      setIsUploading(true);

      // Start progress simulation
      const progressInterval = simulateProgress();

      try {
        const uploadResponse = await uploadIEP(files, authToken);
        console.log("Raw upload response:", uploadResponse);

        // Complete the progress bar
        setProgress(100);
        clearInterval(progressInterval);

        // Parse the JSON response with better error handling
        let parsedResponse: UploadResponse;
        try {
          // Check if uploadResponse is already an object or a string
          if (typeof uploadResponse === 'string') {
            parsedResponse = JSON.parse(uploadResponse);
          } else if (typeof uploadResponse === 'object' && uploadResponse !== null) {
            parsedResponse = uploadResponse as UploadResponse;
          } else {
            throw new Error('Invalid response format');
          }
          
          console.log("Parsed response:", parsedResponse);
          setUploadResult(parsedResponse);
        } catch (parseError) {
          console.error('Failed to parse upload response:', parseError);
          console.error('Upload response was:', uploadResponse);
          throw new Error(`Invalid response format from server: ${parseError.message}`);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        clearInterval(progressInterval);
        setProgress(0); // Reset progress on error
        setUploadError(
          error instanceof Error ? error.message : "Upload failed"
        );
      } finally {
        setIsUploading(false);
        // Reset progress after a short delay to show completion
        setTimeout(() => {
          if (!uploadError) {
            setProgress(0);
          }
        }, 2000);
      }
    }
  };

  const parseErrorObject = (error: any) => {
    try {
      if (typeof error === 'string') {
        // Try to parse JSON string
        const parsed = JSON.parse(error);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
        return { message: error };
      } else if (typeof error === 'object' && error !== null) {
        return error;
      }
      return { message: String(error) };
    } catch {
      // If parsing fails, treat as plain message
      return { message: typeof error === 'string' ? error : String(error) };
    }
  };

  return (
    <div className="flex flex-col items-center margin-auto justify-center w-full">
      <div className="w-96 border-primary/50 border-2 rounded-md mt-4 flex items-center justify-center">
        <Dropzone
          accept={{ "application/pdf": [] }}
          maxFiles={10}
          maxSize={1024 * 1024 * 10} // 10MB
          minSize={1024} // 1KB
          onDrop={handleDrop}
          onError={console.error}
          src={files}
          disabled={isUploading}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>

      {isUploading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md space-y-3 w-96">
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-700 font-medium">
              Uploading and processing files...
            </p>
            <span className="text-sm text-blue-600 font-mono">{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-xs text-blue-600">
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
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md w-96">
          <p className="text-sm text-red-700 font-semibold">Upload Error:</p>
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      {uploadResult && (
        <div className="mt-6 space-y-4 w-full max-w-4xl">
          {/* Success Message */}
          <div
            className={`p-4 rounded-md ${
              uploadResult.status === "SUCCESS"
                ? "bg-green-50 border border-green-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                uploadResult.status === "SUCCESS"
                  ? "text-green-700"
                  : "text-yellow-700"
              }`}
            >
              Status: {uploadResult.status}
            </p>
            <p
              className={`text-sm ${
                uploadResult.status === "SUCCESS"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {uploadResult.message}
            </p>
          </div>

          {/* Display errors if any */}
          {uploadResult.errors && uploadResult.errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700 font-semibold mb-3">Processing Errors:</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-red-300 bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="border border-red-300 px-3 py-2 text-left text-sm font-semibold text-red-800">
                        Student ID
                      </th>
                      <th className="border border-red-300 px-3 py-2 text-left text-sm font-semibold text-red-800">
                        IEP Date
                      </th>
                      <th className="border border-red-300 px-3 py-2 text-left text-sm font-semibold text-red-800">
                        Error Message
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadResult.errors.map((error, index) => {
                      const parsedError = parseErrorObject(error);
                      return (
                        <tr key={index} className="hover:bg-red-50">
                          <td className="border border-red-300 px-3 py-2 text-sm text-red-900">
                            {parsedError.stu_id || 'N/A'}
                          </td>
                          <td className="border border-red-300 px-3 py-2 text-sm text-red-900">
                            {parsedError.iep_date || 'N/A'}
                          </td>
                          <td className="border border-red-300 px-3 py-2 text-sm text-red-900">
                            {parsedError.message || 'Unknown error'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="text-xs text-red-600 mt-2">
                  {uploadResult.errors.length} error{uploadResult.errors.length !== 1 ? 's' : ''} encountered during processing
                </p>
              </div>
            </div>
          )}

          {/* IEP Documents Table */}
          {uploadResult.extracted_docs &&
            uploadResult.extracted_docs.length > 0 && (
              <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold mb-3">
                  Processed IEP Documents
                </h3>
                <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Student ID
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        IEP Date
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Pages
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        File Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadResult.extracted_docs.map((doc, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                          {String(doc.stu_id)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                          {String(doc.iep_date)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                          {String(doc.pages)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 break-all">
                          {String(doc.file)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2">
                  Total documents processed: {uploadResult.total_documents}
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default IepDropzone;