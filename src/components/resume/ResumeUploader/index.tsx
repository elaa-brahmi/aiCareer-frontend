"use client"
import { User } from "@/types/userType";
import React, { useCallback, useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { parseResume } from "@/services/resumeService";
interface resumeProps {
    user:User
}
const ResumeUploader:React.FC<resumeProps> = ({user}) =>{
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const acceptedFileTypes = ['.pdf'];
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      handleFileSelection(file);
    }
  }, []);

  const handleFileSelection = async(file: File) => {
    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFileTypes.includes(fileExtension)) {
      alert(`Please select a valid file type pdf`);
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert(`File size must be less than 5 MB`);
      return;
    }

    setSelectedFile(file);
     try {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await parseResume(formData);
      console.log("Upload success:", response);
    } catch (error) {
      console.error("Upload error:", error);
    }
    
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleChooseFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptedFileTypes.join(',');
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        handleFileSelection(files[0]);
      }
    };
    input.click();
  };

  return (
    <div className={cn("w-full bg-white p-6 rounded-lg shadow-md")}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-upload-text mb-1">
          Upload New Resume
        </h2>
        {/* <p className="text-sm text-upload-subtext">
          {uploadsRemaining} uploads remaining this month
        </p> */}
      </div>

      {/* Drop Zone */}
      <div
        className={cn(
          "relative border-2 border-dashed border-upload-border rounded-lg p-12 text-center transition-colors hover:border-[var(--dark-amber)] hover:bg-amber-500/10 cursor-pointer",
          isDragOver && "border-[var(--dark-amber)] bg-[var(--light-amber)]",
          selectedFile && "border-upload-icon bg-upload-icon/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Upload Icon */}
        <div className="mb-6">
          <Upload 
            className="w-12 h-12 text-[var(--dark-amber)] mx-auto" 
            strokeWidth={2}
          />
        </div>

        {/* Main Text */}
        <div className="mb-6">
          <p className="text-lg font-medium  mb-2">
            {selectedFile ? selectedFile.name : "Drop your resume here"}
          </p>
          <p className="text-sm text-upload-subtext">
            or click to browse files. only PDF is supported
          </p>
        </div>

        {/* Choose File Button */}
        <Button
          onClick={handleChooseFile}
          className="bg-[var(--dark-amber)]  text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Choose File
        </Button>
      </div>
    </div>
  );
}
export default ResumeUploader;