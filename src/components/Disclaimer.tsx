import { AlertTriangle } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mt-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-lg shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-800 mb-2">הבהרה חשובה</h3>
          <p className="text-sm text-amber-700 leading-relaxed">
            האתר מספק מידע כללי בלבד ואינו מהווה ייעוץ משפטי. המידע אינו משקלל
            הרשעות קודמות, פסילות או נקודות תעבורה שנצברו לחובת הנהג. לקבלת מידע
            מדויק ומחייב, יש לפנות לרשות הרישוי או לייעוץ משפטי מקצועי.
          </p>
        </div>
      </div>
    </div>
  );
}
