import {
  differenceInYears,
  differenceInDays,
  addYears,
  addMonths,
  parseISO,
  isValid,
  isBefore,
} from 'date-fns';
import type { AccompanimentStatus, DriverData, DriverStatus } from '../types';
import {
  NEW_DRIVER_PERIOD_YEARS,
  FULL_ACCOMPANIMENT_MONTHS,
  TOTAL_ACCOMPANIMENT_MONTHS,
  YOUNG_DRIVER_AGE,
  PASSENGER_LIMIT_AGE,
  MAX_PASSENGERS_WITH_LIMIT,
} from './constants';

export function calculateAge(birthDate: Date, referenceDate: Date = new Date()): number {
  return differenceInYears(referenceDate, birthDate);
}

export function isNewDriver(licenseDate: Date, referenceDate: Date = new Date()): boolean {
  const endDate = addYears(licenseDate, NEW_DRIVER_PERIOD_YEARS);
  return isBefore(referenceDate, endDate);
}

export function isYoungDriver(birthDate: Date, referenceDate: Date = new Date()): boolean {
  return calculateAge(birthDate, referenceDate) < YOUNG_DRIVER_AGE;
}

export function wasYoungWhenLicensed(birthDate: Date, licenseDate: Date): boolean {
  return calculateAge(birthDate, licenseDate) < YOUNG_DRIVER_AGE;
}

export function getAccompanimentStatus(
  birthDate: Date,
  licenseDate: Date,
  referenceDate: Date = new Date()
): AccompanimentStatus {
  // Accompaniment only applies to those who got license when under 24
  if (!wasYoungWhenLicensed(birthDate, licenseDate)) {
    return 'none';
  }

  const fullAccompanimentEndDate = addMonths(licenseDate, FULL_ACCOMPANIMENT_MONTHS);
  const nightAccompanimentEndDate = addMonths(licenseDate, TOTAL_ACCOMPANIMENT_MONTHS);

  if (isBefore(referenceDate, fullAccompanimentEndDate)) {
    return 'full';
  }

  if (isBefore(referenceDate, nightAccompanimentEndDate)) {
    return 'night';
  }

  return 'none';
}

export function getPassengerLimit(
  birthDate: Date,
  licenseDate: Date,
  referenceDate: Date = new Date()
): number | null {
  const age = calculateAge(birthDate, referenceDate);
  const newDriver = isNewDriver(licenseDate, referenceDate);

  // Passenger limit applies to new drivers under 21
  if (newDriver && age < PASSENGER_LIMIT_AGE) {
    return MAX_PASSENGERS_WITH_LIMIT;
  }

  return null;
}

export function getDaysRemaining(endDate: Date, referenceDate: Date = new Date()): number {
  const days = differenceInDays(endDate, referenceDate);
  return Math.max(0, days);
}

export function getProgressPercentage(
  startDate: Date,
  endDate: Date,
  referenceDate: Date = new Date()
): number {
  const totalDays = differenceInDays(endDate, startDate);
  const elapsedDays = differenceInDays(referenceDate, startDate);

  if (totalDays <= 0) return 100;

  const progress = (elapsedDays / totalDays) * 100;
  return Math.min(100, Math.max(0, progress));
}

export function calculateDriverStatus(data: DriverData): DriverStatus | null {
  const birthDate = parseISO(data.birthDate);
  const licenseDate = parseISO(data.licenseDate);

  if (!isValid(birthDate) || !isValid(licenseDate)) {
    return null;
  }

  const today = new Date();
  const age = calculateAge(birthDate, today);
  const newDriver = isNewDriver(licenseDate, today);
  const youngDriver = isYoungDriver(birthDate, today);
  const youngWhenLicensed = wasYoungWhenLicensed(birthDate, licenseDate);
  const accompanimentStatus = getAccompanimentStatus(birthDate, licenseDate, today);
  const passengerLimit = getPassengerLimit(birthDate, licenseDate, today);

  const newDriverEndDate = addYears(licenseDate, NEW_DRIVER_PERIOD_YEARS);
  const fullAccompanimentEndDate = youngWhenLicensed
    ? addMonths(licenseDate, FULL_ACCOMPANIMENT_MONTHS)
    : null;
  const nightAccompanimentEndDate = youngWhenLicensed
    ? addMonths(licenseDate, TOTAL_ACCOMPANIMENT_MONTHS)
    : null;

  return {
    isNewDriver: newDriver,
    isYoungDriver: youngDriver,
    accompanimentStatus,
    hasPassengerLimit: passengerLimit !== null,
    passengerLimit,
    age,
    newDriverEndDate,
    fullAccompanimentEndDate,
    nightAccompanimentEndDate,
    daysRemainingNewDriver: getDaysRemaining(newDriverEndDate, today),
    daysRemainingFullAccompaniment: fullAccompanimentEndDate
      ? getDaysRemaining(fullAccompanimentEndDate, today)
      : 0,
    daysRemainingNightAccompaniment: nightAccompanimentEndDate
      ? getDaysRemaining(nightAccompanimentEndDate, today)
      : 0,
    newDriverProgress: getProgressPercentage(licenseDate, newDriverEndDate, today),
    fullAccompanimentProgress: fullAccompanimentEndDate
      ? getProgressPercentage(licenseDate, fullAccompanimentEndDate, today)
      : 100,
    nightAccompanimentProgress: nightAccompanimentEndDate
      ? getProgressPercentage(
          addMonths(licenseDate, FULL_ACCOMPANIMENT_MONTHS),
          nightAccompanimentEndDate,
          today
        )
      : 100,
    wasYoungWhenLicensed: youngWhenLicensed,
  };
}

export function formatDaysRemaining(days: number): string {
  if (days === 0) return 'הסתיים';
  if (days === 1) return 'יום אחד';
  if (days < 30) return `${days} ימים`;
  if (days < 60) return 'כחודש';
  if (days < 365) return `כ-${Math.round(days / 30)} חודשים`;
  if (days < 730) return 'כשנה';
  return `כ-${Math.round(days / 365)} שנים`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
