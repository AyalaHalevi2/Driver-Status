import { Calendar, Car, Trash2 } from 'lucide-react';
import type { DriverData, LicenseType } from '../types';
import { LICENSE_TYPES } from '../utils/constants';
import { useTheme } from '../hooks/useTheme';
import styles from './InputForm.module.scss';

interface InputFormProps {
  data: DriverData;
  onChange: (data: DriverData) => void;
  onClear: () => void;
}

export function InputForm({ data, onChange, onClear }: InputFormProps) {
  const { isDark } = useTheme();

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, birthDate: e.target.value });
  };

  const handleLicenseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, licenseDate: e.target.value });
  };

  const handleLicenseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...data, licenseType: e.target.value as LicenseType });
  };

  const handleClear = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל הנתונים?')) {
      onClear();
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const themeClass = isDark ? styles.dark : styles.light;

  return (
    <div className={`${styles.container} ${themeClass}`}>
      <h2 className={`${styles.title} ${themeClass}`}>
        <Car className={styles.titleIcon} />
        פרטי הנהג
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="birthDate" className={`${styles.label} ${themeClass}`}>
            <Calendar className={styles.labelIcon} />
            תאריך לידה
          </label>
          <input
            type="date"
            id="birthDate"
            value={data.birthDate}
            onChange={handleBirthDateChange}
            max={today}
            className={`${styles.input} ${themeClass}`}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="licenseDate" className={`${styles.label} ${themeClass}`}>
            <Calendar className={styles.labelIcon} />
            תאריך קבלת רישיון
          </label>
          <input
            type="date"
            id="licenseDate"
            value={data.licenseDate}
            onChange={handleLicenseDateChange}
            max={today}
            className={`${styles.input} ${themeClass}`}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="licenseType" className={`${styles.label} ${themeClass}`}>
            <Car className={styles.labelIcon} />
            סוג רישיון
          </label>
          <select
            id="licenseType"
            value={data.licenseType}
            onChange={handleLicenseTypeChange}
            className={`${styles.input} ${themeClass}`}
          >
            {LICENSE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.clearButtonContainer}>
        <button
          onClick={handleClear}
          className={`${styles.clearButton} ${themeClass}`}
        >
          <Trash2 className={styles.clearButtonIcon} />
          נקה נתונים
        </button>
      </div>
    </div>
  );
}
