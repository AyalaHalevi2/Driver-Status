import type { StatusCardProps } from '../types';

const statusStyles = {
  active: {
    container: 'bg-green-50 border-green-200',
    badge: 'bg-green-500 text-white',
    icon: 'text-green-600',
    title: 'text-green-800',
    value: 'text-green-700',
  },
  inactive: {
    container: 'bg-gray-50 border-gray-200',
    badge: 'bg-gray-400 text-white',
    icon: 'text-gray-500',
    title: 'text-gray-700',
    value: 'text-gray-600',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-500 text-white',
    icon: 'text-amber-600',
    title: 'text-amber-800',
    value: 'text-amber-700',
  },
};

export function StatusCard({ title, value, icon, status, details }: StatusCardProps) {
  const styles = statusStyles[status];

  return (
    <div
      className={`relative rounded-2xl border-2 p-5 transition-all hover:shadow-md ${styles.container}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl bg-white shadow-sm ${styles.icon}`}>
          {icon}
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${styles.badge}`}
        >
          {status === 'active' ? 'פעיל' : status === 'warning' ? 'תקף' : 'לא פעיל'}
        </span>
      </div>

      <h3 className={`text-sm font-medium mb-1 ${styles.title}`}>{title}</h3>
      <p className={`text-lg font-bold ${styles.value}`}>{value}</p>

      {details && (
        <p className="text-xs text-gray-500 mt-2 border-t border-gray-200 pt-2">
          {details}
        </p>
      )}
    </div>
  );
}
