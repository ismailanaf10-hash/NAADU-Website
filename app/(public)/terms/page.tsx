import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — Naadu Restaurant',
  description: 'Terms and Conditions for using Naadu Restaurant website and reservation services.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-coastal-900 font-serif mb-4">Terms & Conditions</h1>
          <p className="text-stone-500 text-sm">Last updated: September 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-sand-200 p-8 sm:p-12 shadow-card prose prose-stone max-w-none">
          <h2 className="text-xl font-bold text-coastal-900 font-serif">1. General</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            By using the Naadu Restaurant website and its services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our website.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">2. Reservation Policy</h2>
          <ul className="text-sm text-stone-600 list-disc pl-5 space-y-1">
            <li>Reservations are subject to availability and confirmation by the restaurant management.</li>
            <li>Online reservations can be made up to 60 days in advance with a maximum of 20 guests.</li>
            <li>Each reservation receives a unique reference number (format: NAADU-YYYYMMDD-XXXX).</li>
            <li>Reservations may be confirmed, modified, or cancelled by contacting us via phone or WhatsApp.</li>
            <li>We kindly request guests to arrive within 15 minutes of their reserved time. Unclaimed reservations may be released after 30 minutes.</li>
            <li>For groups larger than 20, please contact us directly by phone.</li>
          </ul>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">3. Menu & Pricing</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            All prices listed on our website are in Indian Rupees (₹) and are inclusive of applicable taxes unless otherwise stated. Menu items, prices, and availability are subject to change without prior notice. While we strive to ensure accuracy, allergen and ingredient information is provided for guidance only.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">4. Customer Reviews</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            By submitting a review, you grant Naadu Restaurant the right to display your review (name and content) on our website. All reviews are subject to moderation. We reserve the right to reject or remove reviews containing offensive language, spam, or irrelevant content.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">5. Offers & Promotions</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            All promotional offers are valid only for the specified period and subject to terms and conditions mentioned alongside each offer. Offers cannot be combined unless explicitly stated. Naadu Restaurant reserves the right to modify or withdraw any offer at any time.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">6. Intellectual Property</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            All content on this website, including text, images, logos, and design elements, is the property of Naadu Restaurant and is protected by intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">7. Limitation of Liability</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Naadu Restaurant shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or its services. We strive to maintain website uptime but do not guarantee uninterrupted access.
          </p>

          <h2 className="text-xl font-bold text-coastal-900 font-serif mt-8">8. Contact</h2>
          <p className="text-sm text-stone-600">
            For questions about these Terms, contact us at:<br />
            <strong>Naadu Restaurant</strong><br />
            Kulur Ferry Rd, Chilimbi, Ladyhill, Mangaluru, Karnataka 575006<br />
            Phone: <a href="tel:07022373444" className="text-primary-600 hover:underline">070223 73444</a>
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
