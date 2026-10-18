import React from 'react';
import { db } from '@/lib/db';
import MenuClient from './MenuClient';
import { AdSlot } from '@/components/public/AdSlot';

export const metadata = {
  title: 'Our Menu — Naadu Restaurant, Mangaluru',
  description: 'Explore the full menu at Naadu Restaurant. Authentic Mangalore Ghee Roasts, fresh coastal seafood, vegetarian delights, delicate Neer Dosa, and kids menu.',
};

export default async function MenuPage() {
  const [categories, items] = await Promise.all([
    db.menuCategory.findMany({
      where: { isEnabled: true },
      orderBy: { displayOrder: 'asc' },
    }),
    db.menuItem.findMany({
      where: {
        isAvailable: true,
        category: { isEnabled: true },
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { name: 'asc' },
    }),
  ]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Crafted with Tradition
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coastal-900 font-serif mb-4">
            Our Restaurant Menu
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Savor authentic Karavali specialties, sizzling ghee roasts, fresh coastal catches, and comforting vegetarian favorites prepared daily with premium local ingredients.
          </p>
        </div>

        {/* Interactive Menu Filtering & Listing */}
        <MenuClient initialCategories={categories} initialItems={items} />

        {/* Adsterra Native Banner */}
        <AdSlot format="native" pageId="menu" />
      </div>
    </div>
  );
}
