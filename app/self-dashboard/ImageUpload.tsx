"use client";

import { useState } from "react";

interface ImageUploadProps {
  onUpload: (path: string) => void;
  currentImage?: string;
}

export default function ImageUpload({ onUpload, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.path) {
        onUpload(data.path);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-6">
        {currentImage ? (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
            <img src={currentImage} alt="Preview" className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400 text-[10px] uppercase tracking-widest text-center px-2">
            No Image
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 dark:file:bg-white/10 file:text-gray-900 dark:file:text-white hover:file:bg-gray-200 dark:hover:file:bg-white/20 cursor-pointer transition-all"
          />
          {uploading ? (
            <span className="text-[10px] font-medium text-black dark:text-white animate-pulse uppercase tracking-wider">Uploading...</span>
          ) : (
            <span className="text-[10px] text-gray-400 uppercase tracking-wider italic">Recommended: 1200x630px</span>
          )}
        </div>
      </div>
    </div>
  );
}
