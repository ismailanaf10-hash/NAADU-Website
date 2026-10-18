'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Filter,
  Sparkles,
  AlertCircle,
  X,
  Maximize2,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  caption: string | null;
  altText: string | null;
  category: string;
  isFeatured: boolean;
  isVisible: boolean;
  displayOrder: number;
}

const CATEGORIES = ['food', 'ambience', 'sports', 'events', 'other'];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('food');
  const [caption, setCaption] = useState('');
  const [altText, setAltText] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch('/api/v1/admin/gallery');
      const json = await res.json();
      if (json.success) setImages(json.data);
    } catch {} finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setImageUrl('');
    setCategory('food');
    setCaption('');
    setAltText('');
    setIsFeatured(false);
    setDisplayOrder(images.length);
    setError('');
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl.trim()) return setError('Image URL is required.');

    setSaving(true);
    setError('');

    const payload = {
      imageUrl: imageUrl.trim(),
      category,
      caption: caption.trim() || undefined,
      altText: altText.trim() || undefined,
      isFeatured,
      displayOrder: Number(displayOrder) || 0,
      isVisible: true,
    };

    try {
      const res = await fetch('/api/v1/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Failed to add image');
        return;
      }

      await fetchImages();
      setModalOpen(false);
    } catch {
      setError('Network error occurred.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleFeatured(item: GalleryItem) {
    try {
      await fetch(`/api/v1/admin/gallery/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !item.isFeatured }),
      });
      setImages((prev) =>
        prev.map((img) => (img.id === item.id ? { ...img, isFeatured: !img.isFeatured } : img))
      );
    } catch {}
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/v1/admin/gallery/${deleteTarget.id}`, { method: 'DELETE' });
      setImages((prev) => prev.filter((img) => img.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {} finally {
      setDeleting(false);
    }
  }

  const filteredImages = images.filter((img) => {
    if (categoryFilter === 'all') return true;
    return img.category?.toLowerCase() === categoryFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coastal-900 font-serif">Photo Gallery</h1>
          <p className="text-sm text-stone-500 mt-1">
            Upload and organize restaurant ambience, dishes, and live sports screening photos
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Photo
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            categoryFilter === 'all'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white text-stone-600 border border-sand-200 hover:bg-sand-50'
          }`}
        >
          All Photos ({images.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
              categoryFilter === cat
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-sand-200 hover:bg-sand-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="p-12 text-center text-stone-400 bg-white rounded-3xl border border-sand-200">
          Loading gallery photos...
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-sand-200">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-base font-medium text-stone-600">No photos in this category</p>
          <p className="text-sm text-stone-400 mt-1">Add your high quality food or restaurant photos here.</p>
          <Button onClick={openCreateModal} className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Add First Photo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 bg-sand-100 overflow-hidden">
                <img
                  src={img.imageUrl}
                  alt={img.altText || 'Gallery'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                  {img.category}
                </span>
                {img.isFeatured && (
                  <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-400 px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-900" />
                    Featured
                  </span>
                )}
              </div>

              {/* Card Footer / Caption */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-stone-700 font-medium line-clamp-2">
                    {img.caption || 'No caption'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-sand-100">
                  <button
                    onClick={() => toggleFeatured(img)}
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-colors ${
                      img.isFeatured
                        ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                        : 'text-stone-400 hover:text-stone-700 hover:bg-sand-100'
                    }`}
                    title={img.isFeatured ? 'Remove from Homepage' : 'Feature on Homepage'}
                  >
                    <Star className={`w-3.5 h-3.5 ${img.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{img.isFeatured ? 'Featured' : 'Feature'}</span>
                  </button>

                  <button
                    onClick={() => setDeleteTarget(img)}
                    className="p-1 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sand-200">
            <div className="flex items-center justify-between pb-4 border-b border-sand-200 mb-5">
              <h3 className="text-lg font-bold text-coastal-900 font-serif">Add Photo to Gallery</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Image URL *
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm capitalize focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Crisp Neer Dosa served fresh with chutney"
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Naadu Restaurant dining ambience"
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs font-semibold text-stone-700">
                    Feature on Homepage (Preview Carousel)
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
                  {saving ? 'Adding...' : 'Add to Gallery'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Photo"
        message="Are you sure you want to remove this photo from the gallery?"
        confirmText={deleting ? 'Deleting...' : 'Delete Photo'}
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
