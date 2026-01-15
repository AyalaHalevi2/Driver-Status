import { useState } from 'react';
import {
  User,
  Clock,
  Users,
  Moon,
  Sun,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import type { DriverStatus } from '../types';
import { StatusCard } from './StatusCard';
import { ProgressBar } from './ProgressBar';
import { InfoModal } from './InfoModal';
import type { InfoModalType } from './InfoModal';
import { ShareButton } from './ShareButton';
import { ReminderButton } from './ReminderButton';
import { formatDaysRemaining } from '../utils/calculations';
import { useTheme } from '../hooks/useTheme';
import styles from './Dashboard.module.scss';

interface DashboardProps {
  status: DriverStatus;
}

export function Dashboard({ status }: DashboardProps) {
  const { isDark } = useTheme();
  const [activeModal, setActiveModal] = useState<InfoModalType>(null);

  const getAccompanimentLabel = () => {
    switch (status.accompanimentStatus) {
      case 'full':
        return 'מלווה מלא (יום ולילה)';
      case 'night':
        return 'מלווה לילי בלבד (21:00-06:00)';
      case 'none':
        return 'ללא צורך במלווה';
    }
  };

  const getAccompanimentIcon = () => {
    switch (status.accompanimentStatus) {
      case 'full':
        return <Sun className={styles.icon} />;
      case 'night':
        return <Moon className={styles.icon} />;
      case 'none':
        return <CheckCircle className={styles.icon} />;
    }
  };

  const getAccompanimentStatus = (): 'active' | 'warning' | 'inactive' => {
    switch (status.accompanimentStatus) {
      case 'full':
        return 'active';
      case 'night':
        return 'warning';
      case 'none':
        return 'inactive';
    }
  };

  return (
    <div className={styles.container}>
      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <ShareButton status={status} />
        <ReminderButton status={status} />
      </div>

      {/* Status Cards Grid */}
      <div className={styles.statusGrid}>
        <StatusCard
          title="נהג חדש"
          value={status.isNewDriver ? 'פעיל' : 'הסתיים'}
          icon={<Clock className={styles.icon} />}
          status={status.isNewDriver ? 'active' : 'inactive'}
          details={
            status.isNewDriver
              ? `נותרו ${formatDaysRemaining(status.daysRemainingNewDriver)}`
              : 'תקופת הנהג החדש הסתיימה'
          }
          onInfoClick={() => setActiveModal('newDriver')}
        />

        <StatusCard
          title="נהג צעיר"
          value={status.isYoungDriver ? `גיל ${status.age}` : `גיל ${status.age}`}
          icon={<User className={styles.icon} />}
          status={status.isYoungDriver ? 'warning' : 'inactive'}
          details={
            status.isYoungDriver
              ? 'מתחת לגיל 24'
              : 'מעל גיל 24 - אינך נהג צעיר'
          }
          onInfoClick={() => setActiveModal('youngDriver')}
        />

        <StatusCard
          title="סטטוס מלווה"
          value={getAccompanimentLabel()}
          icon={getAccompanimentIcon()}
          status={getAccompanimentStatus()}
          details={
            !status.wasYoungWhenLicensed
              ? 'קיבלת רישיון מעל גיל 24 - אין צורך במלווה'
              : status.accompanimentStatus === 'none'
              ? 'תקופת המלווה הסתיימה'
              : status.accompanimentStatus === 'full'
              ? `נותרו ${formatDaysRemaining(status.daysRemainingFullAccompaniment)} למלווה מלא`
              : `נותרו ${formatDaysRemaining(status.daysRemainingNightAccompaniment)} למלווה לילי`
          }
          onInfoClick={() => setActiveModal('accompaniment')}
        />

        <StatusCard
          title="הגבלת נוסעים"
          value={
            status.hasPassengerLimit
              ? `עד ${status.passengerLimit} נוסעים`
              : 'ללא הגבלה'
          }
          icon={<Users className={styles.icon} />}
          status={status.hasPassengerLimit ? 'warning' : 'inactive'}
          details={
            status.hasPassengerLimit
              ? 'נהג חדש מתחת לגיל 21 - מוגבל ל-2 נוסעים (ללא מלווה)'
              : 'אין הגבלת נוסעים'
          }
          onInfoClick={() => setActiveModal('passengerLimit')}
        />
      </div>

      {/* Progress Bars Section */}
      <div className={`${styles.progressSection} ${isDark ? styles.dark : styles.light}`}>
        <h3 className={`${styles.progressTitle} ${isDark ? styles.dark : styles.light}`}>
          <AlertCircle className={styles.progressTitleIcon} />
          התקדמות התקופות
        </h3>

        <div className={styles.progressGrid}>
          <ProgressBar
            label="תקופת נהג חדש"
            progress={status.newDriverProgress}
            daysRemaining={status.daysRemainingNewDriver}
            endDate={status.newDriverEndDate}
            colorScheme={status.isNewDriver ? 'blue' : 'green'}
          />

          {status.wasYoungWhenLicensed && (
            <>
              <ProgressBar
                label="מלווה מלא (יום ולילה)"
                progress={status.fullAccompanimentProgress}
                daysRemaining={status.daysRemainingFullAccompaniment}
                endDate={status.fullAccompanimentEndDate}
                colorScheme={
                  status.accompanimentStatus === 'full' ? 'yellow' : 'green'
                }
              />

              <ProgressBar
                label="מלווה לילי (21:00-06:00)"
                progress={status.nightAccompanimentProgress}
                daysRemaining={status.daysRemainingNightAccompaniment}
                endDate={status.nightAccompanimentEndDate}
                colorScheme={
                  status.accompanimentStatus === 'night' ? 'yellow' : 'green'
                }
              />
            </>
          )}
        </div>
      </div>

      {/* Summary Box */}
      <div className={`${styles.summaryBox} ${isDark ? styles.dark : styles.light}`}>
        <h3 className={styles.summaryTitle}>סיכום המצב שלך</h3>
        <ul className={`${styles.summaryList} ${isDark ? styles.dark : styles.light}`}>
          {status.isNewDriver && (
            <li className={styles.summaryItem}>
              <span className={`${styles.summaryDot} ${styles.blue}`} />
              אתה נהג חדש - יש לנהוג בזהירות יתרה ולציית לכל הכללים
            </li>
          )}
          {status.accompanimentStatus === 'full' && (
            <li className={styles.summaryItem}>
              <span className={`${styles.summaryDot} ${styles.yellow}`} />
              חובת מלווה מלא - יש להיות מלווה בכל נסיעה (יום ולילה)
            </li>
          )}
          {status.accompanimentStatus === 'night' && (
            <li className={styles.summaryItem}>
              <span className={`${styles.summaryDot} ${styles.yellow}`} />
              חובת מלווה לילי - יש להיות מלווה בשעות 21:00-06:00
            </li>
          )}
          {status.hasPassengerLimit && (
            <li className={styles.summaryItem}>
              <span className={`${styles.summaryDot} ${styles.orange}`} />
              הגבלת נוסעים - מותר להסיע עד 2 נוסעים בלבד (ללא נוכחות מלווה)
            </li>
          )}
          {!status.isNewDriver &&
            status.accompanimentStatus === 'none' &&
            !status.hasPassengerLimit && (
              <li className={styles.summaryItem}>
                <span className={`${styles.summaryDot} ${styles.green}`} />
                כל ההגבלות הוסרו - נהיגה בטוחה!
              </li>
            )}
        </ul>
      </div>

      {/* Info Modal */}
      <InfoModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
