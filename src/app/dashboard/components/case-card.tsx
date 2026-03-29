'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Case } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

type CaseCardProps = {
  caseItem: Case;
};

const statusVariantMap: { [key in Case['status']]: "default" | "secondary" | "destructive" | "outline" } = {
  Draft: 'secondary',
  Analyzed: 'default',
  Submitted: 'outline',
  Resolved: 'default', // will use different color
};

export function CaseCard({ caseItem }: CaseCardProps) {
  const { language } = useLanguage();
  const t = translations[language].dashboard.cases;
  
  const statusTranslations = {
    'Draft': t.status.draft,
    'Analyzed': t.status.analyzed,
    'Submitted': t.status.submitted,
    'Resolved': t.status.resolved,
  };

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-headline">{caseItem.title}</CardTitle>
            <Badge variant={statusVariantMap[caseItem.status]} className={caseItem.status === 'Resolved' ? 'bg-green-500 text-white' : ''}>
              {statusTranslations[caseItem.status]}
            </Badge>
        </div>
        <CardDescription className="line-clamp-2">{caseItem.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{t.lastUpdated} {caseItem.lastUpdated}</span>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/case/${caseItem.id}`}>
            {t.viewCase} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
