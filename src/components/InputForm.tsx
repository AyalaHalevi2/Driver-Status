import { Calendar, Car, Trash2 } from 'lucide-react';
import type { DriverData, LicenseType } from '../types';
import { LICENSE_TYPES } from '../utils/constants';

interface InputFormProps {
  data: DriverData;
  onChange: (data: DriverData) => void;
  onClear: () => void;
}

export function InputForm({ data, onChange, onClear }: InputFormProps) {
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Car className="w-6 h-6 text-blue-600" />
        פרטי הנהג
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Calendar className="w-4 h-4 inline-block ml-1" />
            תאריך לידה
          </label>
          <input
            type="date"
            id="birthDate"
            value={data.birthDate}
            onChange={handleBirthDateChange}
            max={today}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800 bg-gray-50"
          />
        </div>

        <div>
          <label
            htmlFor="licenseDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Calendar className="w-4 h-4 inline-block ml-1" />
            תאריך קבלת רישיון
          </label>
          <input
            type="date"
            id="licenseDate"
            value={data.licenseDate}
            onChange={handleLicenseDateChange}
            max={today}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800 bg-gray-50"
          />
        </div>

        <div>
          <label
            htmlFor="licenseType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Car className="w-4 h-4 inline-block ml-1" />
            סוג רישיון
          </label>
          <select
            id="licenseType"
            value={data.licenseType}
            onChange={handleLicenseTypeChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-800 bg-gray-50"
          >
            {LICENSE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          נקה נתונים
        </button>
      </div>
    </div>
  );
}
