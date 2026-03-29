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
import { translateCaseDetails } from '@/ai/flows/translate-case-details';
import { Loader2, Languages, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  text: z.string().min(10, { message: 'Please enter at least 10 characters to translate.' }),
  targetLanguage: z.enum(['en', 'hi']),
});

export function Translator({ caseItem }: { caseItem: Case }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [useCaseDetails, setUseCaseDetails] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: caseItem.issue,
      targetLanguage: 'hi',
    },
  });

  const { setValue, watch } = form;
  const currentText = watch('text');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTranslatedText('');
    try {
      const result = await translateCaseDetails(values);
      setTranslatedText(result.translatedText);
    } catch (error) {
      console.error('Translation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to translate the text. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      title: 'Copied!',
      description: 'The translated text has been copied to your clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Details Translator</CardTitle>
        <CardDescription>Translate case details between English and Hindi.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <Switch 
            id="use-case-details" 
            checked={useCaseDetails} 
            onCheckedChange={(checked) => {
                setUseCaseDetails(checked);
                setValue('text', checked ? caseItem.issue : '');
            }}
            />
          <Label htmlFor="use-case-details">Use initial case details</Label>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text to Translate</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[150px]" {...field} disabled={useCaseDetails} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Translate To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading || !currentText}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
                Translate
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Translated Text</h3>
              <div className="relative rounded-md border bg-muted/50 p-4 h-[258px] overflow-y-auto">
                {translatedText && (
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap text-sm text-foreground">
                        {translatedText || "Your translation will appear here..."}
                    </p>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
