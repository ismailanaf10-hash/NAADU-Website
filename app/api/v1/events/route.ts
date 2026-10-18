import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const events = await db.event.findMany({
      where: {
        isPublished: true,
        eventDate: { gte: today },
      },
      orderBy: { eventDate: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
