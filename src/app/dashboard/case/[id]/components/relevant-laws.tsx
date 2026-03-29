'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Case } from '@/lib/mock-data';
import { BookOpenCheck } from 'lucide-react';

type RelevantLawsProps = {
    caseItem: Case;
};

export function RelevantLaws({ caseItem }: RelevantLawsProps) {
    const laws = caseItem.relevantLaws;

    if (!laws || laws.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Relevant Laws</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No relevant laws have been identified for this case yet.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Relevant Laws & Explanations</CardTitle>
                <CardDescription>These are the laws identified by the AI analysis as relevant to your case.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {laws.map((law, index) => (
                       <AccordionItem value={`item-${index}`} key={index}>
                         <AccordionTrigger>
                           <div className="flex items-center gap-2">
                            <BookOpenCheck className="h-4 w-4" />
                            {law.law}
                           </div>
                           </AccordionTrigger>
                         <AccordionContent className="text-muted-foreground">
                           {law.explanation}
                         </AccordionContent>
                       </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
