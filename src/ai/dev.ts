import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-user-issue.ts';
import '@/ai/flows/translate-case-details.ts';
import '@/ai/flows/generate-complaint-draft.ts';