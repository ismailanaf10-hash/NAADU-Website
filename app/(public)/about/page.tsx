import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { AdSlot } from '@/components/public/AdSlot';
import { Utensils, HeartHandshake, Sparkles, MapPin, Tv, Baby, Leaf, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'About Us — Naadu Restaurant, Mangaluru',
  description: 'Learn about Naadu Restaurant in Chilimbi, Mangaluru. Our coastal culinary heritage, slow-roasted Ghee Roasts, warm hospitality, and live sports match screenings.',
};

export default async function AboutPage() {
  const settings = await db.restaurantSettings.findFirst();

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Heritage & Passion
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-coastal-900 font-serif mb-6 leading-tight">
            Celebrating the Flavors of Tulu Nadu
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Located in the heart of Chilimbi, Ladyhill, Naadu Restaurant is born from an uncompromising love for authentic Mangalurean cooking, coastal community traditions, and warm hospitality.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
              alt="Naadu Restaurant Interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
            <h3 className="text-2xl sm:text-3xl font-bold text-coastal-900 font-serif">
              Our Culinary Philosophy
            </h3>
            <p>
              In Mangaluru, food is more than sustenance — it is a vibrant expression of identity and home. At Naadu, we honor this heritage by insisting on time-tested culinary methods: freshly ground spice masalas using roasted Byadagi chilies, pure clarified butter (desi ghee), thick coconut milk extracted fresh daily, and local catch sourced straight from the Karavali coastline.
            </p>
            <p>
              Whether it is our signature spicy Kundapur Chicken Ghee Roast, our delicate lace-soft Neer Dosa served with traditional coconut chutneys, or comforting vegetarian thali delicacies, every dish is prepared with genuine pride.
            </p>
            <div className="pt-2">
              <Link href="/reserve">
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Reserve a Table with Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars / Values Bar */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sand-200 shadow-sm mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-coastal-900 font-serif text-center mb-10">
            What Makes Naadu Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-coastal-900 mb-2">Authentic Recipes</h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Handcrafted spice blends, zero artificial additives, and traditional cast-iron cooking techniques handed down through generations.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Tv className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-coastal-900 mb-2">Sports & Community</h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Experience high-energy cricket and football screenings on our giant HD display with friends, family, and fellow sports enthusiasts.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Baby className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-coastal-900 mb-2">Family & Kids Friendly</h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Spacious seating, gentle non-spicy kids options, and vegetarian choices ensure that every member of the family feels right at home.
              </p>
            </div>
          </div>
        </div>

        <AdSlot format="banner" pageId="about" />
      </div>
    </div>
  );
}
