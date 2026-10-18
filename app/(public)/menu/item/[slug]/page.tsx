import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { MenuItemCard } from '@/components/public/MenuItemCard';
import { Calendar, ChevronRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await db.menuItem.findUnique({
    where: { slug: params.slug },
  });
  if (!item) return { title: 'Dish Details — Naadu Restaurant' };
  return {
    title: `${item.name} — Naadu Restaurant, Mangaluru`,
    description: item.shortDescription || `Taste authentic ${item.name} at Naadu Restaurant in Mangaluru.`,
  };
}

export default async function FoodDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await db.menuItem.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!item) {
    notFound();
  }

  // Related items
  const relatedItems = await db.menuItem.findMany({
    where: {
      categoryId: item.categoryId,
      id: { not: item.id },
      isAvailable: true,
    },
    take: 3,
  });

  const fallbackImage = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80';

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name,
    description: item.shortDescription,
    image: item.imageUrl || fallbackImage,
    offers: {
      '@type': 'Offer',
      price: item.price,
      priceCurrency: 'INR',
      availability: item.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link href="/menu" className="hover:text-primary-600 transition-colors">
            Menu
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link
            href={`/menu/${item.category.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {item.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-coastal-900 font-semibold truncate max-w-[200px]">
            {item.name}
          </span>
        </nav>

        {/* Main Details Card */}
        <div className="bg-white rounded-3xl border border-sand-200 shadow-card overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Dish Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto bg-sand-100 overflow-hidden">
              <img
                src={item.imageUrl || fallbackImage}
                alt={`${item.name} — Naadu Restaurant Mangaluru`}
                className="w-full h-full object-cover"
              />

              {/* Status Overlay */}
              {!item.isAvailable && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
                  <span className="bg-stone-900/90 text-white font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-full border border-stone-600">
                    Currently Unavailable Today
                  </span>
                </div>
              )}
            </div>

            {/* Details Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                {/* Badges Bar */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`diet-badge ${item.isVeg ? 'diet-badge-veg' : 'diet-badge-nonveg'}`}
                    title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                  {item.isFeatured && (
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Chef&apos;s Special
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="bg-primary-100 text-primary-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Popular Pick
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif mb-4 leading-tight">
                  {item.name}
                </h1>

                <div className="text-3xl font-extrabold text-primary-600 font-mono mb-6">
                  {formatPrice(item.price)}
                </div>

                <div className="prose prose-stone text-sm leading-relaxed text-stone-600 mb-8 space-y-4">
                  <p className="text-base text-stone-700 font-medium leading-relaxed">
                    {item.shortDescription}
                  </p>
                  {item.fullDescription && <p>{item.fullDescription}</p>}
                </div>

                {/* Ingredients & Allergens */}
                <div className="space-y-4 pt-6 border-t border-sand-100 mb-8">
                  {item.ingredients && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-coastal-900 mb-1">
                        Key Ingredients
                      </h4>
                      <p className="text-xs text-stone-600">{item.ingredients}</p>
                    </div>
                  )}
                  {item.allergenInfo && (
                    <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold">Allergen Notice: </strong>
                        <span>{item.allergenInfo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking CTA Box */}
              <div className="pt-6 border-t border-sand-100 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/reserve" className="w-full sm:w-auto flex-1">
                  <Button size="lg" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reserve a Table to Taste
                  </Button>
                </Link>
                <a href="tel:07022373444" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    Call 070223 73444
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Dishes */}
        {relatedItems.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-1 font-mono">
                  More from {item.category.name}
                </span>
                <h3 className="text-2xl font-bold text-coastal-900 font-serif">
                  You Might Also Like
                </h3>
              </div>
              <Link
                href={`/menu/${item.category.slug}`}
                className="text-xs font-bold text-primary-600 hover:underline"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((rel) => (
                <MenuItemCard key={rel.id} item={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
