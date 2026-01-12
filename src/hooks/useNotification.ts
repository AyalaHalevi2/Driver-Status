import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface ReminderData {
  endDate: string;
  type: 'fullAccompaniment' | 'nightAccompaniment' | 'newDriver';
  enabled: boolean;
}

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [reminders, setReminders] = useLocalStorage<ReminderData[]>('driver-status-reminders', []);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      alert('הדפדפן שלך לא תומך בהתראות');
      return false;
    }

    if (Notification.permission === 'granted') {
      setPermission('granted');
      return true;
    }

    if (Notification.permission !== 'denied') {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    }

    return false;
  }, []);

  const scheduleReminder = useCallback(
    async (endDate: Date, type: ReminderData['type'], label: string): Promise<boolean> => {
      const hasPermission = await requestPermission();

      if (!hasPermission) {
        alert('יש לאשר התראות כדי להגדיר תזכורת');
        return false;
      }

      const now = new Date();
      const reminderDate = new Date(endDate);
      reminderDate.setHours(9, 0, 0, 0);

      if (reminderDate <= now) {
        alert('התאריך כבר עבר, לא ניתן להגדיר תזכורת');
        return false;
      }

      const existingReminderIndex = reminders.findIndex((r) => r.type === type);
      const newReminder: ReminderData = {
        endDate: reminderDate.toISOString(),
        type,
        enabled: true,
      };

      if (existingReminderIndex >= 0) {
        const updatedReminders = [...reminders];
        updatedReminders[existingReminderIndex] = newReminder;
        setReminders(updatedReminders);
      } else {
        setReminders([...reminders, newReminder]);
      }

      new Notification('תזכורת הוגדרה!', {
        body: `תקבל התראה ביום סיום ${label}`,
        icon: '/favicon.ico',
        dir: 'rtl',
        lang: 'he',
      });

      return true;
    },
    [reminders, setReminders, requestPermission]
  );

  const cancelReminder = useCallback(
    (type: ReminderData['type']) => {
      setReminders(reminders.filter((r) => r.type !== type));
    },
    [reminders, setReminders]
  );

  const hasReminder = useCallback(
    (type: ReminderData['type']): boolean => {
      return reminders.some((r) => r.type === type && r.enabled);
    },
    [reminders]
  );

  useEffect(() => {
    if (permission !== 'granted' || reminders.length === 0) return;

    const checkReminders = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      reminders.forEach((reminder) => {
        if (!reminder.enabled) return;

        const reminderDate = new Date(reminder.endDate);
        const reminderDay = new Date(
          reminderDate.getFullYear(),
          reminderDate.getMonth(),
          reminderDate.getDate()
        );

        if (reminderDay.getTime() === today.getTime()) {
          const labels: Record<ReminderData['type'], string> = {
            fullAccompaniment: 'תקופת המלווה המלא',
            nightAccompaniment: 'תקופת המלווה הלילי',
            newDriver: 'תקופת הנהג החדש',
          };

          new Notification('היום נגמרת התקופה!', {
            body: `${labels[reminder.type]} מסתיימת היום!`,
            icon: '/favicon.ico',
            dir: 'rtl',
            lang: 'he',
          });

          cancelReminder(reminder.type);
        }
      });
    };

    checkReminders();

    const interval = setInterval(checkReminders, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [permission, reminders, cancelReminder]);

  return {
    permission,
    requestPermission,
    scheduleReminder,
    cancelReminder,
    hasReminder,
    isSupported: 'Notification' in window,
  };
}
