import { useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import styles from './DateInput.module.scss';

interface DateInputProps {
  id: string;
  value: string; // ISO format: yyyy-mm-dd
  onChange: (value: string) => void;
  max?: string;
  className?: string;
}

// Convert ISO date (yyyy-mm-dd) to display format (dd/mm/yyyy)
function isoToDisplay(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

// Convert display format (dd/mm/yyyy) to ISO date (yyyy-mm-dd)
function displayToIso(displayDate: string): string {
  if (!displayDate) return '';
  const parts = displayDate.split('/');
  if (parts.length !== 3) return '';
  const [day, month, year] = parts;
  if (!day || !month || !year) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Validate if a string is a valid date in dd/mm/yyyy format
function isValidDisplayDate(displayDate: string): boolean {
  if (!displayDate) return false;
  const parts = displayDate.split('/');
  if (parts.length !== 3) return false;

  const [day, month, year] = parts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > 2100) return false;

  // Check if the date is actually valid
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
}

export function DateInput({ id, value, onChange, max, className }: DateInputProps) {
  const { isDark } = useTheme();
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const themeClass = isDark ? styles.dark : styles.light;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remove non-numeric and non-slash characters
    input = input.replace(/[^\d/]/g, '');

    // Auto-add slashes
    const digits = input.replace(/\//g, '');
    if (digits.length >= 2 && !input.includes('/')) {
      input = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    if (digits.length >= 4 && input.split('/').length < 3) {
      const parts = input.split('/');
      if (parts.length === 2) {
        input = parts[0] + '/' + parts[1].slice(0, 2) + '/' + parts[1].slice(2);
      }
    }

    // Limit length
    if (input.length > 10) {
      input = input.slice(0, 10);
    }

    // If it's a complete valid date, convert to ISO and call onChange
    if (input.length === 10 && isValidDisplayDate(input)) {
      onChange(displayToIso(input));
    } else if (input.length < 10 || !isValidDisplayDate(input)) {
      // Store the partial/invalid input temporarily via a data attribute
      e.target.dataset.partial = input;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length === 10 && isValidDisplayDate(input)) {
      onChange(displayToIso(input));
    }
  };

  const handleCalendarClick = () => {
    hiddenInputRef.current?.showPicker();
  };

  const handleHiddenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        id={id}
        value={isoToDisplay(value)}
        onChange={handleTextChange}
        onBlur={handleBlur}
        placeholder="dd/mm/yyyy"
        className={`${styles.input} ${themeClass} ${className || ''}`}
        maxLength={10}
      />
      <button
        type="button"
        onClick={handleCalendarClick}
        className={`${styles.calendarButton} ${themeClass}`}
        aria-label="בחר תאריך"
      >
        <svg
          className={styles.calendarIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>
      <input
        ref={hiddenInputRef}
        type="date"
        value={value}
        onChange={handleHiddenChange}
        max={max}
        className={styles.hiddenInput}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
