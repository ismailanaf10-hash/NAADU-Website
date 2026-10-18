'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Settings,
  Building,
  Clock,
  Phone,
  Search,
  DollarSign,
  CalendarDays,
  Save,
  CheckCircle,
  AlertCircle,
  MapPin,
  Share2,
} from 'lucide-react';

interface DaySchedule {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

const DEFAULT_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    'general' | 'hours' | 'contact' | 'seo' | 'ads' | 'reservations'
  >('general');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  // General State
  const [restaurantName, setRestaurantName] = useState('');
  const [tagline, setTagline] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');

  // Opening Hours State
  const [openingHours, setOpeningHours] = useState<DaySchedule[]>([]);

  // Contact & Social State
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState('');
  const [googleMapsDirectionsUrl, setGoogleMapsDirectionsUrl] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  // SEO State
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Ads & Monetization State
  const [adsGlobalEnabled, setAdsGlobalEnabled] = useState(true);
  const [nativeBannerEnabled, setNativeBannerEnabled] = useState(true);
  const [nativeBannerZoneId, setNativeBannerZoneId] = useState('');
  const [standardBannerEnabled, setStandardBannerEnabled] = useState(true);
  const [standardBannerZoneId, setStandardBannerZoneId] = useState('');
  const [socialBarEnabled, setSocialBarEnabled] = useState(false);
  const [socialBarZoneId, setSocialBarZoneId] = useState('');

  // Reservation & Review State
  const [reservationMaxGuests, setReservationMaxGuests] = useState(20);
  const [reservationMaxFutureDays, setReservationMaxFutureDays] = useState(60);
  const [reviewSubmissionEnabled, setReviewSubmissionEnabled] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch('/api/v1/admin/settings');
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        setRestaurantName(d.restaurantName || '');
        setTagline(d.tagline || '');
        setAboutText(d.aboutText || '');
        setLogoUrl(d.logoUrl || '');
        setHeroImageUrl(d.heroImageUrl || '');

        // Hours
        if (Array.isArray(d.openingHours) && d.openingHours.length > 0) {
          setOpeningHours(d.openingHours);
        } else {
          setOpeningHours(
            DEFAULT_DAYS.map((day) => ({
              day,
              openTime: '11:30',
              closeTime: '23:00',
              isClosed: false,
            }))
          );
        }

        // Contact
        setPhone(d.phone || '');
        setWhatsappNumber(d.whatsappNumber || '');
        setAddress(d.address || '');
        setGoogleMapsEmbedUrl(d.googleMapsEmbedUrl || '');
        setGoogleMapsDirectionsUrl(d.googleMapsDirectionsUrl || '');
        setInstagram(d.instagram || '');
        setFacebook(d.facebook || '');

        // SEO
        setSeoTitle(d.seoTitle || '');
        setSeoDescription(d.seoDescription || '');

        // Ads
        setAdsGlobalEnabled(Boolean(d.adsGlobalEnabled));
        const ads = d.adsConfig || {};
        setNativeBannerEnabled(ads.nativeBannerEnabled ?? true);
        setNativeBannerZoneId(ads.nativeBannerZoneId || '');
        setStandardBannerEnabled(ads.standardBannerEnabled ?? true);
        setStandardBannerZoneId(ads.standardBannerZoneId || '');
        setSocialBarEnabled(ads.socialBarEnabled ?? false);
        setSocialBarZoneId(ads.socialBarZoneId || '');

