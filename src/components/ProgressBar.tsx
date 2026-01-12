import { Clock } from 'lucide-react';
import type { ProgressBarProps } from '../types';
import { formatDaysRemaining, formatDate } from '../utils/calculations';
import { useTheme } from '../hooks/useTheme';

const colorSchemes = {
  blue: {
    light: { bg: 'bg-blue-100', fill: 'bg-blue-500', text: 'text-blue-700' },
    dark: { bg: 'bg-blue-900/50', fill: 'bg-blue-500', text: 'text-blue-400' },
  },
  green: {
    light: { bg: 'bg-green-100', fill: 'bg-green-500', text: 'text-green-700' },
    dark: { bg: 'bg-green-900/50', fill: 'bg-green-500', text: 'text-green-400' },
  },
  yellow: {
    light: { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-700' },
    dark: { bg: 'bg-amber-900/50', fill: 'bg-amber-500', text: 'text-amber-400' },
  },
  red: {
    light: { bg: 'bg-red-100', fill: 'bg-red-500', text: 'text-red-700' },
    dark: { bg: 'bg-red-900/50', fill: 'bg-red-500', text: 'text-red-400' },
  },
};

export function ProgressBar({
  label,
  progress,
  daysRemaining,
  endDate,
  colorScheme,
}: ProgressBarProps) {
  const { isDark } = useTheme();
  const theme = isDark ? 'dark' : 'light';
  const colors = colorSchemes[colorScheme][theme];
  const isComplete = progress >= 100;

  return (
    <div className={`rounded-xl p-4 shadow-sm border transition-colors duration-300 ${
      isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium transition-colors ${
          isDark ? 'text-slate-300' : 'text-gray-700'
        }`}>{label}</span>
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
        <div className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
          isDark ? 'text-slate-400' : 'text-gray-500'
        }`}>
          <Clock className="w-3 h-3" />
          <span>עד {formatDate(endDate)}</span>
        </div>
      )}

      {isComplete && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
          isDark ? 'text-green-400' : 'text-green-600'
        }`}>
          <span>התקופה הסתיימה</span>
        </div>
      )}
    </div>
  );
}
