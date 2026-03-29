'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Case } from '@/lib/mock-data';
import { useLanguage } from '@/contexts/language-context';
import { generateComplaintDraft } from '@/ai/flows/generate-complaint-draft';
import { Loader2, Wand2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  complaintType: z.enum(['FIR', 'Consumer Complaint', 'RTI']),
  caseDetails: z.string().min(50),
  additionalContext: z.string().optional(),
});

export function DraftGenerator({ caseItem }: { caseItem: Case }) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseDetails: caseItem.issue,
      complaintType: 'FIR',
      additionalContext: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDraft('');
    try {
      const result = await generateComplaintDraft({
        ...values,
        preferredLanguage: language === 'hi' ? 'Hindi' : 'English',
      });
      setDraft(result.complaintDraft);
    } catch (error) {
      console.error('Draft generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate the draft. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

    const copyToClipboard = () => {
    navigator.clipboard.writeText(draft);
    toast({
      title: 'Copied!',
      description: 'The draft has been copied to your clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaint Draft Generator</CardTitle>
        <CardDescription>Generate a legal draft for your case. Review and edit as necessary.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="complaintType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Complaint</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a complaint type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FIR">FIR</SelectItem>
                      <SelectItem value="Consumer Complaint">Consumer Complaint</SelectItem>
                      <SelectItem value="RTI">RTI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caseDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Details</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalContext"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Context (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide any other relevant details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Draft
            </Button>
          </form>
        </Form>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Draft</h3>
          <div className="relative rounded-md border bg-muted/50 p-4 h-[400px] overflow-y-auto">
             {draft && (
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            )}
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                </div>
            ) : (
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                    {draft || "Your generated draft will appear here..."}
                </pre>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
