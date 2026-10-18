export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reservationSchema } from '@/lib/validation';
import { generateReferenceNumber } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

// In-memory simple IP rate limiting for MVP
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 3600 * 1000 });
    return false;
  }
  if (entry.count >= 3) {
    return true;
  }
  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many reservation attempts. Please call us directly at 070223 73444 or try again in an hour.',
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = reservationSchema.parse(body);

    // Duplicate check for same date and phone
    const existingBooking = await db.reservation.findFirst({
      where: {
        customerPhone: validatedData.customerPhone,
        reservationDate: validatedData.reservationDate,
        status: { in: ['pending', 'confirmed'] },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_BOOKING',
            message: `A reservation already exists for this phone number on ${validatedData.reservationDate} (Ref: ${existingBooking.referenceNumber}). Please call us at 070223 73444 for modifications.`,
          },
        },
        { status: 400 }
      );
    }

    // Sequence count for today's reference ID
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const todaysReservationsCount = await db.reservation.count({
      where: {
        createdAt: {
          gte: new Date(`${todayStr}T00:00:00.000Z`),
        },
      },
    });

    const referenceNumber = generateReferenceNumber(todaysReservationsCount + 1);

    const reservation = await db.reservation.create({
      data: {
        referenceNumber,
        customerName: validatedData.customerName,
        customerPhone: validatedData.customerPhone,
        customerEmail: validatedData.customerEmail || null,
        reservationDate: validatedData.reservationDate,
        reservationTime: validatedData.reservationTime,
        guestCount: validatedData.guestCount,
        specialRequests: validatedData.specialRequests || null,
        occasion: validatedData.occasion || null,
        status: 'pending',
        ipAddress: ip,
      },
    });

    // Fire analytics
    trackEvent('reservation_submit', {
      referenceNumber,
      guests: validatedData.guestCount,
      date: validatedData.reservationDate,
    });

    return NextResponse.json(
      {
        success: true,
        referenceNumber: reservation.referenceNumber,
        status: reservation.status,
        data: reservation,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Reservation creation error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: error.errors[0]?.message || 'Invalid reservation data',
            fields: error.errors,
          },
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: "We're sorry, something went wrong. Please try again or call us at 070223 73444.",
        },
      },
      { status: 500 }
    );
  }
}