        // Reservations
        setReservationMaxGuests(d.reservationMaxGuests || 20);
        setReservationMaxFutureDays(d.reservationMaxFutureDays || 60);
        setReviewSubmissionEnabled(Boolean(d.reviewSubmissionEnabled));
      }
    } catch {} finally {
      setLoading(false);
    }
  }

  function handleHourChange(
    index: number,
    field: keyof DaySchedule,
    value: any
  ) {
    setOpeningHours((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setSavedSuccess(false);

    const payload = {
      restaurantName,
      tagline,
      aboutText,
      logoUrl,
      heroImageUrl,
      openingHours,
      phone,
      whatsappNumber,
      address,
      googleMapsEmbedUrl,
      googleMapsDirectionsUrl,
      instagram,
      facebook,
      seoTitle,
      seoDescription,
      adsGlobalEnabled,
      adsConfig: {
        globalEnabled: adsGlobalEnabled,
        nativeBannerEnabled,
        nativeBannerZoneId,
        standardBannerEnabled,
        standardBannerZoneId,
        socialBarEnabled,
        socialBarZoneId,
      },
      reservationMaxGuests,
      reservationMaxFutureDays,
      reviewSubmissionEnabled,
    };

    try {
      const res = await fetch('/api/v1/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Failed to save settings.');
        return;
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch {
      setError('A network error occurred while updating settings.');
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { id: 'general', label: 'General Info', icon: Building },
    { id: 'hours', label: 'Opening Hours', icon: Clock },
    { id: 'contact', label: 'Contact & Location', icon: MapPin },
    { id: 'seo', label: 'SEO & Meta', icon: Search },
    { id: 'ads', label: 'Ads & Monetization', icon: DollarSign },
    { id: 'reservations', label: 'Reservations', icon: CalendarDays },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coastal-900 font-serif">Restaurant Settings</h1>
          <p className="text-sm text-stone-500 mt-1">
            Configure contact details, operating hours, SEO, and website functionality
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> Changes Saved!
            </span>
          )}
          <Button onClick={handleSave} disabled={saving || loading}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-sand-200 overflow-x-auto pb-px scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-primary-600 text-primary-600 bg-sand-50/50'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-sand-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {loading ? (
        <div className="p-12 text-center text-stone-400 bg-white rounded-3xl border border-sand-200">
          Loading restaurant settings...
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm">
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-coastal-900 font-serif mb-1">
                  Brand & Restaurant Profile
                </h3>
                <p className="text-xs text-stone-500">
                  Basic restaurant details displayed across the website header and hero banners.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Authentic Coastal Mangalurean Flavors & Live Sports"
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    About the Restaurant (Summary)
                  </label>
                  <textarea
                    rows={4}
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    placeholder="Naadu Restaurant celebrates the authentic culinary traditions of Coastal Karnataka..."
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Logo Image URL
                    </label>
                    <input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="/images/logo.png"
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Homepage Hero Image URL
                    </label>
                    <input
                      type="text"
                      value={heroImageUrl}
                      onChange={(e) => setHeroImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPENING HOURS */}
          {activeTab === 'hours' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-coastal-900 font-serif mb-1">
                  Operating Hours
                </h3>
                <p className="text-xs text-stone-500">
                  Set daily opening and closing hours. Used by the reservation time picker and footer.
                </p>
              </div>

              <div className="space-y-3">
                {openingHours.map((schedule, index) => (
                  <div
                    key={schedule.day}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-sand-50 border border-sand-200"
                  >
                    <div className="w-32 font-bold text-sm text-coastal-900">{schedule.day}</div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Open:</span>
                        <input
                          type="time"
                          value={schedule.openTime}
                          disabled={schedule.isClosed}
                          onChange={(e) => handleHourChange(index, 'openTime', e.target.value)}
                          className="px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-40"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Close:</span>
                        <input
                          type="time"
                          value={schedule.closeTime}
                          disabled={schedule.isClosed}
                          onChange={(e) => handleHourChange(index, 'closeTime', e.target.value)}
                          className="px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-40"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={schedule.isClosed}
                        onChange={(e) => handleHourChange(index, 'isClosed', e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-xs font-semibold text-stone-700">Closed All Day</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & LOCATION */}
          {activeTab === 'contact' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-coastal-900 font-serif mb-1">
                  Contact Information & Location
                </h3>
                <p className="text-xs text-stone-500">
                  Customer support telephone, WhatsApp chat line, address, and Google Maps embed.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="070223 73444"
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      WhatsApp Number (International format)
                    </label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+917022373444"
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Physical Restaurant Address
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006"
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Google Maps Embed URL (iframe src)
                  </label>
                  <input
                    type="text"
                    value={googleMapsEmbedUrl}
                    onChange={(e) => setGoogleMapsEmbedUrl(e.target.value)}
                    placeholder="https://www.google.com/maps/embed?..."
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Google Maps Directions Link
                  </label>
                  <input
                    type="text"
                    value={googleMapsDirectionsUrl}
                    onChange={(e) => setGoogleMapsDirectionsUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Instagram Profile URL
                    </label>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="https://instagram.com/naadurestaurant"
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Facebook Page URL
                    </label>
                    <input
                      type="text"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="https://facebook.com/naadurestaurant"
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEO & META */}
          {activeTab === 'seo' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-coastal-900 font-serif mb-1">
                  Search Engine Optimization (SEO)
                </h3>
                <p className="text-xs text-stone-500">
                  Control how Naadu Restaurant appears in Google search results and social previews.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Default Website Title Tag
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Naadu Restaurant — Mangaluru | Authentic Coastal Karnataka Dining"
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Default Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Experience authentic coastal dining, spicy Ghee Roasts, vegetarian delights, and live sports screenings at Naadu Restaurant in Chilimbi, Mangaluru."
                    className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ADS & MONETIZATION */}
          {activeTab === 'ads' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-coastal-900 font-serif mb-1">
                  Adsterra Monetization Controls
                </h3>
                <p className="text-xs text-stone-500">
                  Enable non-intrusive banner placements. Note: reservation and conversion flows are always ad-free.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-coastal-900 block">Global Advertising</span>
                  <span className="text-xs text-stone-500">
                    Master switch for all external ad placements across the site
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adsGlobalEnabled}
                    onChange={(e) => setAdsGlobalEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="space-y-4 pt-2">
                {/* Native Banner */}
                <div className="p-4 rounded-2xl border border-sand-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-800">Native Banner</span>
                    <input
                      type="checkbox"
                      checked={nativeBannerEnabled}
                      onChange={(e) => setNativeBannerEnabled(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                  </div>
                  <input
                    type="text"
                    value={nativeBannerZoneId}
                    onChange={(e) => setNativeBannerZoneId(e.target.value)}
                    placeholder="Adsterra Native Zone ID (e.g. 1234567)"
                    className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                {/* Standard Banner */}
                <div className="p-4 rounded-2xl border border-sand-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-800">Standard Display Banner</span>
                    <input
                      type="checkbox"
                      checked={standardBannerEnabled}
                      onChange={(e) => setStandardBannerEnabled(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                  </div>
                  <input
                    type="text"
                    value={standardBannerZoneId}
                    onChange={(e) => setStandardBannerZoneId(e.target.value)}
                    placeholder="Adsterra Display Banner Zone ID"
                    className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                {/* Social Bar */}
                <div className="p-4 rounded-2xl border border-sand-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-800">Social Bar (Informational pages only)</span>
                    <input
                      type="checkbox"
                      checked={socialBarEnabled}
                      onChange={(e) => setSocialBarEnabled(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                  </div>
                  <input
                    type="text"
                    value={socialBarZoneId}
                    onChange={(e) => setSocialBarZoneId(e.target.value)}
                    placeholder="Adsterra Social Bar Zone ID"
                    className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold text-coastal-900 font-serif mb-1">
                  Reservations & Customer Reviews Rules
                </h3>
                <p className="text-xs text-stone-500">
                  Control capacity constraints and customer review submission permissions.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Maximum Guests Per Online Booking
                    </label>
                    <input
                      type="number"
                      value={reservationMaxGuests}
                      onChange={(e) => setReservationMaxGuests(parseInt(e.target.value, 10) || 20)}
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      Parties larger than this will be directed to call the restaurant directly.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Maximum Future Booking Window (Days)
                    </label>
                    <input
                      type="number"
                      value={reservationMaxFutureDays}
                      onChange={(e) => setReservationMaxFutureDays(parseInt(e.target.value, 10) || 60)}
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      How far in advance customers can reserve tables online (default 60 days).
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 mt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reviewSubmissionEnabled}
                      onChange={(e) => setReviewSubmissionEnabled(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">
                        Allow Public Review Submissions
                      </span>
                      <span className="text-xs text-stone-500 block">
                        When enabled, a &ldquo;Leave a Review&rdquo; form appears on the public reviews page. All submissions require admin moderation.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Save Action */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-sand-200 mt-8">
            <Button onClick={handleSave} disabled={saving || loading}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving Changes...' : 'Save All Settings'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
