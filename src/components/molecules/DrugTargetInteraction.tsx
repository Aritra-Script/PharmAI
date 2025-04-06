import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface DrugTargetInteractionProps {
  onFileUpload: (file: File) => void;
}

export function DrugTargetInteraction({ onFileUpload }: DrugTargetInteractionProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragActive ? 'border-primary' : 'border-border'
      }`}
      {...getRootProps()}
    >
      
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-primary mb-4" />
      <p className="text-lg mb-2">
        {isDragActive
          ? 'Drop your CSV file here'
          : 'Drop your CSV file here or click to browse'}
      </p>
      <p className="text-sm text-foreground/60">
        Supports CSV files containing molecular data
      </p>
    </motion.div>
  );
}