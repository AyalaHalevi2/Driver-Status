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
  const themeClass = isDark ? styles.dark : styles.light;

  return (
    <div className={`${styles.appContainer} ${themeClass}`}>
      {/* Header */}
      <header className={`${styles.header} ${themeClass}`}>
        <div className={styles.headerContent}>
          <div className={styles.headerInner}>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>
                <Car className={styles.carIcon} />
              </div>
              <div className={styles.titleSection}>
                <h1 className={`${styles.title} ${themeClass}`}>
                  סטטוס הנהיגה שלי
                </h1>
                <p className={`${styles.subtitle} ${themeClass}`}>
                  מחשבון נהג חדש | מלווה | הגבלות נוסעים
                </p>
              </div>
            </div>

            <div className={styles.headerActions}>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`${styles.themeButton} ${themeClass}`}
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
      <main className={styles.main}>
        <InputForm
          data={driverData}
          onChange={setDriverData}
          onClear={() => clearData()}
        />

        {hasValidData && driverStatus ? (
          <Dashboard status={driverStatus} />
        ) : (
          <div className={`${styles.emptyState} ${themeClass}`}>
            <div className={`${styles.emptyStateIcon} ${themeClass}`}>
              <Info className={styles.infoIcon} />
            </div>
            <h2 className={`${styles.emptyStateTitle} ${themeClass}`}>
              הזן את הפרטים שלך
            </h2>
            <p className={`${styles.emptyStateText} ${themeClass}`}>
              הזן את תאריך הלידה ותאריך קבלת הרישיון כדי לראות את הסטטוס שלך
              כנהג חדש, תקופות המלווה והגבלות נוסעים.
            </p>
          </div>
        )}

        <Disclaimer />

        {/* Footer */}
        <footer className={`${styles.footer} ${themeClass}`}>
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
