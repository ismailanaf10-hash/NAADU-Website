import { db } from './db';

export async function trackEvent(eventType: string, metadata?: Record<string, any>, sessionId?: string) {
  try {
    await db.analyticsEvent.create({
      data: {
        eventType,
        metadata: metadata ? JSON.stringify(metadata) : null,
        sessionId: sessionId || null,
      },
    });
  } catch (err) {
    // Non-blocking fire-and-forget
    console.error('Failed to log analytics event:', err);
  }
}
