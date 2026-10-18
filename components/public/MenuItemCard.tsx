import React from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    price: number;
    imageUrl?: string | null;
    isVeg: boolean;
    isAvailable: boolean;
    isFeatured?: boolean;
    isPopular?: boolean;
    isKidsMenu?: boolean;
    category?: { name: string; slug: string };
  };
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const fallbackImage = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 flex flex-col justify-between ${
        !item.isAvailable ? 'opacity-75' : ''
      }`}
    >
      <div>
        {/* Dish Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
          <img
            src={item.imageUrl || fallbackImage}
            alt={`${item.name} — Naadu Restaurant Mangaluru`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges on top */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {item.isFeatured && (
              <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                Special
              </span>
            )}
            {item.isPopular && (
              <span className="bg-primary-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                Popular
              </span>
            )}
            {item.isKidsMenu && (
              <span className="bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                Kids Favorite
              </span>
            )}
          </div>

          {/* Dietary Indicator (Veg/Non-Veg) top-right */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm z-10">
            <span
              className={`diet-badge ${item.isVeg ? 'diet-badge-veg' : 'diet-badge-nonveg'}`}
              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            />
          </div>

          {/* Unavailable Overlay */}
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="bg-stone-900/90 text-white font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-stone-600">
                Currently Unavailable
              </span>
            </div>
          )}
        </div>

        {/* Content details */}
        <div className="p-5">
          {item.category && (
            <span className="text-[11px] font-semibold text-primary-600 uppercase tracking-wider block mb-1">
              {item.category.name}
            </span>
          )}

          <h3 className="font-bold text-coastal-900 text-lg leading-snug group-hover:text-primary-600 transition-colors line-clamp-1">
            {item.name}
          </h3>

          <p className="mt-2 text-xs text-stone-500 leading-relaxed line-clamp-2">
            {item.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer / Price & Action */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-sand-100">
        <div>
          <span className="text-xs text-stone-400 block font-medium">Price</span>
          <span className="text-lg font-bold text-coastal-900 font-mono">
            {formatPrice(item.price)}
          </span>
        </div>

        <Link
          href={`/menu/item/${item.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
