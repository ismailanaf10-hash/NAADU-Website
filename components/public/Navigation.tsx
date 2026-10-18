'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Utensils, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Offers', href: '/offers' },
    { label: 'Events & Sports', href: '/events' },
    { label: 'Kids Menu', href: '/kids-menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sand-200 py-3.5'
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md shadow-primary-600/30 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span
                className={cn(
                  'text-xl font-bold tracking-tight block font-serif transition-colors',
                  isScrolled ? 'text-coastal-900' : 'text-white'
                )}
              >
                NAADU
              </span>
              <span
                className={cn(
                  'text-[10px] uppercase tracking-widest font-semibold block -mt-1',
                  isScrolled ? 'text-primary-600' : 'text-amber-400'
                )}
              >
                Restaurant • Mangaluru
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                    isActive
                      ? isScrolled
                        ? 'bg-primary-50 text-primary-600 font-semibold'
                        : 'bg-white/20 text-white font-semibold backdrop-blur-md'
                      : isScrolled
                      ? 'text-coastal-800 hover:text-primary-600 hover:bg-sand-100'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:07022373444"
              className={cn(
                'flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-colors',
                isScrolled
                  ? 'text-coastal-700 hover:text-primary-600 hover:bg-sand-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>070223 73444</span>
            </a>
            <Link href="/reserve">
              <Button size="sm" className="font-semibold shadow-glow">
                <Calendar className="w-4 h-4 mr-1" />
                Reserve Table
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/reserve">
              <Button size="sm" className="text-xs px-3 py-1.5">
                Reserve
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'p-2 rounded-xl transition-colors',
                isScrolled ? 'text-coastal-900 hover:bg-sand-100' : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-sand-200 shadow-2xl p-6 transition-all duration-300">
          <nav className="flex flex-col gap-1 mb-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-base font-medium transition-colors flex items-center justify-between',
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-coastal-800 hover:bg-sand-100'
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-sand-200 flex flex-col gap-3">
            <a
              href="tel:07022373444"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-coastal-800 bg-sand-100 rounded-full"
            >
              <Phone className="w-4 h-4 text-primary-600" />
              <span>Call 070223 73444</span>
            </a>
            <Link href="/reserve" className="w-full">
              <Button className="w-full py-3">
                <Calendar className="w-4 h-4 mr-2" />
                Reserve a Table
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
