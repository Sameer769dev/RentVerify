'use server';
/**
 * @fileOverview Generates contextual reply suggestions for a chat conversation.
 *
 * - generateReplySuggestions - A function that handles generating reply suggestions.
 * - GenerateReplySuggestionsInput - The input type for the generateReplySuggestions function.
 * - GenerateReplySuggestionsOutput - The return type for the generateReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReplySuggestionsInputSchema = z.object({
  conversationHistory: z.string().describe('The last few messages of the conversation, formatted as "Sender: Message".'),
  userRole: z.enum(['tenant', 'owner']).describe('The role of the user requesting suggestions (tenant or owner).')
});
export type GenerateReplySuggestionsInput = z.infer<typeof GenerateReplySuggestionsInputSchema>;

const GenerateReplySuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of three short, relevant reply suggestions.'),
});
export type GenerateReplySuggestionsOutput = z.infer<typeof GenerateReplySuggestionsOutputSchema>;

export async function generateReplySuggestions(input: GenerateReplySuggestionsInput): Promise<GenerateReplySuggestionsOutput> {
  return generateReplySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReplySuggestionsPrompt',
  input: {schema: GenerateReplySuggestionsInputSchema},
  output: {schema: GenerateReplySuggestionsOutputSchema},
  prompt: `You are a helpful assistant for a rental marketplace called GharBhada.com. Your task is to generate three brief, helpful, and contextually appropriate reply suggestions for a user in a chat conversation.

The user is a {{userRole}}.

Here is the recent conversation history:
---
{{{conversationHistory}}}
---

Based on the conversation, provide three distinct and concise reply options. The suggestions should be practical and move the conversation forward. For example, if the last message is a question, the suggestions should be answers. If it's a statement, they could be follow-up questions or acknowledgements.

Keep the suggestions short (under 10 words).
`,
});

const generateReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateReplySuggestionsFlow',
    inputSchema: GenerateReplySuggestionsInputSchema,
    outputSchema: GenerateReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
