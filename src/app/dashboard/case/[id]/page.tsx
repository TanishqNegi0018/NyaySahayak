import { mockCases } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GuidanceSteps } from './components/guidance-steps';
import { DraftGenerator } from './components/draft-generator';
import { Translator } from './components/translator';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { RelevantLaws } from './components/relevant-laws';

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const caseItem = mockCases.find((c) => c.id === params.id);

  if (!caseItem) {
    notFound();
  }
  
  const statusTranslations: { [key: string]: string } = {
    'Draft': 'मसौदा',
    'Analyzed': 'विश्लेषण किया गया',
    'Submitted': 'प्रस्तुत',
    'Resolved': 'हल किया गया',
  };


  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-headline">{caseItem.title}</CardTitle>
            <Badge>{statusTranslations[caseItem.status] || caseItem.status}</Badge>
          </div>
          <CardDescription>{caseItem.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Initial Issue Description:</h3>
          <p className="text-sm text-muted-foreground p-4 bg-secondary/50 rounded-md">{caseItem.issue}</p>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="guidance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="guidance">Step-by-Step Guidance</TabsTrigger>
          <TabsTrigger value="laws">Relevant Laws</TabsTrigger>
          <TabsTrigger value="drafting">Generate Drafts</TabsTrigger>
          <TabsTrigger value="translate">Translate</TabsTrigger>
        </TabsList>
        <TabsContent value="guidance">
          <GuidanceSteps caseItem={caseItem} />
        </TabsContent>
        <TabsContent value="laws">
          <RelevantLaws caseItem={caseItem} />
        </TabsContent>
        <TabsContent value="drafting">
          <DraftGenerator caseItem={caseItem} />
        </TabsContent>
        <TabsContent value="translate">
          <Translator caseItem={caseItem} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
