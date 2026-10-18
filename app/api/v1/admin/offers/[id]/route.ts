import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { offerSchema } from '@/lib/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const offer = await db.offer.findUnique({
      where: { id: params.id },
    });
    if (!offer) return NextResponse.json({ success: false, error: 'Offer not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: offer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const data = offerSchema.parse(body);

    const updated = await db.offer.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        discountText: data.discountText,
        imageUrl: data.imageUrl || null,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        terms: data.terms || null,
        isActive: data.isActive,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors[0]?.message }, { status: 422 });
    }
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
    await db.offer.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Offer deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
