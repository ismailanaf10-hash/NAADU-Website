'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Calendar, AlertCircle } from 'lucide-react';

export default function ReservationFormClient() {
  const router = useRouter();

  // Booking boundaries
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxBookingDate = new Date();
  maxBookingDate.setDate(today.getDate() + 60);
  const maxDate = maxBookingDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    reservationDate: minDate,
    reservationTime: '19:30',
    guestCount: 2,
    specialRequests: '',
    occasion: 'None',
    honeypot: '', // Spam bot protection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Available 30-min operating time slots (11:30 AM to 10:30 PM)
  const timeSlots = [
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM (Lunch)' },
    { value: '12:30', label: '12:30 PM' },
    { value: '13:00', label: '01:00 PM' },
    { value: '13:30', label: '01:30 PM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '14:30', label: '02:30 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '18:30', label: '06:30 PM' },
    { value: '19:00', label: '07:00 PM (Dinner)' },
    { value: '19:30', label: '07:30 PM' },
    { value: '20:00', label: '08:00 PM (Prime Time)' },
    { value: '20:30', label: '08:30 PM' },
    { value: '21:00', label: '09:00 PM' },
    { value: '21:30', label: '09:30 PM' },
    { value: '22:00', label: '10:00 PM' },
    { value: '22:30', label: '10:30 PM (Late Dinner)' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter your full name (at least 2 characters)';
    }

    if (!/^[6-9]\d{9}$/.test(formData.customerPhone.trim())) {
      newErrors.customerPhone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    if (!formData.reservationDate) {
      newErrors.reservationDate = 'Please select a date';
    } else if (formData.reservationDate < minDate) {
      newErrors.reservationDate = 'Reservation date cannot be in the past';
    }

    if (!formData.reservationTime) {
      newErrors.reservationTime = 'Please select a time slot';
    }

    if (!formData.guestCount || formData.guestCount < 1 || formData.guestCount > 20) {
      newErrors.guestCount = 'Guests must be between 1 and 20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Honeypot bot trap
    if (formData.honeypot) {
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/v1/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName.trim(),
          customerPhone: formData.customerPhone.trim(),
          customerEmail: formData.customerEmail.trim() || undefined,
          reservationDate: formData.reservationDate,
          reservationTime: formData.reservationTime,
          guestCount: Number(formData.guestCount),
          specialRequests: formData.specialRequests.trim() || undefined,
          occasion: formData.occasion !== 'None' ? formData.occasion : undefined,
        }),
      });

      const json = await res.json();

      if (json.success) {
        router.push(`/reserve/confirmation?ref=${json.referenceNumber}`);
      } else {
        setServerError(
          json.error?.message ||
            "We're sorry, something went wrong. Please call us at 070223 73444."
        );
      }
    } catch (err: any) {
      setServerError(
        'Network error. Please check your connection or contact us at 070223 73444.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-sand-200 shadow-card space-y-6"
      noValidate
    >
      {/* Bot trap hidden input */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {serverError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
          <div>
            <p className="font-semibold">Unable to submit reservation</p>
            <p className="text-xs mt-0.5 text-red-600">{serverError}</p>
          </div>
        </div>
      )}

      {/* Row 1: Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Prashanth Shetty"
          value={formData.customerName}
          error={errors.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        />

        <Input
          label="Phone Number (10 digits)"
          required
          type="tel"
          placeholder="e.g. 9845012345"
          value={formData.customerPhone}
          error={errors.customerPhone}
          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
        />
      </div>

      {/* Row 2: Email and Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Email Address (Optional)"
          type="email"
          placeholder="e.g. yourname@example.com"
          value={formData.customerEmail}
          error={errors.customerEmail}
          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
          helperText="For confirmation updates"
        />

        <Input
          label="Number of Guests"
          required
          type="number"
          min={1}
          max={20}
          value={formData.guestCount}
          error={errors.guestCount}
          onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
        />
      </div>

      {/* Row 3: Date and Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Reservation Date"
          required
          type="date"
          min={minDate}
          max={maxDate}
          value={formData.reservationDate}
          error={errors.reservationDate}
          onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
        />

        <Select
          label="Reservation Time"
          required
          value={formData.reservationTime}
          error={errors.reservationTime}
          onChange={(e) => setFormData({ ...formData, reservationTime: e.target.value })}
          options={timeSlots}
        />
      </div>

      {/* Row 4: Occasion */}
      <Select
        label="Special Occasion (Optional)"
        value={formData.occasion}
        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
        options={[
          { value: 'None', label: 'Casual Dining / None' },
          { value: 'Birthday', label: 'Birthday Celebration 🎂' },
          { value: 'Anniversary', label: 'Anniversary 💐' },
          { value: 'Live Match Screening', label: 'Watching Live Sports Match 🏏' },
          { value: 'Family Gathering', label: 'Family Gathering 👨‍👩‍👧‍👦' },
          { value: 'Business Lunch', label: 'Business Lunch / Meeting 💼' },
          { value: 'Other', label: 'Other Special Event' },
        ]}
      />

      {/* Row 5: Special Requests */}
      <Textarea
        label="Special Requests or Dietary Preferences (Optional)"
        placeholder="e.g. High chair needed for toddler, quiet window corner, or prefer table with clear view of the sports screen..."
        rows={3}
        value={formData.specialRequests}
        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
      />

      {/* Submit Action */}
      <div className="pt-4 border-t border-sand-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-stone-500">
          By submitting, your table request is sent to our reservation desk for instant review.
        </p>

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 shadow-glow font-bold text-base"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Confirm Table Request
        </Button>
      </div>
    </form>
  );
}
