export type LicenseType = 'B' | 'A' | 'A1' | 'A2' | 'C' | 'C1' | 'D' | 'D1';

export interface DriverData {
  birthDate: string;
  licenseDate: string;
  licenseType: LicenseType;
}

export type AccompanimentStatus = 'full' | 'night' | 'none';

export interface DriverStatus {
  isNewDriver: boolean;
  isYoungDriver: boolean;
  accompanimentStatus: AccompanimentStatus;
  hasPassengerLimit: boolean;
  passengerLimit: number | null;
  age: number;
  newDriverEndDate: Date | null;
  fullAccompanimentEndDate: Date | null;
  nightAccompanimentEndDate: Date | null;
  daysRemainingNewDriver: number;
  daysRemainingFullAccompaniment: number;
  daysRemainingNightAccompaniment: number;
  newDriverProgress: number;
  fullAccompanimentProgress: number;
  nightAccompanimentProgress: number;
  wasYoungWhenLicensed: boolean;
}

export interface StatusCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'warning';
  details?: string;
}

export interface ProgressBarProps {
  label: string;
  progress: number;
  daysRemaining: number;
  endDate: Date | null;
  colorScheme: 'blue' | 'green' | 'yellow' | 'red';
}
