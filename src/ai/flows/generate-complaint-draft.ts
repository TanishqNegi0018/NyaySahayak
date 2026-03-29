'use server';

/**
 * @fileOverview This file contains a Genkit flow for generating complaint drafts (FIR, consumer complaint, RTI) based on user-provided case details.
 *
 * - generateComplaintDraft - A function that generates a complaint draft based on the provided input.
 * - GenerateComplaintDraftInput - The input type for the generateComplaintDraft function.
 * - GenerateComplaintDraftOutput - The output type for the generateComplaintDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateComplaintDraftInputSchema = z.object({
  caseDetails: z.string().describe('Detailed description of the case.'),
  complaintType: z.enum(['FIR', 'Consumer Complaint', 'RTI']).describe('Type of complaint to generate.'),
  preferredLanguage: z.enum(['English', 'Hindi']).default('English').describe('Preferred language for the complaint draft.'),
  additionalContext: z.string().optional().describe('Any additional context or information relevant to the case.'),
});
export type GenerateComplaintDraftInput = z.infer<typeof GenerateComplaintDraftInputSchema>;

const GenerateComplaintDraftOutputSchema = z.object({
  complaintDraft: z.string().describe('The generated complaint draft.'),
});
export type GenerateComplaintDraftOutput = z.infer<typeof GenerateComplaintDraftOutputSchema>;

export async function generateComplaintDraft(input: GenerateComplaintDraftInput): Promise<GenerateComplaintDraftOutput> {
  return generateComplaintDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComplaintDraftPrompt',
  input: {schema: GenerateComplaintDraftInputSchema},
  output: {schema: GenerateComplaintDraftOutputSchema},
  prompt: `You are an AI assistant specialized in generating legal complaint drafts.

  Based on the provided case details, complaint type, and preferred language, generate a comprehensive and relevant complaint draft.
  Consider the following:

  - Case Details: {{{caseDetails}}}
  - Complaint Type: {{{complaintType}}}
  - Preferred Language: {{{preferredLanguage}}}
  - Additional Context: {{{additionalContext}}}

  Ensure the draft is well-structured, legally sound, and easy to understand.
  The output should be a ready-to-use complaint draft.

  If the preferred language is Hindi, translate the complaint draft to Hindi.
  `,
});

const generateComplaintDraftFlow = ai.defineFlow(
  {
    name: 'generateComplaintDraftFlow',
    inputSchema: GenerateComplaintDraftInputSchema,
    outputSchema: GenerateComplaintDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
