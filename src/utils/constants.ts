import type { LicenseType } from '../types';

// Time periods in days
export const NEW_DRIVER_PERIOD_YEARS = 2;
export const FULL_ACCOMPANIMENT_MONTHS = 3;
export const NIGHT_ACCOMPANIMENT_MONTHS = 3;
export const TOTAL_ACCOMPANIMENT_MONTHS = 6;

// Age thresholds
export const YOUNG_DRIVER_AGE = 24;
export const PASSENGER_LIMIT_AGE = 21;

// Passenger limits
export const MAX_PASSENGERS_WITH_LIMIT = 2;

// Night hours (24h format)
export const NIGHT_START_HOUR = 21;
export const NIGHT_END_HOUR = 6;

// License types with Hebrew labels
export const LICENSE_TYPES: { value: LicenseType; label: string }[] = [
  { value: 'B', label: 'B - רכב פרטי' },
  { value: 'A', label: 'A - אופנוע' },
  { value: 'A1', label: 'A1 - אופנוע עד 125cc' },
  { value: 'A2', label: 'A2 - אופנוע עד 35kW' },
  { value: 'C', label: 'C - משאית' },
  { value: 'C1', label: 'C1 - משאית קלה' },
  { value: 'D', label: 'D - אוטובוס' },
  { value: 'D1', label: 'D1 - מיניבוס' },
];

// LocalStorage key
export const STORAGE_KEY = 'driver-status-data';

// Hebrew labels
export const LABELS = {
  newDriver: 'נהג חדש',
  youngDriver: 'נהג צעיר',
  fullAccompaniment: 'מלווה מלא',
  nightAccompaniment: 'מלווה לילי',
  noAccompaniment: 'ללא מלווה',
  passengerLimit: 'הגבלת נוסעים',
  noLimit: 'ללא הגבלה',
  active: 'פעיל',
  inactive: 'לא פעיל',
  ended: 'הסתיים',
  daysRemaining: 'ימים נותרו',
  months: 'חודשים',
  years: 'שנים',
  passengers: 'נוסעים',
} as const;
