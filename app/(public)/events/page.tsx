import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { AdSlot } from '@/components/public/AdSlot';
import { Tv, CalendarDays, Clock, MapPin, PartyPopper } from 'lucide-react';

export const metadata = {
  title: 'Events & Live Sports Screening — Naadu Restaurant, Mangaluru',
  description: 'Catch live cricket, football & sports match screenings on our big screen. Check upcoming events and special nights at Naadu Restaurant, Mangaluru.',
};

export default async function EventsPage() {
  const events = await db.event.findMany({
    where: { isPublished: true },
    orderBy: { eventDate: 'asc' },
  });

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter((e) => e.eventDate >= today);
  const pastEvents = events.filter((e) => e.eventDate < today);

  function formatEventDate(dateStr: string) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function formatTime(time: string) {
    const [h, m] = time.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${display}:${m} ${ampm}`;
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Live Screenings & Events
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-coastal-900 font-serif mb-6 leading-tight">
            Experience the Thrill Live at Naadu
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            From high-voltage IPL matches to ICC cricket tournaments, football derbies, and special cultural nights — enjoy the action on our giant HD screen with delicious coastal food and great company.
          </p>
        </div>

        {/* Feature Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-coastal-900 via-coastal-800 to-coastal-950 text-white p-8 sm:p-12 mb-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold-500 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
              <Tv className="w-10 h-10 text-primary-400" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-3">Giant HD Screen Experience</h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Gather your crew at Naadu for an electrifying sports viewing experience. Pair your match excitement with our signature Ghee Roast, crispy starters, and chilled beverages. Reserve your spot early during match days!
              </p>
              <Link href="/reserve" className="inline-block mt-4">
                <Button>
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Reserve for Match Day
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-coastal-900 font-serif mb-8 flex items-center gap-3">
              <PartyPopper className="w-7 h-7 text-primary-600" />
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  {event.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  {!event.imageUrl && (
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                      <Tv className="w-16 h-16 text-primary-300" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-coastal-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-stone-400">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatEventDate(event.eventDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(event.eventTime)}
                      </span>
                    </div>
                    {event.ctaLabel && event.ctaUrl && (
                      <a href={event.ctaUrl} className="inline-block mt-4">
                        <Button variant="outline" size="sm">
                          {event.ctaLabel}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Upcoming Events */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-sand-200 mb-16">
            <Tv className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-coastal-900 mb-2">No Upcoming Events Right Now</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
              Stay tuned! We regularly screen live cricket, football, and host special events. Follow us on social media for updates.
            </p>
            <Link href="/reserve">
              <Button>Reserve a Table</Button>
            </Link>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-stone-400 mb-6">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.slice(0, 6).map((event) => (
                <div
                  key={event.id}
                  className="bg-white/60 rounded-xl border border-sand-200 p-5 opacity-70"
                >
                  <h4 className="font-semibold text-coastal-800 text-sm mb-1">{event.title}</h4>
                  <p className="text-xs text-stone-400">
                    {formatEventDate(event.eventDate)} · {formatTime(event.eventTime)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <AdSlot format="banner" pageId="events" />
      </div>
    </div>
  );
}
