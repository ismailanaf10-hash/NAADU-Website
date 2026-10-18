import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { MenuItemCard } from '@/components/public/MenuItemCard';
import { AdSlot } from '@/components/public/AdSlot';
import {
  Calendar,
  Utensils,
  Leaf,
  Baby,
  Tv,
  Sparkles,
  Phone,
  MessageSquare,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import HomeGalleryClient from './HomeGalleryClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [
    settings,
    categories,
    featuredDishes,
    popularDishes,
    activeOffers,
    upcomingEvents,
    galleryImages,
    reviews,
  ] = await Promise.all([
    db.restaurantSettings.findFirst(),
    db.menuCategory.findMany({
      where: { isEnabled: true },
      orderBy: { displayOrder: 'asc' },
    }),
    db.menuItem.findMany({
      where: { isAvailable: true, isFeatured: true },
      include: { category: true },
      take: 6,
    }),
    db.menuItem.findMany({
      where: { isAvailable: true, isPopular: true },
      include: { category: true },
      take: 6,
    }),
    db.offer.findMany({
      where: { isActive: true, endDate: { gte: new Date() } },
      orderBy: { startDate: 'desc' },
      take: 3,
    }),
    db.event.findMany({
      where: { isPublished: true, eventDate: { gte: new Date().toISOString().split('T')[0] } },
      orderBy: { eventDate: 'asc' },
      take: 3,
    }),
    db.galleryImage.findMany({
      where: { isVisible: true, isFeatured: true },
      orderBy: { displayOrder: 'asc' },
      take: 6,
    }),
    db.review.findMany({
      where: { status: 'approved', isFeatured: true },
      orderBy: { submittedAt: 'desc' },
      take: 3,
    }),
  ]);

  const restaurantName = settings?.restaurantName || 'Naadu Restaurant';
  const tagline = settings?.tagline || 'Authentic Coastal Karnataka Flavors & Mangalurean Warmth';
  const phone = settings?.phone || '070223 73444';
  const address = settings?.address || '1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006';

  return (
    <div className="flex flex-col min-h-screen">
      {/* 7.1.2 Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-coastal-950 overflow-hidden pt-20">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Naadu Restaurant Ambience"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coastal-950 via-coastal-950/60 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Chilimbi, Ladyhill, Mangaluru</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight font-serif leading-[1.1] mb-6 drop-shadow-md">
            {restaurantName}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-sand-200 max-w-2xl mx-auto font-light leading-relaxed mb-10 text-balance">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <Link href="/reserve" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-4 shadow-glow">
                <Calendar className="w-5 h-5 mr-2" />
                Reserve a Table
              </Button>
            </Link>
            <Link href="/menu" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-4 border-white/80 text-white hover:bg-white/10 hover:border-white"
              >
                <Utensils className="w-5 h-5 mr-2" />
                Explore Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7.1.3 Highlights Bar */}
      <section className="bg-sand-100 border-y border-sand-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-coastal-900">Vegetarian Friendly</h4>
                <p className="text-xs text-stone-500">Authentic pure veg options</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Baby className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-coastal-900">Kids Menu</h4>
                <p className="text-xs text-stone-500">Gentle & fun dishes</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Tv className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-coastal-900">Live Sports Screening</h4>
                <p className="text-xs text-stone-500">Big screen match vibes</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-coastal-900">Coastal Hospitality</h4>
                <p className="text-xs text-stone-500">True Mangalurean warmth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.1.4 Featured Dishes ("Our Specials") */}
      {featuredDishes.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
                  Chef&apos;s Recommendations
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif">
                  Our Signature Specials
                </h2>
              </div>
              <Link
                href="/menu"
                className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 group"
              >
                <span>Browse Full Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDishes.map((dish) => (
                <MenuItemCard key={dish.id} item={dish} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7.1.6 Food Categories Browser */}
      {categories.length > 0 && (
        <section className="py-16 bg-sand-100 border-t border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
                Explore Culinary Flavors
              </span>
              <h2 className="text-3xl font-extrabold text-coastal-900 font-serif">
                Browse By Category
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/menu/${cat.slug}`}
                  className="group bg-white rounded-2xl p-4 border border-sand-200 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-primary-100 group-hover:border-primary-500 transition-colors">
                    <img
                      src={cat.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80'}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-coastal-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7.1.5 Popular Dishes ("Most Loved") */}
      {popularDishes.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2 font-mono">
                  Customer Favorites
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif">
                  Most Loved Delights
                </h2>
              </div>
              <Link
                href="/menu"
                className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 group"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDishes.map((dish) => (
                <MenuItemCard key={dish.id} item={dish} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7.1.7 Offers Preview */}
      {activeOffers.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-amber-500/10 via-primary-500/5 to-transparent border-t border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
                  Promotions & Deals
                </span>
                <h2 className="text-3xl font-extrabold text-coastal-900 font-serif">
                  Current Special Offers
                </h2>
              </div>
              <Link
                href="/offers"
                className="mt-4 md:mt-0 text-sm font-bold text-primary-600 hover:underline flex items-center gap-1.5"
              >
                <span>View All Offers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/60 shadow-card flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block bg-primary-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                      {offer.discountText}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-coastal-900 mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-6">
                      {offer.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-sand-100">
                    <span className="text-xs text-stone-400">
                      Valid till {new Date(offer.endDate).toLocaleDateString()}
                    </span>
                    <Link href="/reserve">
                      <Button size="sm">Avail Offer</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Adsterra Native Banner (Approved Placement) */}
      <AdSlot format="native" pageId="home" />

      {/* 7.1.8 About Naadu Brief */}
      <section className="py-20 bg-coastal-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-3 font-mono">
                Our Story & Heritage
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif mb-6 leading-tight">
                Authentic Mangalurean Culinary Traditions
              </h2>
              <p className="text-sand-200 text-base sm:text-lg leading-relaxed mb-6 font-light">
                Rooted in Chilimbi, Mangaluru, Naadu Restaurant is born out of a deep reverence for the culinary heritage of Tulu Nadu. From our slow-roasted Ghee Roasts simmered in copper pots to delicate Neer Dosas and hearty vegetarian thalis, every recipe honors local spices and generous coastal hospitality.
              </p>
              <p className="text-sand-300/80 text-sm leading-relaxed mb-8">
                Whether celebrating milestones with family, savoring quiet comfort food, or watching cricket matches on the big screen with stadium excitement, Naadu is your neighborhood dining haven.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-coastal-900">
                  Read Our Full Story
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Naadu Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.1.9 Gallery Preview with Lightbox */}
      <section className="py-16 md:py-24 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
                Visual Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif">
                Moments at Naadu
              </h2>
            </div>
            <Link
              href="/gallery"
              className="mt-4 md:mt-0 text-sm font-bold text-primary-600 hover:underline flex items-center gap-1.5"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <HomeGalleryClient images={galleryImages} />
        </div>
      </section>

      {/* 7.1.10 Events & Sports Screening Preview */}
      <section className="py-16 bg-white border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
                Big Screen Excitement
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif">
                Live Sports & Events
              </h2>
            </div>
            <Link
              href="/events"
              className="mt-4 md:mt-0 text-sm font-bold text-primary-600 hover:underline flex items-center gap-1.5"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-sand-50 rounded-3xl border border-sand-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-sand-200">
                    <img
                      src={event.imageUrl || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-primary-600 uppercase mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.eventDate} • {event.eventTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-coastal-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    <Link href="/reserve">
                      <Button size="sm" className="w-full">
                        {event.ctaLabel || 'Reserve Spot'}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-coastal-900 text-white rounded-3xl p-8 sm:p-12 text-center">
              <Tv className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Live Match Screenings Every Weekend!</h3>
              <p className="text-stone-300 max-w-xl mx-auto text-sm mb-6">
                From high-voltage cricket clashes to premier football matches, experience every ball and goal on our giant HD screen with surround stadium sound.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="tel:07022373444">
                  <Button variant="secondary" className="bg-white text-coastal-900 hover:bg-sand-100">
                    <Phone className="w-4 h-4 mr-2" />
                    Call For Next Screening
                  </Button>
                </a>
                <Link href="/reserve">
                  <Button>Reserve a Table</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7.1.11 Kids Menu Callout */}
      <section className="py-16 bg-gradient-to-r from-amber-500/15 to-primary-500/10 border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                <Baby className="w-4 h-4" />
                <span>Family Dining</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-coastal-900 font-serif mb-3">
                Special Menu for Little Foodies
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                Dining with children is effortless at Naadu! Our dedicated kids menu features mild, healthy, and fun dishes including Cheesy Cone Dosas, Crispy Chicken Tenders, and sweet fruit shakes.
              </p>
              <Link href="/kids-menu">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Explore Kids Menu
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-80 aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100">
              <img
                src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
                alt="Kids Menu at Naadu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7.1.12 Customer Reviews Preview */}
      {reviews.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
                Guest Impressions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif mb-4">
                What Diners Say
              </h2>
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-sm text-stone-500">Rated 4.8 / 5 based on verified diner visits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-sand-50 rounded-2xl p-6 sm:p-8 border border-sand-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-stone-700 text-sm leading-relaxed italic mb-6">
                      &ldquo;{rev.reviewText}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                    <span className="font-bold text-sm text-coastal-900">{rev.customerName}</span>
                    <span className="text-xs text-stone-400">Verified Diner</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/reviews">
                <Button variant="outline">Read All Reviews & Leave Yours</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7.1.13 Contact & Location Section */}
      <section className="py-16 md:py-24 bg-sand-100 border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
                Find Us in Mangaluru
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif mb-6">
                Visit Naadu Restaurant
              </h2>

              <div className="space-y-6 text-sm text-stone-700 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-coastal-900">Address</h3>
                    <p className="text-stone-600 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-coastal-900">Phone & Inquiries</h3>
                    <a href={`tel:${phone}`} className="text-primary-600 font-semibold hover:underline">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-coastal-900">Opening Hours</h3>
                    <p className="text-stone-600">Open Daily: 11:30 AM – 11:00 PM</p>
                    <p className="text-xs text-stone-500">Friday – Sunday open till 11:30 PM for match screenings</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/917022373444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coastal-900 hover:bg-coastal-800 text-white font-semibold text-sm transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-3xl overflow-hidden border border-sand-300 shadow-xl h-[400px] bg-sand-200">
              <iframe
                title="Naadu Restaurant location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4795267252277!2d74.82510167584149!3d12.876884616947293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a646c000001%3A0x6b7b252033c4ef!2sLadyhill%2C%20Mangaluru%2C%20Karnataka%20575006!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
