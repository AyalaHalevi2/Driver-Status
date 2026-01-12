import { Clock } from 'lucide-react';
import type { ProgressBarProps } from '../types';
import { formatDaysRemaining, formatDate } from '../utils/calculations';

const colorSchemes = {
  blue: {
    bg: 'bg-blue-100',
    fill: 'bg-blue-500',
    text: 'text-blue-700',
  },
  green: {
    bg: 'bg-green-100',
    fill: 'bg-green-500',
    text: 'text-green-700',
  },
  yellow: {
    bg: 'bg-amber-100',
    fill: 'bg-amber-500',
    text: 'text-amber-700',
  },
  red: {
    bg: 'bg-red-100',
    fill: 'bg-red-500',
    text: 'text-red-700',
  },
};

export function ProgressBar({
  label,
  progress,
  daysRemaining,
  endDate,
  colorScheme,
}: ProgressBarProps) {
  const colors = colorSchemes[colorScheme];
  const isComplete = progress >= 100;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-semibold ${colors.text}`}>
          {isComplete ? 'הסתיים' : formatDaysRemaining(daysRemaining)}
        </span>
      </div>

      <div className={`h-3 rounded-full overflow-hidden ${colors.bg}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors.fill}`}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>

      {endDate && !isComplete && (
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>עד {formatDate(endDate)}</span>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-medium">
          <span>התקופה הסתיימה</span>
        </div>
      )}
    </div>
  );
}
