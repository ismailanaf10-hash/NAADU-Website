'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardMetricCard } from '@/components/admin/DashboardMetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/Button';
import {
  CalendarDays,
  UtensilsCrossed,
  Tag,
  Star,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

interface DashboardData {
  totalMenuItems: number;
  totalReservationsToday: number;
  pendingReservations: number;
  confirmedReservations: number;
  activeOffers: number;
  pendingReviews: number;
  avgRating: number;
  recentReservations: any[];
  bookingTrend: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/admin/dashboard');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-12 h-12 text-stone-300 mx-auto mb-4" />
        <p className="text-stone-500">Failed to load dashboard data.</p>
        <Button variant="outline" size="sm" onClick={fetchDashboard} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-coastal-900 font-serif">Dashboard</h1>
          <p className="text-sm text-stone-500 mt-1">
            Overview of today&apos;s operations at Naadu Restaurant
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchDashboard}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardMetricCard
          label="Today's Reservations"
          value={data.totalReservationsToday}
          icon={<CalendarDays className="w-5 h-5" />}
        />
        <DashboardMetricCard
          label="Pending Bookings"
          value={data.pendingReservations}
          icon={<Clock className="w-5 h-5" />}
          className={data.pendingReservations > 0 ? 'ring-2 ring-amber-400/30' : ''}
        />
        <DashboardMetricCard
          label="Active Menu Items"
          value={data.totalMenuItems}
          icon={<UtensilsCrossed className="w-5 h-5" />}
        />
        <DashboardMetricCard
          label="Active Offers"
          value={data.activeOffers}
          icon={<Tag className="w-5 h-5" />}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardMetricCard
          label="Confirmed Today"
          value={data.confirmedReservations}
          icon={<Users className="w-5 h-5" />}
        />
        <DashboardMetricCard
          label="Pending Reviews"
          value={data.pendingReviews}
          icon={<Star className="w-5 h-5" />}
        />
        <DashboardMetricCard
          label="Average Rating"
          value={`${data.avgRating} / 5`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Pending Alerts */}
      {data.pendingReservations > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-amber-800">
              {data.pendingReservations} Reservation{data.pendingReservations !== 1 ? 's' : ''} Awaiting Confirmation
            </h3>
            <p className="text-xs text-amber-700 mt-1">
              Please review and confirm or reject pending reservations to ensure a smooth dining experience.
            </p>
          </div>
          <Link href="/admin/reservations?status=pending">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
              Review Now
            </Button>
          </Link>
        </div>
      )}

      {/* Recent Reservations */}
      <div className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-coastal-900 font-serif">Recent Reservations</h2>
          <Link
            href="/admin/reservations"
            className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {data.recentReservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sand-50 text-stone-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3">Reference</th>
                  <th className="text-left px-6 py-3">Guest</th>
                  <th className="text-left px-6 py-3">Date & Time</th>
                  <th className="text-left px-6 py-3">Guests</th>
                  <th className="text-left px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {data.recentReservations.map((r: any) => (
                  <tr key={r.id} className="hover:bg-sand-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <Link
                        href={`/admin/reservations/${r.id}`}
                        className="font-mono text-xs text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        {r.referenceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-3 font-medium text-coastal-900">{r.customerName}</td>
                    <td className="px-6 py-3 text-stone-500">
                      {r.reservationDate} · {r.reservationTime}
                    </td>
                    <td className="px-6 py-3 text-stone-500">{r.guestCount}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <CalendarDays className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-sm text-stone-500">No reservations yet today.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/menu/new"
          className="bg-white rounded-2xl border border-sand-200 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
        >
          <UtensilsCrossed className="w-6 h-6 text-primary-600 mb-2" />
          <h4 className="font-bold text-coastal-900 text-sm group-hover:text-primary-600 transition-colors">
            Add Menu Item
          </h4>
          <p className="text-xs text-stone-500 mt-1">Create a new dish or beverage</p>
        </Link>
        <Link
          href="/admin/offers"
          className="bg-white rounded-2xl border border-sand-200 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
        >
          <Tag className="w-6 h-6 text-gold-500 mb-2" />
          <h4 className="font-bold text-coastal-900 text-sm group-hover:text-primary-600 transition-colors">
            Manage Offers
          </h4>
          <p className="text-xs text-stone-500 mt-1">Create or edit promotions</p>
        </Link>
        <Link
          href="/admin/reviews"
          className="bg-white rounded-2xl border border-sand-200 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
        >
          <Star className="w-6 h-6 text-amber-500 mb-2" />
          <h4 className="font-bold text-coastal-900 text-sm group-hover:text-primary-600 transition-colors">
            Moderate Reviews
          </h4>
          <p className="text-xs text-stone-500 mt-1">Approve or manage guest feedback</p>
        </Link>
      </div>
    </div>
  );
}
