import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const now = new Date();
    const offers = await db.offer.findMany({
      where: {
        isActive: true,
        endDate: { gte: now },
      },
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: offers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
