'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { mockCases, Case } from '@/lib/mock-data';
import { CaseCard } from './components/case-card';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = translations[language].dashboard;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t.pageTitle}</h1>
        <p className="text-muted-foreground">{t.pageDescription}</p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-headline">{t.cases.title}</h2>
        <Button asChild>
          <Link href="/dashboard/new-case">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t.newCaseButton}
          </Link>
        </Button>
      </div>

      {mockCases.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCases.map((caseItem: Case) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
          <h3 className="text-xl font-semibold">{t.noCasesTitle}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.noCasesDescription}
          </p>
          <Button className="mt-6">
            <Link href="/dashboard/new-case">{t.newCaseButton}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
