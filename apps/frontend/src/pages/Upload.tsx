import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Upload Security Logs</h2>
            <p className="text-muted-foreground">Upload your log files for comprehensive threat analysis</p>
          </div>

          <Card className="bg-card/50 backdrop-blur border-white/10">
            <CardHeader>
              <CardTitle className="text-foreground">File Upload</CardTitle>
              <CardDescription>Supported formats: .log, .txt, .csv, .pcap</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-white/20 hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!uploadedFile ? (
                  <>
                    <UploadIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Drop your files here
                    </h3>
                    <p className="text-muted-foreground mb-6">
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
                ) : (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      File uploaded successfully
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-6">
                      <FileText className="h-4 w-4" />
                      <span>{uploadedFile}</span>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setUploadedFile(null)}>
                        Upload Another
                      </Button>
                      <Button>Analyze File</Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">File Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
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
  );
};

export default Upload;
