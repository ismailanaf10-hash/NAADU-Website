'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, RefreshCcw } from 'lucide-react';
import { MenuItemCard } from '@/components/public/MenuItemCard';
import { Button } from '@/components/ui/Button';

export interface MenuClientProps {
  initialCategories: any[];
  initialItems: any[];
  defaultCategorySlug?: string;
}

export default function MenuClient({
  initialCategories,
  initialItems,
  defaultCategorySlug,
}: MenuClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategorySlug || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && item.category?.slug !== selectedCategory) {
        return false;
      }

      // 2. Dietary Filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'nonveg' && item.isVeg) return false;

      // 3. Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription?.toLowerCase().includes(query);
        const matchesCategory = item.category?.name.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });
  }, [initialItems, selectedCategory, dietaryFilter, searchQuery]);

  const handleReset = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietaryFilter('all');
  };

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-sand-200 shadow-sm mb-10 space-y-6">
        {/* Search Bar + Veg Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes by name (e.g. Ghee Roast, Neer Dosa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-sand-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Veg / Non-Veg Filter Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-coastal-900 text-white shadow-sm'
                  : 'bg-sand-100 text-coastal-800 hover:bg-sand-200'
              }`}
            >
              All Diets
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                dietaryFilter === 'veg'
                  ? 'bg-green-700 text-white border-green-700 shadow-sm'
                  : 'border-green-600/30 text-green-700 hover:bg-green-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Veg Only
            </button>
            <button
              onClick={() => setDietaryFilter('nonveg')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                dietaryFilter === 'nonveg'
                  ? 'bg-red-700 text-white border-red-700 shadow-sm'
                  : 'border-red-600/30 text-red-700 hover:bg-red-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Horizontal Category Scroll Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar border-t border-sand-100 pt-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                : 'bg-sand-100 text-coastal-800 hover:bg-sand-200'
            }`}
          >
            All Items ({initialItems.length})
          </button>
          {initialCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                selectedCategory === cat.slug
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                  : 'bg-sand-100 text-coastal-800 hover:bg-sand-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Current Filter Indicator */}
      <div className="flex items-center justify-between mb-6 text-xs text-stone-500">
        <span>
          Showing <strong>{filteredItems.length}</strong> delicious items
        </span>
        {(selectedCategory !== 'all' || dietaryFilter !== 'all' || searchQuery) && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-primary-600 hover:underline font-semibold"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Grid of Dishes */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-sand-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-coastal-900 mb-2">
            No menu items found
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
            We couldn&apos;t find any items matching your selected category, search query, or dietary filter.
          </p>
          <Button onClick={handleReset} variant="outline" size="sm">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
