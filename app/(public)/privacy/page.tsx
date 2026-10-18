import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Naadu Restaurant',
  description: 'Privacy Policy for Naadu Restaurant website. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-coastal-900 font-serif mb-4">Privacy Policy</h1>
          <p className="text-stone-500 text-sm">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-sand-200 p-8 sm:p-12 shadow-card prose prose-stone max-w-none">
          <h2 className="text-xl font-bold text-coastal-900 font-serif">1. Information We Collect</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            When you make a reservation through our website, we collect your name, phone number, email address (optional), number of guests, preferred date and time, and any special requests. We also collect anonymous analytics data (page views, button clicks) to improve your experience. We do not use third-party tracking cookies.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">2. How We Use Your Information</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Your personal information is used exclusively for:
          </p>
          <ul className="text-sm text-stone-600 list-disc pl-5 space-y-1">
            <li>Processing and managing your table reservations</li>
            <li>Communicating reservation confirmations or changes via phone or WhatsApp</li>
            <li>Responding to your inquiries and feedback</li>
            <li>Improving our menu and restaurant services based on aggregated anonymous usage data</li>
          </ul>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">3. Data Storage & Security</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            All data is stored securely on our private servers. We implement industry-standard security measures to protect your information. Reservation data is retained for up to 12 months for operational reference and then anonymized or deleted.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">4. Third-Party Services</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            We may display non-intrusive advertisements via Adsterra on certain pages. These ads may use cookies for basic ad display purposes. We do not share your personal reservation or contact data with any third-party advertisers. Our website embeds Google Maps for directions, which is subject to Google&apos;s privacy policy.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">5. Your Rights</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            You have the right to request access to, correction of, or deletion of your personal information at any time by contacting us via phone or WhatsApp. We will respond to your request within a reasonable timeframe.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">6. Contact Us</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-sm text-stone-600">
            <strong>Naadu Restaurant</strong><br />
            Kulur Ferry Rd, Chilimbi, Ladyhill, Mangaluru, Karnataka 575006<br />
            Phone: <a href="tel:07022373444" className="text-primary-600 hover:underline">070223 73444</a><br />
            WhatsApp: <a href="https://wa.me/917022373444" className="text-primary-600 hover:underline">+91 70223 73444</a>
          </p>

          <div className="mt-10 pt-6 border-t border-sand-200 text-center">
            <Link
              href="/"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
