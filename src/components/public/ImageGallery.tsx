"use client";

import { useState, useCallback, useEffect } from "react";
import { ProductImage } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sort images by order
  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLightboxOpen) return;
    
    if (e.key === "Escape") {
      setIsLightboxOpen(false);
    } else if (e.key === "ArrowLeft") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : sortedImages.length - 1));
    } else if (e.key === "ArrowRight") {
      setSelectedIndex((prev) => (prev < sortedImages.length - 1 ? prev + 1 : 0));
    }
  }, [isLightboxOpen, sortedImages.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : sortedImages.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev < sortedImages.length - 1 ? prev + 1 : 0));
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  // Generate placeholder URL with product name
  const placeholderUrl = `https://placehold.co/800x600/fafafa/171717?text=${encodeURIComponent(productName)}`;
  
  if (sortedImages.length === 0) {
    return (
      <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden">
        <img
          src={placeholderUrl}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Main Image - Style Mobile (Square) */}
        <div className="relative aspect-square bg-zinc-100 rounded-2xl overflow-hidden">
          <img
            src={sortedImages[selectedIndex]?.url}
            alt={sortedImages[selectedIndex]?.alt || productName}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openLightbox(selectedIndex)}
          />
          
          {/* Image Counter Badge */}
          {sortedImages.length > 1 && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {selectedIndex + 1}/{sortedImages.length}
            </div>
          )}

          {/* Navigation Arrows (Mobile Style) */}
          {sortedImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-zinc-700" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails - Horizontal Scroll (Mobile Style) */}
        {sortedImages.length > 1 && (
          <div className="relative">
            <div 
              className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {sortedImages.map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-xl overflow-hidden transition-all scroll-snap-align-start ${
                    selectedIndex === index
                      ? "ring-2 ring-zinc-900 ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View ${image.alt || `image ${index + 1}`}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${productName} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            {/* Scroll hint shadow */}
            {sortedImages.length > 4 && (
              <>
                <div className="absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Navigation Arrows */}
          {sortedImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Lightbox Image */}
          <div
            className="max-w-[95vw] max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={sortedImages[selectedIndex]?.url}
              alt={sortedImages[selectedIndex]?.alt || productName}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          {/* Bottom Thumbnails in Lightbox */}
          {sortedImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2 px-4">
              {sortedImages.map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all border-2 ${
                    selectedIndex === index
                      ? "border-white opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${productName} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
