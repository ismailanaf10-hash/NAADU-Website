import React from 'react';
import { db } from '@/lib/db';
import { AdSlot } from '@/components/public/AdSlot';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, MessageCircle, Navigation2, Mail } from 'lucide-react';

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Contact Us — Naadu Restaurant, Mangaluru',
  description: 'Visit Naadu Restaurant at Kulur Ferry Rd, Chilimbi, Mangaluru. Call 070223 73444 or WhatsApp us. Get directions, view opening hours, and plan your visit.',
};

export default async function ContactPage() {
  const settings = await db.restaurantSettings.findFirst();

  const openingHours = settings?.openingHours
    ? (() => { try { return JSON.parse(settings.openingHours); } catch { return []; } })()
    : [];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Visit Us
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-coastal-900 font-serif mb-6 leading-tight">
            We&apos;d Love to See You
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Drop in for an unforgettable meal, call to reserve your table, or reach out on WhatsApp. We&apos;re always happy to hear from you.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <a
            href={`tel:${settings?.phone || '07022373444'}`}
            className="group bg-white rounded-2xl border border-sand-200 p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-coastal-900 mb-1">Call Us</h3>
            <p className="text-sm text-stone-500">{settings?.phone || '070223 73444'}</p>
          </a>

          <a
            href={`https://wa.me/${settings?.whatsappNumber?.replace(/[^0-9]/g, '') || '917022373444'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl border border-sand-200 p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-coastal-900 mb-1">WhatsApp</h3>
            <p className="text-sm text-stone-500">Chat with us instantly</p>
          </a>

          <a
            href={settings?.googleMapsDirectionsUrl || 'https://maps.google.com/?q=Naadu+Restaurant+Mangaluru'}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl border border-sand-200 p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Navigation2 className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-coastal-900 mb-1">Get Directions</h3>
            <p className="text-sm text-stone-500">Open in Google Maps</p>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Location & Details */}
          <div className="bg-white rounded-3xl border border-sand-200 p-8 shadow-card space-y-8">
            <div>
              <h2 className="text-xl font-bold text-coastal-900 font-serif mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                Our Location
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                {settings?.address || '1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006'}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-coastal-900 font-serif mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                Opening Hours
              </h2>
              {openingHours.length > 0 ? (
                <div className="space-y-2">
                  {openingHours.map((item: any, i: number) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between text-sm py-2 px-3 rounded-lg ${
                        item.isClosed ? 'bg-red-50 text-red-500' : 'bg-sand-50 text-stone-600'
                      }`}
                    >
                      <span className="font-medium">{item.day}</span>
                      <span>
                        {item.isClosed
                          ? 'Closed'
                          : `${item.openTime} – ${item.closeTime}`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-stone-500">
                  Monday – Sunday: 11:00 AM – 10:30 PM
                </p>
              )}
            </div>

            {/* Social */}
            <div>
              <h2 className="text-xl font-bold text-coastal-900 font-serif mb-4">Follow Us</h2>
              <div className="flex items-center gap-3">
                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                )}
                {settings?.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-3xl overflow-hidden border border-sand-200 shadow-card bg-white">
            {settings?.googleMapsEmbedUrl ? (
              <iframe
                src={settings.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ minHeight: '480px', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Naadu Restaurant Location on Google Maps"
              />
            ) : (
              <div className="w-full h-full min-h-[480px] bg-gradient-to-br from-sand-100 to-sand-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-sm text-stone-400">Map embed will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <AdSlot format="banner" pageId="contact" />
      </div>
    </div>
  );
}
