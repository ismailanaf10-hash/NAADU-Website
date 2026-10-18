'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import {
  Tag,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Percent,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Clock,
} from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discountText: string;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
  terms: string | null;
  isActive: boolean;
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountText, setDiscountText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [terms, setTerms] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<Offer | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      const res = await fetch('/api/v1/admin/offers');
      const json = await res.json();
      if (json.success) setOffers(json.data);
    } catch {} finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingOffer(null);
    setTitle('');
    setDescription('');
    setDiscountText('');
    setImageUrl('');
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(nextMonth);
    setTerms('');
    setIsActive(true);
    setFormError('');
    setModalOpen(true);
  }

  function openEditModal(offer: Offer) {
    setEditingOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description);
    setDiscountText(offer.discountText);
    setImageUrl(offer.imageUrl || '');
    setStartDate(new Date(offer.startDate).toISOString().split('T')[0]);
    setEndDate(new Date(offer.endDate).toISOString().split('T')[0]);
    setTerms(offer.terms || '');
    setIsActive(offer.isActive);
    setFormError('');
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return setFormError('Offer title is required.');
    if (!description.trim()) return setFormError('Description is required.');
    if (!discountText.trim()) return setFormError('Discount summary text is required (e.g. 20% off).');
    if (!startDate || !endDate) return setFormError('Start date and end date are required.');

    setSaving(true);
    setFormError('');

    const payload = {
      title: title.trim(),
      description: description.trim(),
      discountText: discountText.trim(),
      imageUrl: imageUrl.trim() || undefined,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      terms: terms.trim() || undefined,
      isActive,
    };

    try {
      const url = editingOffer
        ? `/api/v1/admin/offers/${editingOffer.id}`
        : '/api/v1/admin/offers';
      const method = editingOffer ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        setFormError(json.error || 'Failed to save offer');
        return;
      }

      await fetchOffers();
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
      await fetch(`/api/v1/admin/offers/${deleteTarget.id}`, { method: 'DELETE' });
      setOffers(offers.filter((o) => o.id !== deleteTarget.id));
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
          <h1 className="text-2xl font-extrabold text-coastal-900 font-serif">Offers & Promotions</h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage seasonal discounts, festival promotions, and dining deals
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Offer
        </Button>
      </div>

      {/* Offers Grid/List */}
      <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="p-12 text-center">
            <Tag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-base font-medium text-stone-600">No active promotions created</p>
            <p className="text-sm text-stone-400 mt-1">Add a promotion to display on your homepage and offers page.</p>
            <Button onClick={openCreateModal} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add First Offer
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand-50 border-b border-sand-200 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-6 py-4">Promotion</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4">Validity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {offers.map((offer) => {
                  const isExpired = new Date(offer.endDate) < new Date();
                  return (
                    <tr key={offer.id} className="hover:bg-sand-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-coastal-900">{offer.title}</div>
                        <div className="text-xs text-stone-500 line-clamp-1 max-w-sm mt-0.5">
                          {offer.description}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <Percent className="w-3.5 h-3.5 text-amber-600" />
                          {offer.discountText}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-stone-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>
                            {new Date(offer.startDate).toLocaleDateString()} – {new Date(offer.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        {isExpired && (
                          <span className="text-[10px] text-red-500 font-semibold block mt-0.5">
                            Expired
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            offer.isActive && !isExpired
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-stone-100 text-stone-500 border border-stone-200'
                          }`}
                        >
                          {offer.isActive && !isExpired ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-stone-400" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(offer)}
                          className="p-1.5 text-stone-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                          title="Edit Offer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(offer)}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Offer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
                {editingOffer ? 'Edit Promotion' : 'Create New Promotion'}
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
                  Offer Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Weekend Coastal Feast"
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Discount Highlight *
                </label>
                <input
                  type="text"
                  value={discountText}
                  onChange={(e) => setDiscountText(e.target.value)}
                  placeholder="e.g. 20% OFF or Free Kori Rotti"
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Offer Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Special weekend discount on all family platters and ghee roasts..."
                  className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Banner Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /images/..."
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Terms & Conditions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Valid for dine-in only. Cannot be combined with other offers."
                  className="w-full px-3.5 py-2 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs font-semibold text-stone-700">
                    Publish this offer publicly (Visible while active)
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
                  {saving ? 'Saving...' : editingOffer ? 'Save Changes' : 'Create Offer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Offer"
        message={`Are you sure you want to remove the offer "${deleteTarget?.title}"?`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
