import type { StatusCardProps } from '../types';
import { useTheme } from '../hooks/useTheme';
import styles from './StatusCard.module.scss';

interface ExtendedStatusCardProps extends StatusCardProps {
  onInfoClick?: () => void;
}

export function StatusCard({ title, value, icon, status, details, onInfoClick }: ExtendedStatusCardProps) {
  const { isDark } = useTheme();

  const getCardClass = () => {
    if (status === 'active') return isDark ? styles.activeDark : styles.activeLight;
    if (status === 'warning') return isDark ? styles.warningDark : styles.warningLight;
    return isDark ? styles.inactiveDark : styles.inactiveLight;
  };

  const getIconWrapperClass = () => {
    if (status === 'active') return isDark ? styles.activeDark : styles.activeLight;
    if (status === 'warning') return isDark ? styles.warningDark : styles.warningLight;
    return isDark ? styles.inactiveDark : styles.inactiveLight;
  };

  const getBadgeClass = () => {
    if (status === 'active') return isDark ? styles.activeDark : styles.active;
    if (status === 'warning') return isDark ? styles.warningDark : styles.warning;
    return isDark ? styles.inactiveDark : styles.inactive;
  };

  const getTitleClass = () => {
    if (status === 'active') return isDark ? styles.activeDark : styles.activeLight;
    if (status === 'warning') return isDark ? styles.warningDark : styles.warningLight;
    return isDark ? styles.inactiveDark : styles.inactiveLight;
  };

  const getValueClass = () => {
    if (status === 'active') return isDark ? styles.activeDark : styles.activeLight;
    if (status === 'warning') return isDark ? styles.warningDark : styles.warningLight;
    return isDark ? styles.inactiveDark : styles.inactiveLight;
  };

  const handleCardClick = () => {
    if (onInfoClick) {
      onInfoClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onInfoClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onInfoClick();
    }
  };

  return (
    <div
      className={`${styles.card} ${getCardClass()} ${onInfoClick ? styles.clickable : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={onInfoClick ? 'button' : undefined}
      tabIndex={onInfoClick ? 0 : undefined}
      aria-label={onInfoClick ? `${title} - לחץ למידע נוסף` : undefined}
    >
      <div className={styles.header}>
        <div className={`${styles.iconWrapper} ${getIconWrapperClass()}`}>
          {icon}
        </div>
        <div className={styles.actions}>
          <span className={`${styles.badge} ${getBadgeClass()}`}>
            {status === 'active' ? 'פעיל' : status === 'warning' ? 'תקף' : 'לא פעיל'}
          </span>
        </div>
      </div>

      <h3 className={`${styles.title} ${getTitleClass()}`}>{title}</h3>
      <p className={`${styles.value} ${getValueClass()}`}>{value}</p>

      {details && (
        <p className={`${styles.details} ${isDark ? styles.dark : styles.light}`}>
          {details}
        </p>
      )}
    </div>
  );
}
