import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const API_BASE = 'http://localhost:8000/api/v1';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      setUploaded(false);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setUploaded(false);
    }
  };

  const uploadFile = async () => {
    if (!uploadedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch(`${API_BASE}/http-log`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file");
      }

      const data = await response.json();
      
      if (data.success) {
        setUploaded(true);
        toast.success("File uploaded successfully! Redirecting to analysis...");
        
        setTimeout(() => {
          window.location.href = "/analysis";
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message || "Failed to upload file");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploaded(false);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-slate-950 text-white">
        <main className="container px-6 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Upload Security Logs</h2>
              <p className="text-slate-400">Upload your log files for comprehensive threat analysis</p>
            </div>

            <Card className="bg-slate-900/50 backdrop-blur border-slate-800">
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>Supported formats: .log, .txt, .csv, .pcap</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                    dragActive
                      ? "border-primary bg-primary/10"
                      : "border-slate-700 hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {!uploadedFile ? (
                    <>
                      <Upload className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2">
                        Drop your files here
                      </h3>
                      <p className="text-slate-400 mb-6">
                        or click to browse from your device
                      </p>
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".log,.txt,.csv,.pcap"
                      />
                      <label htmlFor="file-upload">
                        <Button asChild>
                          <span>Select File</span>
                        </Button>
                      </label>
                    </>
                  ) : uploaded ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        File uploaded successfully
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 mb-6">
                        <FileText className="h-4 w-4" />
                        <span>{uploadedFile.name}</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Redirecting to analysis page...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileText className="h-16 w-16 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Ready to upload
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 mb-6">
                        <FileText className="h-4 w-4" />
                        <span>{uploadedFile.name}</span>
                      </div>
                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          onClick={resetUpload}
                          disabled={uploading}
                        >
                          Change File
                        </Button>
                        <Button 
                          onClick={uploadFile}
                          disabled={uploading}
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            "Upload & Analyze"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">File Requirements</h4>
                      <ul className="text-sm text-slate-400 space-y-1">
                        <li>• Maximum file size: 100MB</li>
                        <li>• Supported formats: LOG, TXT, CSV, PCAP</li>
                        <li>• Files should contain network or system logs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default UploadPage;