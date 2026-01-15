import { Car, Info, Moon, Sun } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { Disclaimer } from './components/Disclaimer';
import { AccessibilityMenu } from './components/AccessibilityMenu';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDriverStatus } from './hooks/useDriverStatus';
import { ThemeContext, useThemeState, useTheme } from './hooks/useTheme';
import { STORAGE_KEY } from './utils/constants';
import type { DriverData } from './types';
import styles from './App.module.scss';

const initialData: DriverData = {
  birthDate: '',
  licenseDate: '',
  licenseType: 'B',
};

function AppContent() {
  const [driverData, setDriverData, clearData] = useLocalStorage<DriverData>(
    STORAGE_KEY,
    initialData
  );
  const { toggleTheme, isDark } = useTheme();

  const driverStatus = useDriverStatus(driverData);

  const hasValidData = driverData.birthDate && driverData.licenseDate;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      {/* Header */}
      <header className={`shadow-sm border-b transition-colors duration-300 ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-blue-100'
      }`}>
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Car className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold transition-colors ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  מתי נגמר המלווה?
                </h1>
                <p className={`text-xs sm:text-sm mt-1 transition-colors ${
                  isDark ? 'text-slate-400' : 'text-gray-500'
                }`}>
                  מחשבון סטטוס נהג חדש ותקופות מלווה
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`${styles.themeButton} ${isDark ? styles.dark : styles.light}`}
                title={isDark ? 'מצב יום' : 'מצב לילה'}
                aria-label={isDark ? 'מצב יום' : 'מצב לילה'}
              >
                {isDark ? (
                  <Sun className={styles.themeIcon} />
                ) : (
                  <Moon className={styles.themeIcon} />
                )}
              </button>

              {/* Accessibility Menu */}
              <AccessibilityMenu />
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
          <div className={`rounded-2xl shadow-lg p-8 text-center transition-colors duration-300 ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDark ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}>
              <Info className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className={`text-xl font-semibold mb-2 transition-colors ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              הזן את הפרטים שלך
            </h2>
            <p className={`max-w-md mx-auto transition-colors ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`}>
              הזן את תאריך הלידה ותאריך קבלת הרישיון כדי לראות את הסטטוס שלך
              כנהג חדש, תקופות המלווה והגבלות נוסעים.
            </p>
          </div>
        )}

        <Disclaimer />

        {/* Footer */}
        <footer className={`mt-8 text-center text-sm transition-colors ${
          isDark ? 'text-slate-500' : 'text-gray-400'
        }`}>
          <p>
            נבנה עם בישראל | מבוסס על חוקי התעבורה הישראליים
          </p>
        </footer>
      </main>
    </div>
  );
}

function App() {
  const themeState = useThemeState();

  return (
    <ThemeContext.Provider value={themeState}>
      <div data-theme={themeState.theme}>
        <AppContent />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
