'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import {
  Star,
  CheckCircle,
  EyeOff,
  Trash2,
  MessageSquare,
  Sparkles,
  Calendar,
  User,
  Filter,
  FileText,
  Check,
} from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  email?: string | null;
  status: 'pending' | 'approved' | 'hidden';
  isFeatured: boolean;
  adminNote?: string | null;
  submittedAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Active review for editing internal admin note
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  async function fetchReviews() {
    setLoading(true);
    try {
      const url =
        statusFilter === 'all'
          ? '/api/v1/admin/reviews'
          : `/api/v1/admin/reviews?status=${statusFilter}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) setReviews(json.data);
    } catch {} finally {
      setLoading(false);
    }
  }

  async function updateReview(id: string, updateData: Partial<Review>) {
    try {
      const res = await fetch(`/api/v1/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      const json = await res.json();
      if (json.success) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...updateData } : r))
        );
      }
    } catch {}
  }

  async function saveNote(id: string) {
    await updateReview(id, { adminNote: tempNote });
    setEditingNoteId(null);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/v1/admin/reviews/${deleteTarget.id}`, { method: 'DELETE' });
      setReviews((prev) => prev.filter((r) => r.id !== deleteTarget.id));
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
          <h1 className="text-2xl font-extrabold text-coastal-900 font-serif">Customer Reviews</h1>
          <p className="text-sm text-stone-500 mt-1">
            Moderate guest testimonials and select featured reviews for the public website
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['all', 'pending', 'approved', 'hidden'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-sand-200 hover:bg-sand-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="p-12 text-center text-stone-400 bg-white rounded-3xl border border-sand-200">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-sand-200">
          <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-base font-medium text-stone-600">No reviews found</p>
          <p className="text-sm text-stone-400 mt-1">
            {statusFilter !== 'all'
              ? `There are no reviews with status "${statusFilter}".`
              : 'Guest reviews submitted online will appear here for moderation.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-sand-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-sand-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-stone-600 font-bold text-sm">
                    {review.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-coastal-900 text-sm sm:text-base">
                      {review.customerName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(review.submittedAt).toLocaleDateString()}
                      </span>
                      {review.email && <span>• {review.email}</span>}
                    </div>
                  </div>
                </div>

                {/* Rating & Badges */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="font-bold text-xs text-amber-900">{review.rating} / 5</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      review.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : review.status === 'hidden'
                        ? 'bg-stone-100 text-stone-500 border border-stone-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {review.status}
                  </span>

                  {review.isFeatured && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-stone-700 text-sm leading-relaxed italic">
                &ldquo;{review.reviewText}&rdquo;
              </p>

              {/* Staff Notes section */}
              {editingNoteId === review.id ? (
                <div className="bg-sand-50 rounded-xl p-3 border border-sand-200 flex gap-2">
                  <input
                    type="text"
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    placeholder="Internal staff note..."
                    className="flex-1 px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <Button size="sm" onClick={() => saveNote(review.id)}>
                    <Check className="w-3.5 h-3.5 mr-1" /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingNoteId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                review.adminNote && (
                  <div className="bg-sand-50 rounded-xl p-3 text-xs text-stone-600 flex items-center justify-between border border-sand-200/80">
                    <span className="flex items-center gap-1.5 font-medium">
                      <FileText className="w-3.5 h-3.5 text-stone-400" />
                      Staff Note: {review.adminNote}
                    </span>
                    <button
                      onClick={() => {
                        setEditingNoteId(review.id);
                        setTempNote(review.adminNote || '');
                      }}
                      className="text-stone-400 hover:text-stone-700 text-[10px] font-bold uppercase"
                    >
                      Edit
                    </button>
                  </div>
                )
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sand-100">
                <div className="flex items-center gap-2">
                  {review.status !== 'approved' && (
                    <button
                      onClick={() => updateReview(review.id, { status: 'approved' })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve Publicly
                    </button>
                  )}

                  {review.status !== 'hidden' && (
                    <button
                      onClick={() => updateReview(review.id, { status: 'hidden' })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 bg-sand-100 hover:bg-sand-200 transition-colors"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      Hide Review
                    </button>
                  )}

                  <button
                    onClick={() => updateReview(review.id, { isFeatured: !review.isFeatured })}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                      review.isFeatured
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white text-stone-600 border-sand-200 hover:bg-sand-50'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${review.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{review.isFeatured ? 'Featured on Home' : 'Feature on Home'}</span>
                  </button>

                  {!review.adminNote && editingNoteId !== review.id && (
                    <button
                      onClick={() => {
                        setEditingNoteId(review.id);
                        setTempNote('');
                      }}
                      className="text-xs font-medium text-stone-500 hover:text-stone-800 hover:underline px-2 py-1"
                    >
                      + Add Internal Note
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setDeleteTarget(review)}
                  className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Review"
        message={`Are you sure you want to permanently delete the review by "${deleteTarget?.customerName}"?`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
