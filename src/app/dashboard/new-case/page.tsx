'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { analyzeUserIssue, AnalyzeUserIssueOutput } from '@/ai/flows/analyze-user-issue';
import { Loader2, Wand2, BookOpenCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  issue: z.string().min(50, { message: 'Please provide a detailed description of at least 50 characters.' }),
});

export default function NewCasePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeUserIssueOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issue: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeUserIssue({
        issueDescription: values.issue,
        userLanguage: language,
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // You would show an error toast to the user here.
    } finally {
      setIsLoading(false);
    }
  }

  function proceedToCase() {
    // This is a mock navigation. A new case ID would be generated.
    router.push('/dashboard/case/new-mock-id');
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">File a New Case</CardTitle>
          <CardDescription>
            Describe your issue in detail. Our AI will analyze it and suggest the next steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="issue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Issue</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your situation in as much detail as possible. Include dates, names, and any relevant events."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Analyze Issue
                  </Button>
                </form>
              </Form>

              {isLoading && (
                 <div className="mt-8 flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                 </div>
              )}

              {analysisResult && (
                <Tabs defaultValue="analysis" className="mt-8">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="explanation">Law Explanations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="analysis">
                     <Alert className="bg-green-50 border-green-200">
                        <Wand2 className="h-4 w-4" />
                        <AlertTitle className="font-bold text-green-800">Analysis Complete</AlertTitle>
                        <AlertDescription className="text-green-700">
                            <p className="mt-2">
                            <strong>Relevant Laws Identified:</strong> {analysisResult.relevantLaws.map(l => l.law).join(', ')}
                            </p>
                            <Button onClick={proceedToCase} className="mt-4">
                            View Step-by-Step Guidance
                            </Button>
                        </AlertDescription>
                    </Alert>
                  </TabsContent>
                  <TabsContent value="explanation">
                      <Accordion type="single" collapsible className="w-full">
                        {analysisResult.relevantLaws.map((law, index) => (
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
                  </TabsContent>
                </Tabs>
              )}
            </div>

            <div className="relative hidden md:block">
                <Image
                  src="https://picsum.photos/seed/newcase/800/1200"
                  alt="A person writing on a document"
                  width={800}
                  height={1200}
                  className="rounded-lg object-cover w-full h-full"
                  data-ai-hint="legal document"
                  priority
                />
               <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
