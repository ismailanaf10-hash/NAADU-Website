import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardMetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function DashboardMetricCard({
  label,
  value,
  icon,
  trend,
  trendUp,
  className,
}: DashboardMetricCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-sand-200 p-5 shadow-card hover:shadow-card-hover transition-all duration-300',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trendUp
                ? 'text-green-700 bg-green-100'
                : 'text-red-700 bg-red-100'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-coastal-900">{value}</p>
      <p className="text-xs text-stone-500 mt-1">{label}</p>
    </div>
  );
}
