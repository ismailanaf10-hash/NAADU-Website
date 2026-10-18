import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, UtensilsCrossed, CalendarDays } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <div className="relative mb-8">
          <span className="text-[160px] sm:text-[200px] font-extrabold text-sand-200 select-none leading-none block">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <UtensilsCrossed className="w-16 h-16 text-primary-600 animate-pulse" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-coastal-900 font-serif mb-3">
          Oops! This Page Went Missing
        </h1>
        <p className="text-stone-500 text-sm sm:text-base leading-relaxed mb-8">
          Looks like this dish isn&apos;t on the menu. The page you&apos;re looking for might have been moved or doesn&apos;t exist. Let us guide you back to something delicious!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Browse Menu
            </Button>
          </Link>
          <Link href="/reserve">
            <Button variant="outline">
              <CalendarDays className="w-4 h-4 mr-2" />
              Reserve a Table
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
