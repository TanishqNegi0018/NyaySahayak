'use server';

/**
 * @fileOverview Analyzes the user's described issue in plain language and maps it to relevant laws.
 *
 * - analyzeUserIssue - A function that handles the analysis of the user issue.
 * - AnalyzeUserIssueInput - The input type for the analyzeUserIssue function.
 * - AnalyzeUserIssueOutput - The return type for the analyzeUserIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserIssueInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A description of the user issue in plain language.'),
  userLanguage: z.enum(['en', 'hi']).default('en').describe('The user preferred language.'),
});
export type AnalyzeUserIssueInput = z.infer<typeof AnalyzeUserIssueInputSchema>;

const LawExplanationSchema = z.object({
  law: z.string().describe('The name of the relevant law or IPC section.'),
  explanation: z.string().describe('A brief explanation of the law or IPC section in simple terms.'),
});

const AnalyzeUserIssueOutputSchema = z.object({
  relevantLaws: z.array(LawExplanationSchema)
    .describe('A list of relevant laws (IPC, consumer law, cyber law, and labor law) that apply to the issue, with explanations.'),
  translatedIssueDescription: z.string().describe('The translated issue description in user preferred language.'),
});
export type AnalyzeUserIssueOutput = z.infer<typeof AnalyzeUserIssueOutputSchema>;

export async function analyzeUserIssue(input: AnalyzeUserIssueInput): Promise<AnalyzeUserIssueOutput> {
  return analyzeUserIssueFlow(input);
}

const analyzeUserIssuePrompt = ai.definePrompt({
  name: 'analyzeUserIssuePrompt',
  input: {schema: AnalyzeUserIssueInputSchema},
  output: {schema: AnalyzeUserIssueOutputSchema},
  prompt: `You are a legal expert. Analyze the user's issue and map it to relevant laws, provide a simple explanation for each, and translate the issue description to the user's preferred language.

Issue Description: {{{issueDescription}}}
User Language: {{{userLanguage}}}

Consider the following laws:
- IPC (Indian Penal Code)
- Consumer Law
- Cyber Law
- Labor Law

Provide a list of relevant laws that apply to the issue, along with a simple explanation for each law. If the userLanguage is not 'en', translate the issue description to that language.

Example output: 
{
  "relevantLaws": [
    {
      "law": "IPC Section 420",
      "explanation": "Deals with cheating and dishonestly inducing delivery of property."
    },
    {
      "law": "Consumer Protection Act, 2019",
      "explanation": "Protects consumer interests against unfair trade practices."
    }
  ],
  "translatedIssueDescription": "User issue description in Hindi"
}

Make sure you ALWAYS return valid JSON.
`,
});

const analyzeUserIssueFlow = ai.defineFlow(
  {
    name: 'analyzeUserIssueFlow',
    inputSchema: AnalyzeUserIssueInputSchema,
    outputSchema: AnalyzeUserIssueOutputSchema,
  },
  async input => {
    const {output} = await analyzeUserIssuePrompt(input);
    return output!;
  }
);
