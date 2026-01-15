import { X, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import styles from './InfoModal.module.scss';

export type InfoModalType = 'newDriver' | 'youngDriver' | 'accompaniment' | 'passengerLimit' | null;

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
}

interface ModalContent {
  title: string;
  description: string;
  details: string[];
  links: { label: string; url: string }[];
}

const modalContents: Record<Exclude<InfoModalType, null>, ModalContent> = {
  newDriver: {
    title: 'נהג חדש',
    description: 'תקופת הנהג החדש נמשכת שנתיים מיום קבלת רישיון הנהיגה. במהלך תקופה זו חלות הגבלות מיוחדות על הנהג.',
    details: [
      'תקופת נהג חדש נמשכת שנתיים (24 חודשים) מיום קבלת הרישיון',
      'במהלך תקופה זו יש לנהוג בזהירות יתרה',
      'חובה להצמיד תווית "נ" (נהג חדש) על הרכב',
      'עבירות תנועה עלולות לגרור להארכת תקופת הנהג החדש',
      'צבירת נקודות עלולה להביא לפסילת רישיון',
    ],
    links: [
      {
        label: 'מידע נוסף באתר משרד התחבורה',
        url: 'https://www.gov.il/he/departments/ministry_of_transport_and_road_safety',
      },
    ],
  },
  youngDriver: {
    title: 'נהג צעיר',
    description: 'נהג מתחת לגיל 24 נחשב "נהג צעיר" ועשויות לחול עליו הגבלות נוספות בשילוב עם מעמד נהג חדש.',
    details: [
      'נהג צעיר הוא נהג שטרם מלאו לו 24 שנים',
      'שילוב של נהג חדש + נהג צעיר מחייב תקופת מלווה',
      'הגבלות הנוסעים חלות על נהגים חדשים מתחת לגיל 21',
      'לאחר גיל 24 - אין יותר הגבלות הקשורות לגיל',
    ],
    links: [
      {
        label: 'חוקי תעבורה - משרד התחבורה',
        url: 'https://www.gov.il/he/departments/ministry_of_transport_and_road_safety',
      },
    ],
  },
  accompaniment: {
    title: 'תקופת מלווה',
    description: 'נהג חדש שקיבל רישיון לפני גיל 24 חייב בתקופת מלווה. התקופה מחולקת לשני שלבים: מלווה מלא ומלווה לילי.',
    details: [
      '3 חודשים ראשונים: מלווה מלא - חובת מלווה בכל שעות היממה',
      '3 חודשים נוספים: מלווה לילי - חובת מלווה בין 21:00 ל-06:00',
      'המלווה חייב להיות בעל רישיון נהיגה בתוקף לפחות 5 שנים',
      'המלווה חייב לשבת במושב הקדמי ליד הנהג',
      'נהג שקיבל רישיון לאחר גיל 24 פטור מחובת מלווה',
    ],
    links: [
      {
        label: 'הצהרת מלווה - gov.il',
        url: 'https://www.gov.il/he/service/new_driver_escort_declaration',
      },
      {
        label: 'מידע כללי - משרד התחבורה',
        url: 'https://www.gov.il/he/departments/ministry_of_transport_and_road_safety',
      },
    ],
  },
  passengerLimit: {
    title: 'הגבלת נוסעים',
    description: 'נהג חדש מתחת לגיל 21 מוגבל במספר הנוסעים שהוא רשאי להסיע, אלא אם נמצא מלווה ברכב.',
    details: [
      'ההגבלה חלה על נהג חדש שטרם מלאו לו 21 שנים',
      'מותר להסיע עד 2 נוסעים בלבד (לא כולל מלווה)',
      'בנוכחות מלווה מוסמך - אין הגבלת נוסעים',
      'ההגבלה פוקעת כשהנהג מגיע לגיל 21 או בתום תקופת הנהג החדש',
      'הפרת ההגבלה היא עבירת תנועה חמורה',
    ],
    links: [
      {
        label: 'הגבלת נוסעים לנהג חדש - gov.il',
        url: 'https://www.gov.il/he/departments/general/new_driver_passenger_limitation',
      },
      {
        label: 'מידע כללי - משרד התחבורה',
        url: 'https://www.gov.il/he/departments/ministry_of_transport_and_road_safety',
      },
    ],
  },
};

export function InfoModal({ type, onClose }: InfoModalProps) {
  const { isDark } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = type !== null;
  const themeClass = isDark ? styles.dark : styles.light;

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard and click events
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!type) return null;

  const content = modalContents[type];

  return (
    <div className={`${styles.backdrop} ${themeClass} modal-backdrop`}>
      <div
        ref={modalRef}
        className={`${styles.modal} ${themeClass} modal-content`}
      >
        {/* Header */}
        <div className={`${styles.header} ${themeClass}`}>
          <h2 className={`${styles.title} ${themeClass}`}>
            {content.title}
          </h2>
          <button
            onClick={onClose}
            className={`${styles.closeButton} ${themeClass}`}
            aria-label="סגור"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Description */}
          <p className={`${styles.description} ${themeClass}`}>
            {content.description}
          </p>

          {/* Details List */}
          <div className={`${styles.detailsBox} ${themeClass}`}>
            <h3 className={`${styles.detailsTitle} ${themeClass}`}>
              פרטים חשובים:
            </h3>
            <ul className={styles.detailsList}>
              {content.details.map((detail, index) => (
                <li key={index} className={styles.detailItem}>
                  <span className={`${styles.detailDot} ${themeClass}`} />
                  <span className={`${styles.detailText} ${themeClass}`}>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div className={styles.linksSection}>
            <h3 className={`${styles.linksTitle} ${themeClass}`}>
              קישורים רשמיים:
            </h3>
            {content.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.link} ${themeClass}`}
              >
                <ExternalLink className={styles.linkIcon} />
                <span className={styles.linkText}>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`${styles.footer} ${themeClass}`}>
          <button
            onClick={onClose}
            className={`${styles.footerButton} ${themeClass}`}
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}
