import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split('T')[0];

    // Metrics Row 1: Reservations
    const [
      totalToday,
      pendingCount,
      confirmedToday,
      upcomingWeekCount,
    ] = await Promise.all([
      db.reservation.count({ where: { reservationDate: todayStr } }),
      db.reservation.count({ where: { status: 'pending' } }),
      db.reservation.count({ where: { reservationDate: todayStr, status: 'confirmed' } }),
      db.reservation.count({
        where: {
          reservationDate: { gte: todayStr, lte: nextWeekStr },
          status: { in: ['confirmed', 'pending'] },
        },
      }),
    ]);

    // Metrics Row 2: Menu & Content
    const [
      totalMenuItems,
      availableMenuItems,
      unavailableMenuItems,
      activeOffersCount,
      totalGalleryCount,
    ] = await Promise.all([
      db.menuItem.count(),
      db.menuItem.count({ where: { isAvailable: true } }),
      db.menuItem.count({ where: { isAvailable: false } }),
      db.offer.count({ where: { isActive: true, endDate: { gte: today } } }),
      db.galleryImage.count({ where: { isVisible: true } }),
    ]);

    // Status breakdown
    const statusCounts = await db.reservation.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    // Recent 10 reservations
    const recentReservations = await db.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // 14-day reservation activity data
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 13);
    const fourteenDaysAgoStr = fourteenDaysAgo.toISOString().split('T')[0];

    const recentDailyReservations = await db.reservation.findMany({
      where: {
        reservationDate: { gte: fourteenDaysAgoStr },
      },
      select: {
        reservationDate: true,
        status: true,
      },
    });

    const dailyMap: Record<string, number> = {};
    for (let i = 0; i < 14; i++) {
      const d = new Date(fourteenDaysAgo);
      d.setDate(d.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      dailyMap[ds] = 0;
    }

    recentDailyReservations.forEach((r) => {
      if (dailyMap[r.reservationDate] !== undefined) {
        dailyMap[r.reservationDate] += 1;
      }
    });

    const dailyChart = Object.entries(dailyMap).map(([date, count]) => ({
      date,
      count,
    }));

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          reservationsToday: totalToday,
          pendingReservations: pendingCount,
          confirmedToday: confirmedToday,
          upcomingWeekReservations: upcomingWeekCount,
          totalMenuItems,
          availableMenuItems,
          unavailableMenuItems,
          activeOffers: activeOffersCount,
          galleryImages: totalGalleryCount,
        },
        statusDistribution: statusCounts.map((s) => ({ status: s.status, count: s._count.id })),
        dailyChart,
        recentReservations,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
