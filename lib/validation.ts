import { z } from 'zod';

export const reservationSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customerPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  customerEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  reservationDate: z.string().min(1, 'Please select a reservation date'),
  reservationTime: z.string().min(1, 'Please select a reservation time'),
  guestCount: z.coerce.number().min(1, 'At least 1 guest required').max(20, 'Max 20 guests allowed online'),
  specialRequests: z.string().max(500).optional().or(z.literal('')),
  occasion: z.string().optional().or(z.literal('')),
});

export const menuItemSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2),
  categoryId: z.string().min(1),
  shortDescription: z.string().min(5).max(200),
  fullDescription: z.string().optional().or(z.literal('')),
  price: z.coerce.number().positive('Price must be greater than 0'),
  imageUrl: z.string().optional().or(z.literal('')),
  isVeg: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  isKidsMenu: z.boolean().default(false),
  ingredients: z.string().optional().or(z.literal('')),
  allergenInfo: z.string().optional().or(z.literal('')),
  tags: z.string().optional().or(z.literal('')),
});

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  displayOrder: z.coerce.number().default(0),
  isEnabled: z.boolean().default(true),
});

export const offerSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  discountText: z.string().min(2),
  imageUrl: z.string().optional().or(z.literal('')),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  terms: z.string().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
});

export const eventSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  eventDate: z.string().min(1),
  eventTime: z.string().min(1),
  imageUrl: z.string().optional().or(z.literal('')),
  ctaLabel: z.string().optional().or(z.literal('')),
  ctaUrl: z.string().optional().or(z.literal('')),
  isPublished: z.boolean().default(true),
});

export const reviewSchema = z.object({
  customerName: z.string().min(2),
  rating: z.coerce.number().min(1).max(5),
  reviewText: z.string().min(5).max(1000),
  email: z.string().email().optional().or(z.literal('')),
  photoUrl: z.string().optional().or(z.literal('')),
});
