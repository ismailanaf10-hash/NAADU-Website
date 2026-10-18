import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { AdSlot } from '@/components/public/AdSlot';
import { Sparkles, Calendar, Tag, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Offers & Promotions — Naadu Restaurant, Mangaluru',
  description: 'Discover the latest deals, weekend combo discounts, and match-screening specials at Naadu Restaurant in Mangaluru.',
};

export default async function OffersPage() {
  const now = new Date();
  const offers = await db.offer.findMany({
    where: {
      isActive: true,
      endDate: { gte: now },
    },
    orderBy: { startDate: 'desc' },
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Exclusive Deals
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coastal-900 font-serif mb-4">
            Special Offers & Promotions
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Take advantage of special dining deals, combo discounts during live sports screenings, and weekend family savings at Naadu Restaurant.
          </p>
        </div>

        {offers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-card flex flex-col justify-between"
              >
                {offer.imageUrl && (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-sand-100">
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{offer.discountText}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-coastal-900 mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6">
                    {offer.description}
                  </p>
                  {offer.terms && (
                    <div className="bg-sand-50 p-4 rounded-xl border border-sand-200 text-xs text-stone-500 mb-6">
                      <span className="font-semibold text-coastal-900 block mb-1">Terms & Conditions:</span>
                      <p>{offer.terms}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-sand-100">
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary-600" />
                      Valid till {new Date(offer.endDate).toLocaleDateString()}
                    </span>
                    <Link href="/reserve">
                      <Button size="sm">
                        <span>Book to Avail</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center max-w-lg mx-auto">
            <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-coastal-900 mb-2">No Active Offers Right Now</h3>
            <p className="text-sm text-stone-500 mb-6">
              We update our special match day promotions and family combos frequently. Check back soon or visit our Instagram for announcements!
            </p>
            <Link href="/menu">
              <Button>Browse Full Menu</Button>
            </Link>
          </div>
        )}

        <AdSlot format="native" pageId="offers" />
      </div>
    </div>
  );
}
