'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { slugify } from '@/lib/utils';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface MenuItemInitialData {
  id?: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  shortDescription: string;
  fullDescription?: string | null;
  imageUrl?: string | null;
  isVeg: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  isKidsMenu: boolean;
  ingredients?: string | null;
  allergenInfo?: string | null;
  tags?: string | null;
}

export function MenuItemForm({
  initialData,
  isEdit = false,
}: {
  initialData?: MenuItemInitialData;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form Fields
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialData?.fullDescription || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [isVeg, setIsVeg] = useState(initialData ? initialData.isVeg : false);
  const [isAvailable, setIsAvailable] = useState(initialData ? initialData.isAvailable : true);
  const [isFeatured, setIsFeatured] = useState(initialData ? initialData.isFeatured : false);
  const [isPopular, setIsPopular] = useState(initialData ? initialData.isPopular : false);
  const [isKidsMenu, setIsKidsMenu] = useState(initialData ? initialData.isKidsMenu : false);
  const [ingredients, setIngredients] = useState(initialData?.ingredients || '');
  const [allergenInfo, setAllergenInfo] = useState(initialData?.allergenInfo || '');
  const [tags, setTags] = useState(initialData?.tags || '');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/v1/categories');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setCategories(json.data);
          if (!categoryId && !isEdit) {
            setCategoryId(json.data[0].id);
          }
        }
      } catch {} finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  function handleNameChange(val: string) {
    setName(val);
    if (!isEdit) {
      setSlug(slugify(val));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError('Item name is required.');
    if (!slug.trim()) return setError('Slug is required.');
    if (!categoryId) return setError('Category is required.');
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      return setError('Please enter a valid positive price.');
    }
    if (!shortDescription.trim()) {
      return setError('Short description is required (max 200 chars).');
    }

    setSaving(true);
    setError('');

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      categoryId,
      price: Number(price),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      isVeg,
      isAvailable,
      isFeatured,
      isPopular,
      isKidsMenu,
      ingredients: ingredients.trim() || undefined,
      allergenInfo: allergenInfo.trim() || undefined,
      tags: tags.trim() || undefined,
    };

    try {
      const url = isEdit
        ? `/api/v1/admin/menu/${initialData?.id}`
        : '/api/v1/admin/menu';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Failed to save menu item');
        return;
      }

      router.push('/admin/menu');
      router.refresh();
    } catch {
      setError('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu List</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-sand-200 shadow-sm p-6 sm:p-8">
        <div className="border-b border-sand-200 pb-5 mb-6">
          <h1 className="text-2xl font-bold text-coastal-900 font-serif">
            {isEdit ? `Edit "${initialData?.name}"` : 'Add New Menu Item'}
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Fill in the dish details, pricing, and category information for the public menu.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Item Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Mangalore Chicken Ghee Roast"
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="mangalore-chicken-ghee-roast"
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          {/* Row 2: Category and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                {loadingCategories ? (
                  <option value="">Loading categories...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Price (₹ INR) *
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 380"
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Short Description (Card Summary) *
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Succulent chicken cooked in pure Kundapur ghee with hand-ground red chilli masala..."
              className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              required
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Detailed Description (Product Page)
            </label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Comprehensive recipe background, history, pairing suggestions..."
              className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Image URL & Preview */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Image URL
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or /images/..."
                className="flex-1 px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {imageUrl && (
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-sand-300 shrink-0 bg-sand-100">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Dietary Type: Veg vs Non-Veg */}
          <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200/80">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-3">
              Dietary Preference
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="dietary"
                  checked={isVeg}
                  onChange={() => setIsVeg(true)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  Vegetarian
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="dietary"
                  checked={!isVeg}
                  onChange={() => setIsVeg(false)}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span className="flex items-center gap-1.5 text-sm font-semibold text-red-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  Non-Vegetarian
                </span>
              </label>
            </div>
          </div>

          {/* Feature Badges & Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-200/80">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-xs font-semibold text-stone-800">Currently In Stock</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-xs font-semibold text-stone-800">Featured Special</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-xs font-semibold text-stone-800">Most Loved</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isKidsMenu}
                onChange={(e) => setIsKidsMenu(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-xs font-semibold text-stone-800">Kids Friendly</span>
            </label>
          </div>

          {/* Optional Ingredients, Allergens & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Ingredients (Optional)
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ghee, red chillies..."
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Allergen Info (Optional)
              </label>
              <input
                type="text"
                value={allergenInfo}
                onChange={(e) => setAllergenInfo(e.target.value)}
                placeholder="Contains dairy, nuts..."
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Search Tags (Optional)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="spicy, seafood, coastal..."
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-sand-200">
            <Link href="/admin/menu">
              <Button type="button" variant="outline" disabled={saving}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : isEdit ? 'Update Menu Item' : 'Create Menu Item'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
