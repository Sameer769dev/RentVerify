import { config } from 'dotenv';
config();

import '@/ai/flows/smart-recommendations.ts';
import '@/ai/flows/kyc-flow.ts';
import '@/ai/flows/generate-contract-flow.ts';
import '@/ai/flows/generate-reply-suggestions.ts';
import '@/ai/flows/generate-listing-description-flow.ts';
import '@/ai/flows/generate-listing-image-flow.ts';
import '@/ai/flows/text-to-speech-flow.ts';
