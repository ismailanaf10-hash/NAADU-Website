'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import {
  CalendarDays,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  Users,
  MessageSquare,
  FileText,
  AlertCircle,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';

interface Reservation {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  specialRequests?: string | null;
  occasion?: string | null;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  adminNotes?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');

  // Selected reservation for modal view / editing note
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [noteText, setNoteText] = useState('');
  const [rejectionReasonText, setRejectionReasonText] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, [statusFilter, dateFilter]);

  async function fetchReservations() {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (statusFilter && statusFilter !== 'all') query.set('status', statusFilter);
      if (dateFilter) query.set('date', dateFilter);

      const res = await fetch(`/api/v1/admin/reservations?${query.toString()}`);
      const json = await res.json();
      if (json.success) setReservations(json.data);
    } catch {} finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    id: string,
    newStatus: Reservation['status'],
    rejectionReason?: string
  ) {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          rejectionReason: rejectionReason || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...json.data } : r))
        );
        if (selectedRes && selectedRes.id === id) {
          setSelectedRes(json.data);
        }
      }
    } catch {} finally {
      setActionLoading(false);
    }
  }

  async function saveNotes() {
    if (!selectedRes) return;
    setActionLoading(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/v1/admin/reservations/${selectedRes.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminNotes: noteText,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setReservations((prev) =>
          prev.map((r) => (r.id === selectedRes.id ? { ...r, adminNotes: noteText } : r))
        );
        setSelectedRes((prev) => (prev ? { ...prev, adminNotes: noteText } : null));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {} finally {
      setActionLoading(false);
    }
  }

  function openDetailModal(res: Reservation) {
    setSelectedRes(res);
    setNoteText(res.adminNotes || '');
    setRejectionReasonText(res.rejectionReason || '');
    setSaveSuccess(false);
  }

  const filteredReservations = reservations.filter((r) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      r.customerName.toLowerCase().includes(s) ||
      r.customerPhone.includes(s) ||
      r.referenceNumber.toLowerCase().includes(s)
    );
  });

  const pendingCount = reservations.filter((r) => r.status === 'pending').length;
  const confirmedCount = reservations.filter((r) => r.status === 'confirmed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coastal-900 font-serif">Table Reservations</h1>
          <p className="text-sm text-stone-500 mt-1">
            Review guest bookings, confirm tables, and manage customer requirements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/v1/admin/reservations/export"
            download="reservations.csv"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-sand-200 text-stone-700 text-sm font-semibold hover:bg-sand-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-sand-200 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-1">Total Bookings</span>
          <span className="text-2xl font-bold text-coastal-900">{reservations.length}</span>
        </div>
        <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50/30 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">Pending Approval</span>
          <span className="text-2xl font-bold text-amber-600">{pendingCount}</span>
        </div>
        <div className="bg-white rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 block mb-1">Confirmed</span>
          <span className="text-2xl font-bold text-emerald-600">{confirmedCount}</span>
        </div>
        <div className="bg-white rounded-2xl border border-sand-200 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-1">Filter Matches</span>
          <span className="text-2xl font-bold text-stone-700">{filteredReservations.length}</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-sand-200 p-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or Ref ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="w-full md:w-48">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {dateFilter && (
          <Button variant="ghost" onClick={() => setDateFilter('')} className="shrink-0 text-xs">
            Clear Date
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">Loading reservations...</div>
        ) : filteredReservations.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDays className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-base font-medium text-stone-600">No reservations found</p>
            <p className="text-sm text-stone-400 mt-1">Try adjusting your filters or date selection.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand-50 border-b border-sand-200 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-6 py-4">Ref #</th>
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-sand-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openDetailModal(res)}
                        className="font-mono text-xs font-bold text-primary-600 hover:underline flex items-center gap-1.5"
                      >
                        <span>{res.referenceNumber}</span>
                        <Eye className="w-3.5 h-3.5 text-stone-400" />
                      </button>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {new Date(res.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-coastal-900">{res.customerName}</div>
                      <div className="text-xs text-stone-500 font-mono mt-0.5">{res.customerPhone}</div>
                      {res.occasion && (
                        <span className="inline-block mt-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 rounded px-1.5 py-0.2">
                          {res.occasion}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-800">{res.reservationDate}</div>
                      <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {res.reservationTime}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sand-100 text-stone-700">
                        <Users className="w-3 h-3 text-stone-500" />
                        {res.guestCount} {res.guestCount === 1 ? 'person' : 'people'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={res.status} />
                    </td>

                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                      {res.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(res.id, 'confirmed')}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                            title="Confirm Booking"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(res.id, 'rejected')}
                            className="px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                            title="Reject Booking"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {res.status === 'confirmed' && (
                        <button
                          onClick={() => updateStatus(res.id, 'completed')}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                          title="Mark Seated / Completed"
                        >
                          Mark Seated
                        </button>
                      )}
                      <button
                        onClick={() => openDetailModal(res)}
                        className="px-2.5 py-1 text-xs font-medium text-stone-600 bg-sand-100 hover:bg-sand-200 rounded-lg transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reservation Detail Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-sand-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-sand-200 mb-5">
              <div>
                <span className="text-xs font-mono text-primary-600 font-bold block uppercase tracking-wider">
                  Reservation Detail
                </span>
                <h3 className="text-xl font-bold text-coastal-900 font-serif">
                  {selectedRes.referenceNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRes(null)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Primary Info Card */}
              <div className="bg-sand-50 rounded-2xl p-4 border border-sand-200/80 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">Customer</span>
                  <div className="text-base font-bold text-coastal-900 mt-0.5">{selectedRes.customerName}</div>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">Status</span>
                  <div className="mt-1">
                    <StatusBadge status={selectedRes.status} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">Phone Number</span>
                  <a href={`tel:${selectedRes.customerPhone}`} className="text-sm font-semibold text-primary-600 hover:underline mt-0.5 block">
                    {selectedRes.customerPhone}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">Email Address</span>
                  <div className="text-sm text-stone-700 mt-0.5">{selectedRes.customerEmail || 'Not provided'}</div>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">Booking Date & Time</span>
                  <div className="text-sm font-bold text-coastal-900 mt-0.5">
                    {selectedRes.reservationDate} at {selectedRes.reservationTime}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">Party Size</span>
                  <div className="text-sm font-bold text-coastal-900 mt-0.5">
                    {selectedRes.guestCount} Guests
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedRes.specialRequests && (
                <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/70">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Special Requests
                  </span>
                  <p className="text-sm text-amber-950 font-normal leading-relaxed">
                    {selectedRes.specialRequests}
                  </p>
                </div>
              )}

              {/* Status Update Quick Buttons */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                  Update Booking Status
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedRes.status === 'confirmed' ? 'primary' : 'outline'}
                    disabled={actionLoading}
                    onClick={() => updateStatus(selectedRes.id, 'confirmed')}
                  >
                    Confirm Table
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedRes.status === 'completed' ? 'primary' : 'outline'}
                    disabled={actionLoading}
                    onClick={() => updateStatus(selectedRes.id, 'completed')}
                  >
                    Mark Seated
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedRes.status === 'cancelled' ? 'secondary' : 'outline'}
                    disabled={actionLoading}
                    onClick={() => updateStatus(selectedRes.id, 'cancelled')}
                  >
                    Cancel Booking
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedRes.status === 'rejected' ? 'danger' : 'outline'}
                    disabled={actionLoading}
                    onClick={() => updateStatus(selectedRes.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Internal Staff Notes
                  </label>
                  {saveSuccess && (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Note Saved!
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. Table 4 assigned, customer requested corner booth near the sports screen..."
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={saveNotes} disabled={actionLoading}>
                    Save Staff Note
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-sand-200 mt-6">
              <Button variant="outline" onClick={() => setSelectedRes(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
