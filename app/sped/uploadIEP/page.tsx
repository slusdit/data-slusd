import IepDropzone from "@/app/components/IepUploadDropzone";

const uploadIEP = () => {
  return (
    <div>
      <h1>Upload IEP At a Glance</h1>
      <p>
        This page is for uploading Individualized Education Programs (IEPs)
        downloaded from SEIS.
      </p>
      
        <IepDropzone />

    </div>
  );
};

export default uploadIEP;
