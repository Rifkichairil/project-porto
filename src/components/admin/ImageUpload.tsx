"use client";

import { useState, useRef } from "react";
import { X, Upload, GripVertical } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  images: { url: string; alt: string; order: number }[];
  onImagesChange: (images: { url: string; alt: string; order: number }[]) => void;
}

export function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        return {
          url: data.url,
          alt: file.name,
          order: images.length,
        };
      });

      const newImages = await Promise.all(uploadPromises);
      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, order: i }));
    onImagesChange(newImages);
  };

  const updateAlt = (index: number, alt: string) => {
    const newImages = images.map((img, i) =>
      i === index ? { ...img, alt } : img
    );
    onImagesChange(newImages);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedItem);

    const reorderedImages = newImages.map((img, i) => ({
      ...img,
      order: i,
    }));

    onImagesChange(reorderedImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      {/* Upload area */}
      <div
        className={cn(
          "border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center cursor-pointer transition-all",
          "hover:border-zinc-400 hover:bg-zinc-50",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Upload className="w-5 h-5 text-zinc-600" />
        </div>
        <p className="text-sm font-medium text-zinc-900">
          Click to upload images
        </p>
        <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* Image list */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((image, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-3 p-3 bg-white rounded-xl border border-zinc-200",
                draggedIndex === index && "opacity-50"
              )}
            >
              <GripVertical className="w-4 h-4 text-zinc-400 cursor-grab" />
              <div className="w-14 h-14 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <input
                  value={image.alt}
                  onChange={(e) => updateAlt(index, e.target.value)}
                  placeholder="Image description"
                  className="text-sm py-1.5"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeImage(index)}
                className="text-zinc-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
