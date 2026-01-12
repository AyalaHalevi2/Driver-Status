import { useMemo } from 'react';
import type { DriverData, DriverStatus } from '../types';
import { calculateDriverStatus } from '../utils/calculations';

export function useDriverStatus(data: DriverData | null): DriverStatus | null {
  return useMemo(() => {
    if (!data || !data.birthDate || !data.licenseDate) {
      return null;
    }
    return calculateDriverStatus(data);
  }, [data]);
}
