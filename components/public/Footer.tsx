import React from 'react';
import Link from 'next/link';
import { Utensils, MapPin, Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

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

export function Footer() {
  return (
    <footer className="bg-coastal-900 text-sand-100 pt-16 pb-10 border-t border-coastal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block font-serif text-white">
                  NAADU
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-400 block -mt-1">
                  Restaurant • Mangaluru
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Experience the genuine warmth of Coastal Karnataka hospitality. Celebrating traditional Mangalurean flavors, rich Ghee Roasts, comforting vegetarian staples, and live sports screenings.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/naadurestaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-coastal-800 hover:bg-primary-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/naadurestaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-coastal-800 hover:bg-primary-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917022373444"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-coastal-800 hover:bg-green-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4 font-mono">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/menu" className="text-stone-300 hover:text-white hover:underline transition-colors">
                  Explore Full Menu
                </Link>
              </li>
              <li>
                <Link href="/reserve" className="text-stone-300 hover:text-white hover:underline transition-colors">
                  Table Reservation
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-stone-300 hover:text-white hover:underline transition-colors">
                  Promotions & Offers
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-stone-300 hover:text-white hover:underline transition-colors">
                  Live Sports Screening
                </Link>
              </li>
              <li>
                <Link href="/kids-menu" className="text-stone-300 hover:text-white hover:underline transition-colors">
                  Kids Special Menu
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-stone-300 hover:text-white hover:underline transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-stone-300 hover:text-white hover:underline transition-colors">
                  Guest Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4 font-mono">
              Visit & Contact
            </h3>
            <div className="space-y-3.5 text-sm text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span>
                  1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-500 shrink-0" />
                <a href="tel:07022373444" className="hover:text-white transition-colors">
                  070223 73444
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-green-500 shrink-0" />
                <a
                  href="https://wa.me/917022373444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +91 70223 73444
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Timings & Highlights */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4 font-mono">
              Opening Hours
            </h3>
            <div className="space-y-2.5 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-primary-500 shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Mon – Thu</p>
                  <p className="text-xs text-stone-400">11:30 AM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Fri – Sun (Weekend / Matches)</p>
                  <p className="text-xs text-stone-400">11:30 AM – 11:30 PM</p>
                </div>
              </div>
              <div className="pt-2">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-coastal-800 text-amber-300 border border-amber-500/20">
                  Vegetarian & Kids Friendly • Live Sports
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-coastal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Naadu Restaurant. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-200 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-primary-400 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
