import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Clock, Phone, MessageSquare, ArrowLeft, Calendar, Users, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Reservation Received — Naadu Restaurant',
  description: 'Your table reservation request has been received by Naadu Restaurant Mangaluru.',
};

export default async function ReservationConfirmationPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const ref = searchParams.ref;

  const reservation = ref
    ? await db.reservation.findUnique({
        where: { referenceNumber: ref },
      })
    : null;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-sand-200 shadow-xl p-8 sm:p-12 text-center">
          {/* Animated Success Badge */}
          <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6 shadow-md shadow-green-600/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Booking Request Received
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-coastal-900 font-serif mb-4">
            Thank You, {reservation?.customerName || 'Valued Guest'}!
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            Your table reservation request has been submitted to the host desk at Naadu Restaurant.
          </p>

          {/* Reference Card */}
          <div className="bg-sand-100/70 rounded-2xl p-6 border border-sand-200 mb-8 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Booking Reference
              </span>
              <span className="font-mono font-bold text-primary-600 text-base">
                {ref || 'NAADU-REQUEST'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block mb-0.5">Date</span>
                <span className="font-semibold text-coastal-900 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary-600" />
                  {reservation?.reservationDate || 'Today'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Time</span>
                <span className="font-semibold text-coastal-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary-600" />
                  {reservation?.reservationTime || 'Pending'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Guests</span>
                <span className="font-semibold text-coastal-900 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-primary-600" />
                  {reservation?.guestCount || 2} People
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Current Status</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                  {reservation?.status || 'Pending Confirmation'}
                </span>
              </div>
            </div>

            {reservation?.occasion && reservation.occasion !== 'None' && (
              <div className="pt-2 border-t border-sand-200 text-xs">
                <span className="text-stone-400">Occasion: </span>
                <span className="font-semibold text-coastal-900">{reservation.occasion}</span>
              </div>
            )}
          </div>

          {/* Instant Call / WhatsApp support */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 mb-8 text-xs text-amber-900 leading-relaxed text-left flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">What happens next?</p>
              <p className="mt-0.5 text-amber-800">
                Our manager confirms reservations shortly based on current seating and match screening schedule. If you need immediate table confirmation or changes, connect with us right away:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <a
              href="https://wa.me/917022373444"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Naadu</span>
            </a>
            <a
              href="tel:07022373444"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-coastal-900 hover:bg-coastal-800 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call 070223 73444</span>
            </a>
          </div>

          <Link href="/">
            <Button variant="ghost" size="sm" className="text-stone-500 hover:text-coastal-900">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
