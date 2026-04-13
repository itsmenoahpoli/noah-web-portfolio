"use client";

import { useState } from "react";
import Image from "next/image";
import { HiTrash } from "react-icons/hi2";

interface ProjectImagesUploadProps {
  currentImages: string[];
  onChange: (images: string[]) => void;
}

export default function ProjectImagesUpload({
  currentImages,
  onChange,
}: ProjectImagesUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadedPaths: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.path) {
          uploadedPaths.push(data.path);
        }
      }

      if (uploadedPaths.length > 0) {
        onChange([...currentImages, ...uploadedPaths]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(currentImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {currentImages.length > 0 ? (
          currentImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <Image
                src={image}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 160px"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/70 px-2 py-1 text-[10px] uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                <span>{`Image ${index + 1}`}</span>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-red-500/80"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <HiTrash className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-24 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 px-4 text-center text-[10px] uppercase tracking-widest text-gray-400">
            Upload at least one image
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="cursor-pointer text-xs text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
        />
        {uploading ? (
          <span className="animate-pulse text-[10px] font-medium uppercase tracking-wider text-white">
            Uploading image files...
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-wider italic text-gray-400">
            Minimum 1 image. You can upload multiple files at once.
          </span>
        )}
      </div>
    </div>
  );
}
