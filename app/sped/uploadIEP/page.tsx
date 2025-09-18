import IepDropzone from "@/app/components/IepUploadDropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Upload, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/app/components/BackButton";

const uploadIEP = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <BackButton />
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">IEP Upload Center</h1>
            <p className="text-lg text-muted-foreground">
              Upload and process Individualized Education Program documents
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-xs">
            Special Education
          </Badge>
          <Badge variant="outline" className="text-xs">
            SEIS Integration
          </Badge>
        </div>
      </div>

      {/* Instructions Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            How to Upload IEP Documents
          </CardTitle>
          <CardDescription>
            Follow these steps to successfully upload and process your IEP documents from SEIS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                Download from SEIS
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2 ml-8">
                <li>• Log into your SEIS account</li>
                <li>• Navigate to the IEP section</li>
                <li>• Export IEP documents as PDF files</li>
                <li>• Ensure documents are "IEP at a Glance" format</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                Upload Requirements
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2 ml-8">
                <li>• PDF files only</li>
                <li>• Maximum 10MB per file</li>
                <li>• Up to 10 files at once</li>
                <li>• Files must contain student ID and IEP date</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Upload IEP Documents
          </CardTitle>
          <CardDescription>
            Drag and drop your PDF files or click to browse. Processing will begin automatically after upload.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IepDropzone />
        </CardContent>
      </Card>
      {/* Important Information Alerts */}
      <div className="space-y-4 mt-8">
        {/* <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Automatic Processing:</strong> Documents are automatically parsed to extract student information, 
            IEP dates, and page counts. Successfully processed documents will be stored in the system.
          </AlertDescription>
        </Alert> */}

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Data Validation:</strong> Students not found in the database or documents with invalid 
            date formats will be flagged as errors. You can download an error report for review.
          </AlertDescription>
        </Alert>
      </div>


      {/* Features Overview */}
      
    </div>
  );
};

export default uploadIEP;