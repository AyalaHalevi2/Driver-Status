import { Bell, BellOff, BellRing } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNotification } from '../hooks/useNotification';
import type { DriverStatus } from '../types';
import styles from './ReminderButton.module.scss';

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
    if (isLoading) return <Bell className={`${styles.icon} ${styles.pulse}`} />;
    if (permission === 'denied') return <BellOff className={styles.icon} />;
    if (reminderActive) return <BellRing className={styles.icon} />;
    return <Bell className={styles.icon} />;
  };

  const getLabel = () => {
    if (permission === 'denied') return 'התראות חסומות';
    if (reminderActive) return 'בטל התראה';
    return 'התראת סיום';
  };

  const getButtonClass = () => {
    if (permission === 'denied') {
      return isDark ? styles.disabledDark : styles.disabledLight;
    }
    if (reminderActive) {
      return isDark ? styles.activeDark : styles.activeLight;
    }
    return isDark ? styles.defaultDark : styles.defaultLight;
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || permission === 'denied'}
      className={`${styles.button} ${getButtonClass()}`}
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
