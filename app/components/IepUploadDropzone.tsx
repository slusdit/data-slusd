'use client';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useEffect, useState } from 'react';
import { apiAuth, uploadIEP } from '@/lib/fastAPI';

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
  errors: string[];
}

const IepDropzone = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Move useEffect to the top level of the component
  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const authResponse = await apiAuth();
        const token = authResponse.token;
        setAuthToken(token);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };
    
    fetchAuthToken();
  }, []);

  const handleDrop = async (files: File[]) => {
    console.log('Files dropped:', files);
    setFiles(files);
    setUploadResult(null); // Clear previous results
    setUploadError(null); // Clear previous errors
    
    // Now you can use the authToken here if needed
    if (authToken && files.length > 0) {
      setIsUploading(true);
      try {
        const uploadResponse = await uploadIEP(files, authToken);
        console.log('Upload response:', uploadResponse);
        
        // Parse the JSON response
        const parsedResponse: UploadResponse = JSON.parse(uploadResponse);
        setUploadResult(parsedResponse);
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadError(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Dropzone
        accept={{ 'application/pdf': [] }}
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
      
      {isUploading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">Uploading and processing files...</p>
        </div>
      )}

      {uploadError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700 font-semibold">Upload Error:</p>
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      {uploadResult && (
        <div className="mt-6 space-y-4">
          {/* Success Message */}
          <div className={`p-4 rounded-md ${uploadResult.status === 'SUCCESS' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <p className={`text-sm font-semibold ${uploadResult.status === 'SUCCESS' ? 'text-green-700' : 'text-yellow-700'}`}>
              Status: {uploadResult.status}
            </p>
            <p className={`text-sm ${uploadResult.status === 'SUCCESS' ? 'text-green-600' : 'text-yellow-600'}`}>
              {uploadResult.message}
            </p>
          </div>

          {/* Display errors if any */}
          {uploadResult.errors && uploadResult.errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700 font-semibold">Errors:</p>
              <ul className="list-disc list-inside">
                {uploadResult.errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-600">{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* IEP Documents Table */}
          {uploadResult.extracted_docs && uploadResult.extracted_docs.length > 0 && (
            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold mb-3">Processed IEP Documents</h3>
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
                        {doc.stu_id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                        {doc.iep_date}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                        {doc.pages}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 break-all">
                        {doc.file}
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