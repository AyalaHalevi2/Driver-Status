import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Disclaimer() {
  const { isDark } = useTheme();

  return (
    <div className={`border-2 rounded-2xl p-5 mt-6 transition-colors duration-300 ${
      isDark
        ? 'bg-amber-900/20 border-amber-700/50'
        : 'bg-amber-50 border-amber-200'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${
          isDark ? 'bg-amber-900/40' : 'bg-amber-100'
        }`}>
          <AlertTriangle className={`w-5 h-5 ${
            isDark ? 'text-amber-400' : 'text-amber-600'
          }`} />
        </div>
        <div>
          <h3 className={`font-semibold mb-2 transition-colors ${
            isDark ? 'text-amber-300' : 'text-amber-800'
          }`}>הבהרה חשובה</h3>
          <p className={`text-sm leading-relaxed transition-colors ${
            isDark ? 'text-amber-200/80' : 'text-amber-700'
          }`}>
            האתר מספק מידע כללי בלבד ואינו מהווה ייעוץ משפטי. המידע אינו משקלל
            הרשעות קודמות, פסילות או נקודות תעבורה שנצברו לחובת הנהג. לקבלת מידע
            מדויק ומחייב, יש לפנות לרשות הרישוי או לייעוץ משפטי מקצועי.
          </p>
        </div>
      </div>
    </div>
  );
}
