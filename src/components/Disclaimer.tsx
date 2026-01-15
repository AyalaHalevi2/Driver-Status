import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import styles from './Disclaimer.module.scss';

export function Disclaimer() {
  const { isDark } = useTheme();
  const themeClass = isDark ? styles.dark : styles.light;

  return (
    <div className={`${styles.container} ${themeClass}`}>
      <div className={styles.content}>
        <div className={`${styles.iconWrapper} ${themeClass}`}>
          <AlertTriangle className={`${styles.icon} ${themeClass}`} />
        </div>
        <div className={styles.textContent}>
          <h3 className={`${styles.title} ${themeClass}`}>הבהרה חשובה</h3>
          <p className={`${styles.description} ${themeClass}`}>
            האתר מספק מידע כללי בלבד ואינו מהווה ייעוץ משפטי. המידע אינו משקלל
            הרשעות קודמות, פסילות או נקודות תעבורה שנצברו לחובת הנהג. לקבלת מידע
            מדויק ומחייב, יש לפנות לרשות הרישוי או לייעוץ משפטי מקצועי.
          </p>
        </div>
      </div>
    </div>
  );
}
