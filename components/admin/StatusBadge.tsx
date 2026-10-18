import React from 'react';
import { cn } from '@/lib/utils';

type Status = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed' | 'approved' | 'hidden' | 'deleted' | string;

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  cancelled: 'bg-stone-100 text-stone-600 border-stone-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  hidden: 'bg-stone-100 text-stone-500 border-stone-200',
  deleted: 'bg-red-100 text-red-700 border-red-200',
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status.toLowerCase()] || 'bg-stone-100 text-stone-600 border-stone-200';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border',
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
