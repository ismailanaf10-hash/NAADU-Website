import React from 'react';
import ReviewsClient from './ReviewsClient';
import { AdSlot } from '@/components/public/AdSlot';

export const metadata = {
  title: 'Customer Reviews — Naadu Restaurant, Mangaluru',
  description: 'Read verified customer reviews about Naadu Restaurant in Mangaluru. Share your own dining experience and rate our coastal Karnataka cuisine.',
};

export default function ReviewsPage() {
  return (
    <>
      <ReviewsClient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AdSlot format="banner" pageId="reviews" />
      </div>
    </>
  );
}
