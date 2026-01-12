import { Bell, BellOff, BellRing } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNotification } from '../hooks/useNotification';
import type { DriverStatus } from '../types';

interface ReminderButtonProps {
  status: DriverStatus;
}

type ReminderType = 'fullAccompaniment' | 'nightAccompaniment' | 'newDriver';

export function ReminderButton({ status }: ReminderButtonProps) {
  const { isDark } = useTheme();
  const { scheduleReminder, cancelReminder, hasReminder, isSupported, permission } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const getActiveReminder = (): { type: ReminderType; date: Date; label: string } | null => {
    if (status.accompanimentStatus === 'full' && status.fullAccompanimentEndDate) {
      return {
        type: 'fullAccompaniment',
        date: status.fullAccompanimentEndDate,
        label: 'תקופת המלווה המלא',
      };
    }
    if (status.accompanimentStatus === 'night' && status.nightAccompanimentEndDate) {
      return {
        type: 'nightAccompaniment',
        date: status.nightAccompanimentEndDate,
        label: 'תקופת המלווה הלילי',
      };
    }
    if (status.isNewDriver && status.newDriverEndDate) {
      return {
        type: 'newDriver',
        date: status.newDriverEndDate,
        label: 'תקופת הנהג החדש',
      };
    }
    return null;
  };

  const activeReminder = getActiveReminder();

  if (!isSupported || !activeReminder) {
    return null;
  }

  const reminderActive = hasReminder(activeReminder.type);

  const handleClick = async () => {
    if (reminderActive) {
      cancelReminder(activeReminder.type);
      return;
    }

    setIsLoading(true);
    await scheduleReminder(activeReminder.date, activeReminder.type, activeReminder.label);
    setIsLoading(false);
  };

  const getIcon = () => {
    if (isLoading) return <Bell className="w-4 h-4 animate-pulse" />;
    if (permission === 'denied') return <BellOff className="w-4 h-4" />;
    if (reminderActive) return <BellRing className="w-4 h-4" />;
    return <Bell className="w-4 h-4" />;
  };

  const getLabel = () => {
    if (permission === 'denied') return 'התראות חסומות';
    if (reminderActive) return 'בטל התראה';
    return 'התראת סיום';
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || permission === 'denied'}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
        permission === 'denied'
          ? isDark
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : reminderActive
          ? isDark
            ? 'bg-amber-700 hover:bg-amber-600 text-white'
            : 'bg-amber-500 hover:bg-amber-600 text-white'
          : isDark
          ? 'bg-blue-700 hover:bg-blue-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
      title={
        permission === 'denied'
          ? 'ההתראות חסומות בדפדפן. יש לאפשר התראות בהגדרות הדפדפן'
          : reminderActive
          ? 'לחץ לביטול ההתראה'
          : 'לחץ להגדרת תזכורת ליום סיום התקופה'
      }
    >
      {getIcon()}
      <span>{getLabel()}</span>
    </button>
  );
}
