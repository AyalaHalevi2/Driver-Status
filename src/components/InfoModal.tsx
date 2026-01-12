import { X, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

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
      'עבירות תנועה עלולות לגרום להארכת תקופת הנהג החדש',
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

  useEffect(() => {
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
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!type) return null;

  const content = modalContents[type];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop ${
      isDark ? 'bg-black/70' : 'bg-black/50'
    }`}>
      <div
        ref={modalRef}
        className={`modal-content w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-4 border-b ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {content.title}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
            aria-label="סגור"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Description */}
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            {content.description}
          </p>

          {/* Details List */}
          <div className={`rounded-xl p-4 ${isDark ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
              פרטים חשובים:
            </h3>
            <ul className="space-y-2">
              {content.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-500'
                  }`} />
                  <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div className="space-y-2">
            <h3 className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              קישורים רשמיים:
            </h3>
            {content.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                  isDark
                    ? 'bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 hover:text-blue-300'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800'
                }`}
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}
