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
        return <Sun className="w-5 h-5" />;
      case 'night':
        return <Moon className="w-5 h-5" />;
      case 'none':
        return <CheckCircle className="w-5 h-5" />;
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
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        <ShareButton status={status} />
        <ReminderButton status={status} />
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="נהג חדש"
          value={status.isNewDriver ? 'פעיל' : 'הסתיים'}
          icon={<Clock className="w-5 h-5" />}
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
          icon={<User className="w-5 h-5" />}
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
          icon={<Users className="w-5 h-5" />}
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
      <div className={`rounded-2xl shadow-lg p-6 transition-colors duration-300 ${
        isDark ? 'bg-slate-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <AlertCircle className="w-5 h-5 text-blue-600" />
          התקדמות התקופות
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <div className={`rounded-2xl p-6 text-white transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-r from-blue-800 to-blue-900'
          : 'bg-gradient-to-r from-blue-600 to-blue-700'
      }`}>
        <h3 className="text-lg font-semibold mb-3">סיכום המצב שלך</h3>
        <ul className={`space-y-2 ${isDark ? 'text-blue-200' : 'text-blue-100'}`}>
          {status.isNewDriver && (
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-300 rounded-full" />
              אתה נהג חדש - יש לנהוג בזהירות יתרה ולציית לכל הכללים
            </li>
          )}
          {status.accompanimentStatus === 'full' && (
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-300 rounded-full" />
              חובת מלווה מלא - יש להיות מלווה בכל נסיעה (יום ולילה)
            </li>
          )}
          {status.accompanimentStatus === 'night' && (
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-300 rounded-full" />
              חובת מלווה לילי - יש להיות מלווה בשעות 21:00-06:00
            </li>
          )}
          {status.hasPassengerLimit && (
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-300 rounded-full" />
              הגבלת נוסעים - מותר להסיע עד 2 נוסעים בלבד (ללא נוכחות מלווה)
            </li>
          )}
          {!status.isNewDriver &&
            status.accompanimentStatus === 'none' &&
            !status.hasPassengerLimit && (
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-300 rounded-full" />
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
