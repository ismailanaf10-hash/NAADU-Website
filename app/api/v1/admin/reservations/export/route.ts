export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = getAdminSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  try {
    const reservations = await db.reservation.findMany({
      orderBy: { reservationDate: 'desc' },
    });

    const headers = [
      'Reference Number',
      'Customer Name',
      'Phone',
      'Email',
      'Date',
      'Time',
      'Guests',
      'Occasion',
      'Special Requests',
      'Status',
      'Admin Notes',
      'Submitted At',
    ];

    const rows = reservations.map((r) => [
      `"${r.referenceNumber}"`,
      `"${r.customerName.replace(/"/g, '""')}"`,
      `"${r.customerPhone}"`,
      `"${r.customerEmail || ''}"`,
      `"${r.reservationDate}"`,
      `"${r.reservationTime}"`,
      r.guestCount,
      `"${(r.occasion || '').replace(/"/g, '""')}"`,
      `"${(r.specialRequests || '').replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${(r.adminNotes || '').replace(/"/g, '""')}"`,
      `"${r.createdAt.toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="naadu_reservations_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
