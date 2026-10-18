export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const categories = await db.menuCategory.findMany({
      where: { isEnabled: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { items: { where: { isAvailable: true } } },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: cat.imageUrl,
        displayOrder: cat.displayOrder,
        itemCount: cat._count.items,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch categories' } },
      { status: 500 }
    );
  }
}
