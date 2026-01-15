import { Clock } from 'lucide-react';
import type { ProgressBarProps } from '../types';
import { formatDaysRemaining, formatDate } from '../utils/calculations';
import { useTheme } from '../hooks/useTheme';
import styles from './ProgressBar.module.scss';

export function ProgressBar({
  label,
  progress,
  daysRemaining,
  endDate,
  colorScheme,
}: ProgressBarProps) {
  const { isDark } = useTheme();
  const isComplete = progress >= 100;

  const getRemainingClass = () => {
    if (colorScheme === 'blue') return isDark ? styles.blueDark : styles.blue;
    if (colorScheme === 'green') return isDark ? styles.greenDark : styles.green;
    if (colorScheme === 'yellow') return isDark ? styles.yellowDark : styles.yellow;
    return isDark ? styles.redDark : styles.red;
  };

  const getTrackClass = () => {
    if (colorScheme === 'blue') return isDark ? styles.blueDark : styles.blue;
    if (colorScheme === 'green') return isDark ? styles.greenDark : styles.green;
    if (colorScheme === 'yellow') return isDark ? styles.yellowDark : styles.yellow;
    return isDark ? styles.redDark : styles.red;
  };

  const getFillClass = () => {
    if (colorScheme === 'blue') return styles.blue;
    if (colorScheme === 'green') return styles.green;
    if (colorScheme === 'yellow') return styles.yellow;
    return styles.red;
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.header}>
        <span className={`${styles.label} ${isDark ? styles.dark : styles.light}`}>
          {label}
        </span>
        <span className={`${styles.remaining} ${getRemainingClass()}`}>
          {isComplete ? 'הסתיים' : formatDaysRemaining(daysRemaining)}
        </span>
      </div>

      <div className={`${styles.progressTrack} ${getTrackClass()}`}>
        <div
          className={`${styles.progressFill} ${getFillClass()}`}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>

      {endDate && !isComplete && (
        <div className={`${styles.footer} ${isDark ? styles.dark : styles.light}`}>
          <Clock className={styles.footerIcon} />
          <span>עד {formatDate(endDate)}</span>
        </div>
      )}

      {isComplete && (
        <div className={`${styles.completedText} ${isDark ? styles.dark : styles.light}`}>
          <span>התקופה הסתיימה</span>
        </div>
      )}
    </div>
  );
}
