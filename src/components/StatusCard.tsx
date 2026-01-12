import { Info } from 'lucide-react';
import type { StatusCardProps } from '../types';
import { useTheme } from '../hooks/useTheme';

interface ExtendedStatusCardProps extends StatusCardProps {
  onInfoClick?: () => void;
}

const statusStyles = {
  active: {
    light: {
      container: 'bg-green-50 border-green-200',
      badge: 'bg-green-500 text-white',
      icon: 'text-green-600',
      iconBg: 'bg-white',
      title: 'text-green-800',
      value: 'text-green-700',
      details: 'text-gray-500 border-gray-200',
      infoBtn: 'text-green-600 hover:bg-green-100',
    },
    dark: {
      container: 'bg-green-900/30 border-green-700/50',
      badge: 'bg-green-600 text-white',
      icon: 'text-green-400',
      iconBg: 'bg-green-900/50',
      title: 'text-green-300',
      value: 'text-green-400',
      details: 'text-slate-400 border-slate-600',
      infoBtn: 'text-green-400 hover:bg-green-900/50',
    },
  },
  inactive: {
    light: {
      container: 'bg-gray-50 border-gray-200',
      badge: 'bg-gray-400 text-white',
      icon: 'text-gray-500',
      iconBg: 'bg-white',
      title: 'text-gray-700',
      value: 'text-gray-600',
      details: 'text-gray-500 border-gray-200',
      infoBtn: 'text-gray-500 hover:bg-gray-100',
    },
    dark: {
      container: 'bg-slate-800/80 border-slate-600/50',
      badge: 'bg-slate-500 text-white',
      icon: 'text-slate-400',
      iconBg: 'bg-slate-700',
      title: 'text-slate-300',
      value: 'text-slate-400',
      details: 'text-slate-500 border-slate-600',
      infoBtn: 'text-slate-400 hover:bg-slate-700',
    },
  },
  warning: {
    light: {
      container: 'bg-amber-50 border-amber-200',
      badge: 'bg-amber-500 text-white',
      icon: 'text-amber-600',
      iconBg: 'bg-white',
      title: 'text-amber-800',
      value: 'text-amber-700',
      details: 'text-gray-500 border-gray-200',
      infoBtn: 'text-amber-600 hover:bg-amber-100',
    },
    dark: {
      container: 'bg-amber-900/30 border-amber-700/50',
      badge: 'bg-amber-600 text-white',
      icon: 'text-amber-400',
      iconBg: 'bg-amber-900/50',
      title: 'text-amber-300',
      value: 'text-amber-400',
      details: 'text-slate-400 border-slate-600',
      infoBtn: 'text-amber-400 hover:bg-amber-900/50',
    },
  },
};

export function StatusCard({ title, value, icon, status, details, onInfoClick }: ExtendedStatusCardProps) {
  const { isDark } = useTheme();
  const theme = isDark ? 'dark' : 'light';
  const styles = statusStyles[status][theme];

  return (
    <div
      className={`relative rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-md ${styles.container}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl shadow-sm ${styles.iconBg} ${styles.icon}`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          {onInfoClick && (
            <button
              onClick={onInfoClick}
              className={`p-1.5 rounded-lg transition-colors ${styles.infoBtn}`}
              title="מידע נוסף"
              aria-label="מידע נוסף"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${styles.badge}`}
          >
            {status === 'active' ? 'פעיל' : status === 'warning' ? 'תקף' : 'לא פעיל'}
          </span>
        </div>
      </div>

      <h3 className={`text-sm font-medium mb-1 transition-colors ${styles.title}`}>{title}</h3>
      <p className={`text-lg font-bold transition-colors ${styles.value}`}>{value}</p>

      {details && (
        <p className={`text-xs mt-2 border-t pt-2 transition-colors ${styles.details}`}>
          {details}
        </p>
      )}
    </div>
  );
}
