'use client';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useEffect, useState } from 'react';
import { apiAuth, uploadIEP } from '@/lib/fastAPI';


const IepDropzone = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [authToken, setAuthToken] = useState<string | null>(null);

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

  const handleDrop = (files: File[]) => {
    console.log('Files dropped:', files);
    setFiles(files);
    
    // Now you can use the authToken here if needed
    if (authToken) {
      const uploadResponse = uploadIEP(files, authToken);
      console.log('Upload response:', uploadResponse);
    }
  };

  return (
    <Dropzone
      accept={{ 'application/pdf': [] }}
      maxFiles={10}
      maxSize={1024 * 1024 * 10} // 10MB
      minSize={1024} // 1KB
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};

export default IepDropzone;