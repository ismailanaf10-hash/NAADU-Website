import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, metadata, sessionId } = body;

    if (!eventType) {
      return NextResponse.json({ success: false, error: 'Missing eventType' }, { status: 400 });
    }

    await trackEvent(eventType, metadata, sessionId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
