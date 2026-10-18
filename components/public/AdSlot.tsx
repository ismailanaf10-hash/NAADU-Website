'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export interface AdSlotProps {
  format?: 'native' | 'banner';
  pageId?: string;
  className?: string;
}

export function AdSlot({ format = 'native', pageId, className = '' }: AdSlotProps) {
  const pathname = usePathname();
  const [adsSettings, setAdsSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Strict ad-free zones
  const isAdFreePath =
    pathname?.startsWith('/admin') ||
    pathname === '/reserve' ||
    pathname === '/reserve/confirmation' ||
    pathname?.startsWith('/menu/item');

  useEffect(() => {
    if (isAdFreePath) {
      setLoading(false);
      return;
    }

    fetch('/api/v1/settings/public')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAdsSettings({
            globalEnabled: json.data.adsGlobalEnabled,
            config: json.data.adsConfig || {},
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAdFreePath]);

  if (isAdFreePath || loading || !adsSettings) return null;

  const { globalEnabled, config } = adsSettings;
  if (!globalEnabled) return null;

  // Check page targeting if pageId provided
  if (pageId && config.pageTargeting && config.pageTargeting[pageId] === false) {
    return null;
  }

  const isTestMode = config.testMode !== false; // default true for safe development

  if (format === 'native' && !config.nativeBannerEnabled) return null;
  if (format === 'banner' && !config.standardBannerEnabled) return null;

  return (
    <div
      className={`my-8 mx-auto w-full max-w-4xl px-4 transition-opacity duration-300 ${className}`}
      aria-label="Sponsored Advertisement"
    >
      {isTestMode ? (
        <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-100/60 p-4 text-center">
          <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-widest mb-2">
            <span>Advertisement</span>
            <span>Adsterra {format.toUpperCase()} (Test Mode)</span>
          </div>
          <div className="py-6 flex flex-col items-center justify-center">
            <p className="text-xs font-semibold text-stone-500">Sponsored Content Zone</p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Live ads load dynamically when configured in Admin &gt; Settings &gt; Ads
            </p>
          </div>
        </div>
      ) : (
        <div
          id={`adsterra-${format}-${pageId || 'slot'}`}
          className="min-h-[90px] w-full flex items-center justify-center"
        >
          {/* Real Adsterra script will mount here when live zone IDs are configured */}
        </div>
      )}
    </div>
  );
}
