import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { MenuItemCard } from '@/components/public/MenuItemCard';
import { AdSlot } from '@/components/public/AdSlot';
import { Baby, Smile, Star, IceCreamCone, CalendarDays } from 'lucide-react';

export const metadata = {
  title: 'Kids Menu — Naadu Restaurant, Mangaluru',
  description: 'Fun and family-friendly kids menu at Naadu Restaurant. Gentle flavors, crispy favorites, and tasty options specially crafted for little ones.',
};

export default async function KidsMenuPage() {
  const kidsItems = await db.menuItem.findMany({
    where: {
      isKidsMenu: true,
      isAvailable: true,
    },
    include: {
      category: true,
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            🎉 For Little Foodies
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-coastal-900 font-serif mb-6 leading-tight">
            Kids Menu at Naadu
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Specially crafted for our youngest guests — gentle flavors, fun presentations, and all-time favorites that kids absolutely love. No spice, all smiles!
          </p>
        </div>

        {/* Fun Feature Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Smile, text: 'Kid-Approved Flavors', color: 'bg-amber-100 text-amber-600' },
            { icon: Baby, text: 'Gentle & Non-Spicy', color: 'bg-green-100 text-green-600' },
            { icon: IceCreamCone, text: 'Yummy Desserts', color: 'bg-pink-100 text-pink-600' },
            { icon: Star, text: 'Family Favorites', color: 'bg-blue-100 text-blue-600' },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-sand-200 p-5 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-3`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-coastal-900">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Fun Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 p-8 sm:p-12 mb-16">
          <div className="absolute top-4 right-8 text-6xl opacity-20 select-none">🍕🍦🧃🍗</div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-coastal-900 font-serif mb-3">
              Family Dining, Made Easy
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
              At Naadu, we understand the joy of family dining. Our kids menu features milder flavors, smaller portions, and healthy options that bring smiles to little faces while parents enjoy our signature coastal specials.
            </p>
            <Link href="/reserve">
              <Button>
                <CalendarDays className="w-4 h-4 mr-2" />
                Reserve a Family Table
              </Button>
            </Link>
          </div>
        </div>

        {/* Kids Menu Grid */}
        {kidsItems.length > 0 ? (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-coastal-900 font-serif mb-8 flex items-center gap-3">
              <Baby className="w-7 h-7 text-primary-600" />
              Our Kids Specials
              <span className="text-sm font-normal text-stone-400 ml-2">
                ({kidsItems.length} items)
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {kidsItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-sand-200">
            <Baby className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-coastal-900 mb-2">Kids Menu Coming Soon!</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              We are preparing exciting new items for our youngest guests. Check back soon!
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/menu">
            <Button variant="outline" size="lg">
              View Full Menu →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
