'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxProps {
  isOpen: boolean;
  images: { imageUrl: string; caption?: string | null; altText?: string | null }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-5 right-5 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-50"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-50"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image and Caption Container */}
      <div className="max-w-5xl max-h-[85vh] p-4 flex flex-col items-center justify-center">
        <img
          src={currentImage?.imageUrl}
          alt={currentImage?.altText || currentImage?.caption || 'Naadu Restaurant Gallery'}
          className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl transition-all duration-300"
        />
        {currentImage?.caption && (
          <p className="mt-4 text-center text-sm md:text-base font-medium text-sand-100 max-w-xl">
            {currentImage.caption}
          </p>
        )}
        <span className="text-xs text-stone-400 mt-2">
          {currentIndex + 1} of {images.length}
        </span>
      </div>
    </div>
  );
}
