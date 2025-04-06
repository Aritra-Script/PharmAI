import React, { useState } from 'react';
import { DrugTargetInteraction } from '../components/DrugTargetInteraction';
import { Card } from '../components/common/Card';

export function ComputationalCompounds() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Add your file processing logic here
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Upload Computational Compounds Data</h1>

        <Card className="bg-background border border-border/20 rounded-xl shadow-lg p-6">
          <DrugTargetInteraction onFileUpload={handleFileUpload} />
          <p className="text-sm text-center text-foreground/60 mt-2">
            Supports CSV files containing molecular data
          </p>
        </Card>

        {uploadedFile && (
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/60">
              Uploaded file: {uploadedFile.name}
            </p>
            <button 
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg 
                         hover:bg-primary/90 transition-colors"
            >
              Analyze Compounds
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
