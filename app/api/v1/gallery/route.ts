import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const whereClause: any = {
      isVisible: true,
    };

    if (category && category !== 'all') {
      whereClause.category = category;
    }

    const images = await db.galleryImage.findMany({
      where: whereClause,
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
