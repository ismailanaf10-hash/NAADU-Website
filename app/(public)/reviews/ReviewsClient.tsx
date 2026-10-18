'use client';

import React, { useState, useEffect } from 'react';
import { Star, Send, MessageCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  photoUrl: string | null;
  isFeatured: boolean;
  submittedAt: string;
}

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
}

export default function ReviewsClient() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ totalReviews: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    reviewText: '',
    email: '',
  });

  useEffect(() => {
    fetchReviews();
  }, [sortBy]);

  async function fetchReviews() {
    try {
      const res = await fetch(`/api/v1/reviews?sort=${sortBy}`);
      const json = await res.json();
      if (json.success) {
        setReviews(json.data.reviews);
        setStats(json.data.stats);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        setFormData({ customerName: '', rating: 5, reviewText: '', email: '' });
      } else {
        setError(json.error?.message || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 block mb-2 font-mono">
            Guest Experiences
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-coastal-900 font-serif mb-6 leading-tight">
            What Our Guests Say
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Real feedback from diners who have experienced the flavors, warmth, and joy of Naadu.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl border border-sand-200 p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center">
              <Star className="w-8 h-8 text-gold-500 fill-gold-500" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-coastal-900">{stats.averageRating}</span>
              <span className="text-stone-400 text-sm ml-1">/ 5</span>
              <p className="text-xs text-stone-500">
                Based on {stats.totalReviews} verified review{stats.totalReviews !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'rating')}
              className="text-xs border border-sand-200 rounded-lg px-3 py-2 text-stone-600 bg-sand-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => { setShowForm(!showForm); setSubmitted(false); }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>
        </div>

        {/* Review Submission Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-sand-200 p-6 sm:p-8 shadow-card mb-12 animate-in">
            {submitted ? (
              <div className="text-center py-8">
                <ThumbsUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-coastal-900 mb-2">Thank You!</h3>
                <p className="text-stone-500 text-sm">
                  Your review has been submitted and is pending moderation. We appreciate your feedback!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-coastal-900 font-serif">Share Your Experience</h3>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Your Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-0.5 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= formData.rating
                              ? 'text-gold-500 fill-gold-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm text-stone-500 ml-2">{formData.rating}/5</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Suresh K."
                    required
                  />
                  <Input
                    label="Email (optional)"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <Textarea
                  label="Your Review"
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  placeholder="Tell us about your dining experience at Naadu..."
                  rows={4}
                  required
                />

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
                )}

                <Button type="submit" disabled={submitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto" />
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-2xl border p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${
                  review.isFeatured ? 'border-gold-500/40 ring-1 ring-gold-500/20' : 'border-sand-200'
                }`}
              >
                {review.isFeatured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gold-600 bg-gold-500/10 px-2 py-1 rounded-full mb-3 uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-gold-500" />
                    Featured
                  </span>
                )}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? 'text-gold-500 fill-gold-500' : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-4">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-coastal-900">{review.customerName}</span>
                  <span className="text-xs text-stone-400">{formatDate(review.submittedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-sand-200">
            <MessageCircle className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-coastal-900 mb-2">No Reviews Yet</h3>
            <p className="text-stone-500 text-sm">Be the first to share your experience at Naadu!</p>
          </div>
        )}
      </div>
    </div>
  );
}
