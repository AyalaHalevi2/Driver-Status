import { Car, Info } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { Disclaimer } from './components/Disclaimer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDriverStatus } from './hooks/useDriverStatus';
import { STORAGE_KEY } from './utils/constants';
import type { DriverData } from './types';

const initialData: DriverData = {
  birthDate: '',
  licenseDate: '',
  licenseType: 'B',
};

function App() {
  const [driverData, setDriverData, clearData] = useLocalStorage<DriverData>(
    STORAGE_KEY,
    initialData
  );

  const driverStatus = useDriverStatus(driverData);

  const hasValidData = driverData.birthDate && driverData.licenseDate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Car className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                מתי נגמר המלווה?
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                מחשבון סטטוס נהג חדש ותקופות מלווה
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <InputForm
          data={driverData}
          onChange={setDriverData}
          onClear={() => clearData()}
        />

        {hasValidData && driverStatus ? (
          <Dashboard status={driverStatus} />
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              הזן את הפרטים שלך
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              הזן את תאריך הלידה ותאריך קבלת הרישיון כדי לראות את הסטטוס שלך
              כנהג חדש, תקופות המלווה והגבלות נוסעים.
            </p>
          </div>
        )}

        <Disclaimer />

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-400">
          <p>
            נבנה עם בישראל | מבוסס על חוקי התעבורה הישראליים
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
