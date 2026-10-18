export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const item = await db.menuItem.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: { message: 'Menu item not found' } },
        { status: 404 }
      );
    }

    // Increment viewCount non-blockingly
    db.menuItem.update({
      where: { id: item.id },
      data: { viewCount: { increment: 1 } },
    }).catch(console.error);

    // Fetch related items in same category
    const relatedItems = await db.menuItem.findMany({
      where: {
        categoryId: item.categoryId,
        id: { not: item.id },
        isAvailable: true,
      },
      take: 4,
    });

    return NextResponse.json({
      success: true,
      data: {
        item,
        relatedItems,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
