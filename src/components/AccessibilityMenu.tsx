import { useState, useEffect, useCallback } from 'react';
import {
  Accessibility,
  Type,
  Contrast,
  ZapOff,
  Link,
  Eye,
  Focus,
  Palette,
  MousePointer2,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import styles from './AccessibilityMenu.module.scss';

interface AccessibilityFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  className: string;
}

const STORAGE_KEY = 'accessibility-settings';

const features: AccessibilityFeature[] = [
  {
    id: 'largeText',
    title: 'הגדלת טקסט',
    description: 'הגדלת גודל הטקסט לקריאה נוחה יותר',
    icon: <Type />,
    className: 'accessibility-large-text',
  },
  {
    id: 'highContrast',
    title: 'ניגודיות גבוהה',
    description: 'הגברת הניגודיות בין צבעים',
    icon: <Contrast />,
    className: 'accessibility-high-contrast',
  },
  {
    id: 'reduceMotion',
    title: 'הפחתת אנימציות',
    description: 'הפחתה או ביטול של אנימציות',
    icon: <ZapOff />,
    className: 'accessibility-reduce-motion',
  },
  {
    id: 'highlightLinks',
    title: 'הדגשת קישורים',
    description: 'סימון ברור של כל הקישורים והכפתורים',
    icon: <Link />,
    className: 'accessibility-highlight-links',
  },
  {
    id: 'readableFont',
    title: 'גופן קריא',
    description: 'שימוש בגופן ברור וקריא יותר',
    icon: <Eye />,
    className: 'accessibility-readable-font',
  },
  {
    id: 'focusIndicators',
    title: 'מדגיש מיקוד',
    description: 'הדגשה חזקה יותר של אלמנט נבחר',
    icon: <Focus />,
    className: 'accessibility-focus-indicators',
  },
  {
    id: 'monochrome',
    title: 'מצב שחור-לבן',
    description: 'הצגה בגווני אפור בלבד',
    icon: <Palette />,
    className: 'accessibility-monochrome',
  },
  {
    id: 'largeCursor',
    title: 'סמן גדול',
    description: 'הגדלת סמן העכבר',
    icon: <MousePointer2 />,
    className: 'accessibility-large-cursor',
  },
];

type AccessibilitySettings = Record<string, boolean>;

export function AccessibilityMenu() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {};
      }
    }
    return {};
  });

  const themeClass = isDark ? styles.dark : styles.light;
  const hasActiveFeatures = Object.values(settings).some(Boolean);

  // Apply accessibility classes to body
  useEffect(() => {
    features.forEach((feature) => {
      if (settings[feature.id]) {
        document.body.classList.add(feature.className);
      } else {
        document.body.classList.remove(feature.className);
      }
    });

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleFeature = useCallback((featureId: string) => {
    setSettings((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  }, []);

  const resetAll = useCallback(() => {
    setSettings({});
  }, []);

  return (
    <div className={styles.accessibilityWrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.accessibilityButton} ${themeClass} ${
          hasActiveFeatures ? styles.active : ''
        }`}
        title="הגדרות נגישות"
        aria-label="הגדרות נגישות"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Accessibility className={styles.icon} />
      </button>

      {isOpen && (
        <>
          <div
            className={styles.menuOverlay}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`${styles.menu} ${themeClass}`}
            role="menu"
            aria-label="תפריט נגישות"
          >
            <div className={`${styles.menuHeader} ${themeClass}`}>
              <span className={`${styles.menuTitle} ${themeClass}`}>
                <Accessibility size={18} />
                הגדרות נגישות
              </span>
              <button
                onClick={resetAll}
                className={`${styles.resetButton} ${themeClass}`}
                title="איפוס הגדרות"
                aria-label="איפוס כל הגדרות הנגישות"
              >
                <RotateCcw size={12} className={styles.resetIcon} />
                איפוס
              </button>
            </div>

            <div className={styles.menuContent} role="group">
              {features.map((feature) => {
                const isActive = settings[feature.id] || false;
                return (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`${styles.featureButton} ${themeClass} ${
                      isActive ? styles.active : ''
                    }`}
                    role="menuitemcheckbox"
                    aria-checked={isActive}
                  >
                    <div
                      className={`${styles.featureIcon} ${themeClass} ${
                        isActive ? styles.active : ''
                      }`}
                    >
                      <span className={styles.featureIconSvg}>{feature.icon}</span>
                    </div>
                    <div className={styles.featureText}>
                      <div className={`${styles.featureTitle} ${themeClass}`}>
                        {feature.title}
                      </div>
                      <div className={`${styles.featureDescription} ${themeClass}`}>
                        {feature.description}
                      </div>
                    </div>
                    <div
                      className={`${styles.featureStatus} ${
                        isActive ? styles.active : `${styles.inactive} ${themeClass}`
                      }`}
                    >
                      {isActive ? (
                        <Check className={styles.checkIcon} />
                      ) : (
                        <X className={`${styles.checkIcon} ${styles.hidden}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
