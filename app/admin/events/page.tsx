'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import {
  Tv,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';

interface RestaurantEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  imageUrl: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  isPublished: boolean;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<RestaurantEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<RestaurantEvent | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [ctaUrl, setCtaUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<RestaurantEvent | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch('/api/v1/admin/events');
      const json = await res.json();
      if (json.success) setEvents(json.data);
    } catch {} finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    const today = new Date().toISOString().split('T')[0];
    setEventDate(today);
    setEventTime('19:30');
    setImageUrl('');
    setCtaLabel('Reserve a Table');
    setCtaUrl('/reserve');
    setIsPublished(true);
    setFormError('');
    setModalOpen(true);
  }

  function openEditModal(event: RestaurantEvent) {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(event.eventDate);
    setEventTime(event.eventTime);
    setImageUrl(event.imageUrl || '');
    setCtaLabel(event.ctaLabel || '');
    setCtaUrl(event.ctaUrl || '');
    setIsPublished(event.isPublished);
    setFormError('');
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return setFormError('Event title is required.');
    if (!description.trim()) return setFormError('Description is required.');
    if (!eventDate || !eventTime) return setFormError('Event date and time are required.');

    setSaving(true);
    setFormError('');

    const payload = {
      title: title.trim(),
      description: description.trim(),
      eventDate,
      eventTime,
      imageUrl: imageUrl.trim() || undefined,
      ctaLabel: ctaLabel.trim() || undefined,
      ctaUrl: ctaUrl.trim() || undefined,
      isPublished,
    };

    try {
      const url = editingEvent
        ? `/api/v1/admin/events/${editingEvent.id}`
        : '/api/v1/admin/events';
      const method = editingEvent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        setFormError(json.error || 'Failed to save event');
        return;
      }

      await fetchEvents();
      setModalOpen(false);
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/v1/admin/events/${deleteTarget.id}`, { method: 'DELETE' });
      setEvents(events.filter((e) => e.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {} finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coastal-900 font-serif">Events & Sports Screening</h1>
          <p className="text-sm text-stone-500 mt-1">
            Announce live cricket matches, IPL screenings, and special culinary gatherings
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Event
        </Button>
      </div>

      {/* Events Table / Grid */}
      <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">Loading scheduled events...</div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <Tv className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-base font-medium text-stone-600">No events currently scheduled</p>
            <p className="text-sm text-stone-400 mt-1">
              Add your upcoming sports screening or celebration events.
            </p>
            <Button onClick={openCreateModal} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Schedule First Event
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand-50 border-b border-sand-200 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Action Button</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-sand-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-coastal-900">{ev.title}</div>
                      <div className="text-xs text-stone-500 line-clamp-1 max-w-sm mt-0.5">
                        {ev.description}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{ev.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{ev.eventTime}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs">
                      {ev.ctaLabel ? (
                        <span className="inline-flex items-center gap-1 text-primary-600 font-semibold">
                          <span>{ev.ctaLabel}</span>
                          <ExternalLink className="w-3 h-3 text-stone-400" />
                        </span>
                      ) : (
                        <span className="text-stone-400 italic">None</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          ev.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-500 border border-stone-200'
                        }`}
                      >
                        {ev.isPublished ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            Published
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-stone-400" />
                            Draft
                          </>
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(ev)}
                        className="p-1.5 text-stone-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(ev)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-sand-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-sand-200 mb-5">
              <h3 className="text-lg font-bold text-coastal-900 font-serif">
                {editingEvent ? 'Edit Event' : 'Schedule Event / Screening'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. India vs Pakistan Live Cricket Screening"
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Watch the high-stakes match on our giant projector with match-day specials..."
                  className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Event Banner Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /images/..."
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={ctaLabel}
                    onChange={(e) => setCtaLabel(e.target.value)}
                    placeholder="e.g. Reserve Your Spot"
                    className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    CTA URL Link
                  </label>
                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    placeholder="/reserve or https://wa.me/..."
                    className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs font-semibold text-stone-700">
                    Publish publicly on the Events page & Homepage
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-sand-200 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingEvent ? 'Save Changes' : 'Schedule Event'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Event"
        message={`Are you sure you want to remove the event "${deleteTarget?.title}"?`}
        confirmText={deleting ? 'Deleting...' : 'Delete Event'}
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
