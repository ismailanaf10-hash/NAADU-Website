import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const updated = await db.galleryImage.update({
      where: { id: params.id },
      data: {
        imageUrl: body.imageUrl,
        thumbnailUrl: body.thumbnailUrl || body.imageUrl,
        caption: body.caption || null,
        altText: body.altText || null,
        category: body.category,
        isFeatured: Boolean(body.isFeatured),
        isVisible: Boolean(body.isVisible),
        displayOrder: Number(body.displayOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    await db.galleryImage.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
