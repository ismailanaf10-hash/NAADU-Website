import React from 'react';
import ReservationFormClient from './ReservationFormClient';
import { ShieldCheck, Phone, Clock, Users } from 'lucide-react';

export const metadata = {
  title: 'Reserve a Table — Naadu Restaurant, Mangaluru',
  description: 'Book your table online at Naadu Restaurant, Chilimbi, Mangaluru. Enjoy authentic Coastal Karnataka dishes and live sports match screenings.',
};

export default function ReservePage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Table Booking
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-coastal-900 font-serif mb-4">
            Reserve Your Table
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Planning a family lunch, celebration, or catching the live match? Secure your table instantly with zero upfront payment.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-sand-200 text-center flex items-center justify-center gap-3">
            <Clock className="w-5 h-5 text-primary-600 shrink-0" />
            <span className="text-xs font-semibold text-coastal-900">Instant Online Request</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-sand-200 text-center flex items-center justify-center gap-3">
            <Users className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="text-xs font-semibold text-coastal-900">Groups of up to 20 Guests</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-sand-200 text-center flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-xs font-semibold text-coastal-900">No Account Required</span>
          </div>
        </div>

        {/* Interactive Client Reservation Form */}
        <ReservationFormClient />

        {/* Direct Phone Support */}
        <div className="mt-8 text-center bg-sand-100 rounded-2xl p-4 border border-sand-200 text-xs text-stone-600">
          Need a table for more than 20 guests or have immediate booking queries? Call us directly at{' '}
          <a href="tel:07022373444" className="font-bold text-primary-600 hover:underline">
            070223 73444
          </a>
        </div>
      </div>
    </div>
  );
}
