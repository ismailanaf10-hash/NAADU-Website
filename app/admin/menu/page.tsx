'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { formatPrice } from '@/lib/utils';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Filter,
  UtensilsCrossed,
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  isKidsMenu: boolean;
  imageUrl: string | null;
  category: { id: string; name: string };
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch('/api/v1/admin/menu');
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch {} finally { setLoading(false); }
  }

  async function fetchCategories() {
    try {
      const res = await fetch('/api/v1/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch {}
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/v1/admin/menu/${deleteTarget}`, { method: 'DELETE' });
      setItems(items.filter((i) => i.id !== deleteTarget));
    } catch {} finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  async function toggleAvailability(id: string, current: boolean) {
    try {
      await fetch(`/api/v1/admin/menu/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !current }),
      });
      setItems(items.map((i) => i.id === id ? { ...i, isAvailable: !current } : i));
    } catch {}
  }

  const filtered = items.filter((item) => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || item.category.id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-coastal-900 font-serif">Menu Items</h1>
          <p className="text-sm text-stone-500 mt-1">{items.length} total items</p>
        </div>
        <Link href="/admin/menu/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-sand-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Categories</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sand-50 text-stone-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3">Item</th>
                  <th className="text-left px-6 py-3">Category</th>
                  <th className="text-left px-6 py-3">Price</th>
                  <th className="text-left px-6 py-3">Type</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Tags</th>
                  <th className="text-right px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-sand-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center">
                            <UtensilsCrossed className="w-4 h-4 text-stone-400" />
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-coastal-900 block">{item.name}</span>
                          <span className="text-xs text-stone-400 line-clamp-1">{item.shortDescription}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-stone-500">{item.category.name}</td>
                    <td className="px-6 py-3 font-semibold text-coastal-900">{formatPrice(item.price)}</td>
                    <td className="px-6 py-3">
                      <span className={`diet-badge ${item.isVeg ? 'diet-badge-veg' : 'diet-badge-nonveg'}`} />
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleAvailability(item.id, item.isAvailable)}
                        className="cursor-pointer"
                      >
                        <StatusBadge status={item.isAvailable ? 'confirmed' : 'cancelled'} />
                      </button>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-wrap gap-1">
                        {item.isFeatured && <span className="text-[9px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded font-bold">FEATURED</span>}
                        {item.isPopular && <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">POPULAR</span>}
                        {item.isKidsMenu && <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">KIDS</span>}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/menu/item/${item.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-sand-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-stone-400" />
                        </Link>
                        <Link
                          href={`/admin/menu/${item.id}`}
                          className="p-2 hover:bg-sand-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-stone-400" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-sand-200">
          <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-sm text-stone-500">No menu items found.</p>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
