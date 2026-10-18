import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import configData from '@/config/config.json';

export async function GET() {
  try {
    const settings = await db.restaurantSettings.findFirst();
    if (!settings) {
      return NextResponse.json({ success: true, data: configData });
    }

    return NextResponse.json({
      success: true,
      data: {
        restaurantName: settings.restaurantName,
        tagline: settings.tagline,
        phone: settings.phone,
        whatsappNumber: settings.whatsappNumber,
        address: settings.address,
        googleMapsEmbedUrl: settings.googleMapsEmbedUrl,
        googleMapsDirectionsUrl: settings.googleMapsDirectionsUrl,
        logoUrl: settings.logoUrl,
        instagram: settings.instagram,
        facebook: settings.facebook,
        aboutText: settings.aboutText,
        heroImageUrl: settings.heroImageUrl,
        seoTitle: settings.seoTitle,
        seoDescription: settings.seoDescription,
        openingHours: JSON.parse(settings.openingHours || '[]'),
        highlights: JSON.parse(settings.highlights || '[]'),
        reservationMaxGuests: settings.reservationMaxGuests,
        reservationMaxFutureDays: settings.reservationMaxFutureDays,
        reviewSubmissionEnabled: settings.reviewSubmissionEnabled,
        adsGlobalEnabled: settings.adsGlobalEnabled,
        adsConfig: JSON.parse(settings.adsConfig || '{}'),
      },
    });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch settings' } },
      { status: 500 }
    );
  }
}
