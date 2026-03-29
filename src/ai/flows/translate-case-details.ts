'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating case details between English and Hindi.
 *
 * - translateCaseDetails - A function that translates case details to a specified language.
 * - TranslateCaseDetailsInput - The input type for the translateCaseDetails function.
 * - TranslateCaseDetailsOutput - The return type for the translateCaseDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateCaseDetailsInputSchema = z.object({
  text: z.string().describe('The case details text to translate.'),
  targetLanguage: z.enum(['en', 'hi']).describe('The target language for translation (en for English, hi for Hindi).'),
});

export type TranslateCaseDetailsInput = z.infer<typeof TranslateCaseDetailsInputSchema>;

const TranslateCaseDetailsOutputSchema = z.object({
  translatedText: z.string().describe('The translated case details text.'),
});

export type TranslateCaseDetailsOutput = z.infer<typeof TranslateCaseDetailsOutputSchema>;

export async function translateCaseDetails(input: TranslateCaseDetailsInput): Promise<TranslateCaseDetailsOutput> {
  return translateCaseDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateCaseDetailsPrompt',
  input: {schema: TranslateCaseDetailsInputSchema},
  output: {schema: TranslateCaseDetailsOutputSchema},
  prompt: `You are a legal expert proficient in both English and Hindi.
Translate the following case details text to {{targetLanguage}}. Ensure the translated content maintains the legal accuracy and context of the original text.

Original Text: {{{text}}}`,
});

const translateCaseDetailsFlow = ai.defineFlow(
  {
    name: 'translateCaseDetailsFlow',
    inputSchema: TranslateCaseDetailsInputSchema,
    outputSchema: TranslateCaseDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
