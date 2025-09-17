import IepDropzone from "@/app/components/IepUploadDropzone";

const uploadIEP = () => {
  return (
    <div>
      <h1>Upload IEP</h1>
      <p>This page is for uploading Individualized Education Programs (IEPs).</p>
      <IepDropzone />
    </div>
  );
};

export default uploadIEP;