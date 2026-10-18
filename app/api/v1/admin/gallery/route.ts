import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const images = await db.galleryImage.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json({ success: true, data: images });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { imageUrl, caption, altText, category, isFeatured, isVisible, displayOrder } = body;

    if (!imageUrl || !category) {
      return NextResponse.json({ success: false, error: 'Image URL and category are required' }, { status: 400 });
    }

    const image = await db.galleryImage.create({
      data: {
        imageUrl,
        thumbnailUrl: imageUrl,
        caption: caption || null,
        altText: altText || 'Naadu Restaurant Gallery',
        category,
        isFeatured: Boolean(isFeatured),
        isVisible: isVisible !== undefined ? Boolean(isVisible) : true,
        displayOrder: Number(displayOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
