'use client';

import { Scale } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

export function Logo() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex items-center gap-2" aria-label="NyaySahayak Home">
      <Scale className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline">{t.appName}</span>
    </div>
  );
}
