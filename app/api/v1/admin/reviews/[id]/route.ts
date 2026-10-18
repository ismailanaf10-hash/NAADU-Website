import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { status, isFeatured, adminNote } = body;

    const data: any = {};
    if (status !== undefined) {
      data.status = status;
      data.moderatedAt = new Date();
    }
    if (isFeatured !== undefined) {
      data.isFeatured = Boolean(isFeatured);
    }
    if (adminNote !== undefined) {
      data.adminNote = adminNote;
    }

    const updated = await db.review.update({
      where: { id: params.id },
      data,
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
    await db.review.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Review deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
