import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { ref: string } }
) {
  try {
    const { ref } = params;
    const reservation = await db.reservation.findUnique({
      where: { referenceNumber: ref },
      select: {
        referenceNumber: true,
        customerName: true,
        customerPhone: true,
        customerEmail: true,
        reservationDate: true,
        reservationTime: true,
        guestCount: true,
        specialRequests: true,
        occasion: true,
        status: true,
        createdAt: true,
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { success: false, error: { message: 'Reservation not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: reservation,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
