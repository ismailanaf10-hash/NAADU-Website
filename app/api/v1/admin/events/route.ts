export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { eventSchema } from '@/lib/validation';

export async function GET() {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const events = await db.event.findMany({
      orderBy: { eventDate: 'desc' },
    });
    return NextResponse.json({ success: true, data: events });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const data = eventSchema.parse(body);

    const event = await db.event.create({
      data: {
        title: data.title,
        description: data.description,
        eventDate: data.eventDate,
        eventTime: data.eventTime,
        imageUrl: data.imageUrl || null,
        ctaLabel: data.ctaLabel || null,
        ctaUrl: data.ctaUrl || null,
        isPublished: data.isPublished,
      },
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors[0]?.message }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
