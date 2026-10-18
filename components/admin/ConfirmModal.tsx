'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmText?: string;
  variant?: 'danger' | 'warning' | 'default';
  confirmVariant?: 'danger' | 'warning' | 'default';
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  message,
  confirmLabel,
  confirmText,
  variant,
  confirmVariant,
  loading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleClose = onCancel || onClose || (() => {});
  const resolvedVariant = confirmVariant || variant || 'default';
  const resolvedLabel = confirmText || confirmLabel || 'Confirm';

  const iconColor = resolvedVariant === 'danger' ? 'text-red-500 bg-red-100' : resolvedVariant === 'warning' ? 'text-amber-500 bg-amber-100' : 'text-primary-600 bg-primary-100';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center flex-shrink-0`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-coastal-900 mb-1">{title}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button variant="outline" size="sm" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            disabled={loading}
            className={resolvedVariant === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {loading ? 'Processing...' : resolvedLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
