import { Share2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { DriverStatus } from '../types';
import { formatDaysRemaining } from '../utils/calculations';
import styles from './ShareButton.module.scss';

interface ShareButtonProps {
  status: DriverStatus;
}

export function ShareButton({ status }: ShareButtonProps) {
  const { isDark } = useTheme();

  const generateShareMessage = () => {
    const appUrl = window.location.href;
    let message = '';

    if (status.accompanimentStatus !== 'none') {
      const daysRemaining =
        status.accompanimentStatus === 'full'
          ? status.daysRemainingFullAccompaniment
          : status.daysRemainingNightAccompaniment;

      const periodType = status.accompanimentStatus === 'full' ? 'מלווה מלא' : 'מלווה לילי';
      message = `נשארו לי עוד ${formatDaysRemaining(daysRemaining)} לסיום ה${periodType}! בדקתי ב'מתי נגמר המלווה?' ${appUrl}`;
    } else if (status.isNewDriver) {
      message = `נשארו לי עוד ${formatDaysRemaining(status.daysRemainingNewDriver)} לסיום תקופת הנהג החדש! בדקתי ב'מתי נגמר המלווה?' ${appUrl}`;
    } else {
      message = `סיימתי את תקופת הנהג החדש והמלווה! בדקתי ב'מתי נגמר המלווה?' ${appUrl}`;
    }

    return message;
  };

  const handleShare = () => {
    const message = generateShareMessage();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className={`${styles.button} ${isDark ? styles.dark : styles.light}`}
    >
      <Share2 className={styles.icon} />
      <span>שתף סטטוס</span>
    </button>
  );
}
