import React from 'react';
import { db } from '@/lib/db';
import GalleryClient from './GalleryClient';
import { AdSlot } from '@/components/public/AdSlot';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Photo Gallery — Naadu Restaurant, Mangaluru',
  description: 'Explore photos of our delicious dishes, dining ambience, sports screening nights, and special moments at Naadu Restaurant in Mangaluru.',
};

export default async function GalleryPage() {
  const images = await db.galleryImage.findMany({
    where: { isVisible: true },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Captured Moments
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coastal-900 font-serif mb-4">
            Restaurant Gallery
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Take a visual tour of our culinary creations, warm dining hall, live cricket screening evenings, and welcoming ambience in Chilimbi, Mangaluru.
          </p>
        </div>

        <GalleryClient initialImages={images} />

        <AdSlot format="native" pageId="gallery" />
      </div>
    </div>
  );
}
