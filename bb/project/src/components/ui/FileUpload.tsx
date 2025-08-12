import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  accept = '*/*',
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024, // 10MB
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
    setFiles(newFiles);
    onFilesChange(newFiles);

    // Simulate upload progress
    acceptedFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
      }, 100);
    });
  }, [files, maxFiles, onFilesChange]);

  const removeFile = (fileName: string) => {
    const newFiles = files.filter(f => f.name !== fileName);
    setFiles(newFiles);
    onFilesChange(newFiles);
    setUploadProgress(prev => {
      const { [fileName]: removed, ...rest } = prev;
      return rest;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxFiles,
    maxSize,
  });

  return (
    <div className="space-y-4">
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400'}
        `}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-slate-400" />
        <p className="mt-2 text-sm text-slate-600">
          {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Max {maxFiles} file(s), up to {Math.round(maxSize / (1024 * 1024))}MB each
        </p>
      </motion.div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg"
            >
              <File className="h-5 w-5 text-slate-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                  <div className="mt-1 w-full bg-slate-200 rounded-full h-1">
                    <div
                      className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress[file.name]}%` }}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => removeFile(file.name)}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};