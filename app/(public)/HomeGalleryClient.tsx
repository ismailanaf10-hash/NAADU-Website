'use client';

import React, { useState } from 'react';
import { Lightbox } from '@/components/public/Lightbox';
import { Maximize2 } from 'lucide-react';

export default function HomeGalleryClient({ images }: { images: any[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => {
              setCurrentIndex(idx);
              setLightboxOpen(true);
            }}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-sand-200 border border-sand-300 shadow-sm"
          >
            <img
              src={img.imageUrl}
              alt={img.altText || img.caption || 'Naadu Restaurant'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                <Maximize2 className="w-5 h-5" />
              </span>
            </div>
            {img.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs line-clamp-1">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
      />
    </>
  );
}
