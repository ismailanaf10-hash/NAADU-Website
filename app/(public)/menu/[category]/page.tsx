import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import MenuClient from '../MenuClient';
import { AdSlot } from '@/components/public/AdSlot';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { category: string } }) {
  const cat = await db.menuCategory.findUnique({
    where: { slug: params.category },
  });
  if (!cat) return { title: 'Menu — Naadu Restaurant' };
  return {
    title: `${cat.name} — Naadu Restaurant Menu`,
    description: cat.description || `Browse authentic ${cat.name} at Naadu Restaurant in Mangaluru.`,
  };
}

export default async function CategoryMenuPage({
  params,
}: {
  params: { category: string };
}) {
  const currentCategory = await db.menuCategory.findUnique({
    where: { slug: params.category },
  });

  if (!currentCategory) {
    notFound();
  }

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
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Category
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coastal-900 font-serif mb-4">
            {currentCategory.name}
          </h1>
          {currentCategory.description && (
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {currentCategory.description}
            </p>
          )}
        </div>

        <MenuClient
          initialCategories={categories}
          initialItems={items}
          defaultCategorySlug={currentCategory.slug}
        />

        <AdSlot format="native" pageId="menu" />
      </div>
    </div>
  );
}
