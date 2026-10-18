import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const items = await db.menuItem.findMany({
      where: {
        isAvailable: true,
        isPopular: true,
        category: { isEnabled: true },
      },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      take: 6,
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 });
  }
}
