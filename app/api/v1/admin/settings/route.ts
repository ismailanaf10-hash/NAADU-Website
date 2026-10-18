export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const settings = await db.restaurantSettings.findFirst();
    if (!settings) {
      return NextResponse.json({ success: false, error: 'Settings not initialized' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...settings,
        openingHours: JSON.parse(settings.openingHours || '[]'),
        highlights: JSON.parse(settings.highlights || '[]'),
        adsConfig: JSON.parse(settings.adsConfig || '{}'),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await db.restaurantSettings.findFirst();

    const updateData: any = {};

    if (body.restaurantName !== undefined) updateData.restaurantName = body.restaurantName;
    if (body.tagline !== undefined) updateData.tagline = body.tagline;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.whatsappNumber !== undefined) updateData.whatsappNumber = body.whatsappNumber;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.googleMapsEmbedUrl !== undefined) updateData.googleMapsEmbedUrl = body.googleMapsEmbedUrl;
    if (body.googleMapsDirectionsUrl !== undefined) updateData.googleMapsDirectionsUrl = body.googleMapsDirectionsUrl;
    if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl;
    if (body.instagram !== undefined) updateData.instagram = body.instagram;
    if (body.facebook !== undefined) updateData.facebook = body.facebook;
    if (body.aboutText !== undefined) updateData.aboutText = body.aboutText;
    if (body.heroImageUrl !== undefined) updateData.heroImageUrl = body.heroImageUrl;
    if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle;
    if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription;
    if (body.reservationMaxGuests !== undefined) updateData.reservationMaxGuests = Number(body.reservationMaxGuests);
    if (body.reservationMaxFutureDays !== undefined) updateData.reservationMaxFutureDays = Number(body.reservationMaxFutureDays);
    if (body.reviewSubmissionEnabled !== undefined) updateData.reviewSubmissionEnabled = Boolean(body.reviewSubmissionEnabled);
    if (body.adsGlobalEnabled !== undefined) updateData.adsGlobalEnabled = Boolean(body.adsGlobalEnabled);

    if (body.openingHours !== undefined) {
      updateData.openingHours = typeof body.openingHours === 'string' ? body.openingHours : JSON.stringify(body.openingHours);
    }
    if (body.highlights !== undefined) {
      updateData.highlights = typeof body.highlights === 'string' ? body.highlights : JSON.stringify(body.highlights);
    }
    if (body.adsConfig !== undefined) {
      updateData.adsConfig = typeof body.adsConfig === 'string' ? body.adsConfig : JSON.stringify(body.adsConfig);
    }

    let updated;
    if (existing) {
      updated = await db.restaurantSettings.update({
        where: { id: existing.id },
        data: updateData,
      });
    } else {
      updated = await db.restaurantSettings.create({
        data: updateData,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        ...updated,
        openingHours: JSON.parse(updated.openingHours || '[]'),
        highlights: JSON.parse(updated.highlights || '[]'),
        adsConfig: JSON.parse(updated.adsConfig || '{}'),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
