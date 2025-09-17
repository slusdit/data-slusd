'use client';
// import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/kibo-ui/dropzone';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useEffect, useState } from 'react';
// Import post from a suitable HTTP library, e.g. axios or fetch wrapper
import axios from 'axios';

const IepDropzone = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    useEffect(() => {
      const fetchAuthToken = async () => {
        const authToken = await axios.post(`${process.env.NEXT_PUBLIC_FAST_API_URL}/api/token`,
          {
            username: process.env.NEXT_PUBLIC_FAST_API_USER,
            password: process.env.NEXT_PUBLIC_FAST_API_PASSWORD,
          }

        ).then((res) => res.data);
        console.log('Auth Token:', authToken);
      };
      fetchAuthToken();
    }, []);
  };
  return (
    <Dropzone
      accept={{ 'PDF/*': [] }}
      maxFiles={10}
      maxSize={1024 * 1024 * 10}
      minSize={1024}
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