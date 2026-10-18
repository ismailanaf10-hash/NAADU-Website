'use client';

import React, { useState, useMemo } from 'react';
import { Lightbox } from '@/components/public/Lightbox';
import { Maximize2, Sparkles, Utensils, Building2, Tv, Trophy, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
  altText?: string | null;
  category: string;
  isFeatured: boolean;
  displayOrder: number;
}

const CATEGORIES = [
  { id: 'all', label: 'All Photos', icon: Sparkles },
  { id: 'food', label: 'Food & Specials', icon: Utensils },
  { id: 'ambience', label: 'Ambience & Dining', icon: Building2 },
  { id: 'sports', label: 'Live Sports', icon: Trophy },
  { id: 'events', label: 'Events & Moments', icon: Tv },
  { id: 'other', label: 'More', icon: ImageIcon },
];

export default function GalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return initialImages;
    return initialImages.filter(
      (img) => img.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [initialImages, activeCategory]);

  return (
    <>
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                  : 'bg-white text-stone-600 border border-sand-200 hover:border-sand-300 hover:bg-sand-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 ? (
        <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-sand-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-coastal-900 mb-2">No photos in this category yet</h3>
          <p className="text-sm text-stone-500 mb-6">
            We are constantly taking and adding fresh photos of our restaurant and dishes.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs font-semibold text-primary-600 uppercase tracking-wider hover:underline"
          >
            View All Photos
          </button>
        </div>
      ) : (
        /* Image Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => {
                setCurrentIndex(idx);
                setLightboxOpen(true);
              }}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer bg-sand-200 border border-sand-300/80 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={img.imageUrl}
                alt={img.altText || img.caption || 'Naadu Restaurant'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex justify-end">
                  <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white shadow-sm">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded mb-1">
                    {img.category}
                  </span>
                  {img.caption && (
                    <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
                      {img.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filteredImages}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % filteredImages.length)}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
      />
    </>
  );
}
