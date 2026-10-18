import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    const isVegParam = searchParams.get('isVeg');
    const isKidsParam = searchParams.get('isKids');

    const whereClause: any = {
      isAvailable: true,
      category: {
        isEnabled: true,
      },
    };

    if (categorySlug) {
      whereClause.category = {
        slug: categorySlug,
        isEnabled: true,
      };
    }

    if (searchQuery) {
      whereClause.name = {
        contains: searchQuery,
      };
    }

    if (isVegParam === 'true') {
      whereClause.isVeg = true;
    } else if (isVegParam === 'false') {
      whereClause.isVeg = false;
    }

    if (isKidsParam === 'true') {
      whereClause.isKidsMenu = true;
    }

    const items = await db.menuItem.findMany({
      where: whereClause,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error: any) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch menu items' } },
      { status: 500 }
    );
  }
}
