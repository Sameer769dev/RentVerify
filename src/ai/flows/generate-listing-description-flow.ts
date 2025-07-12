
'use server';
/**
 * @fileOverview Generates a compelling property listing description.
 *
 * - generateListingDescription - A function that handles the description generation.
 * - GenerateListingDescriptionInput - The input type for the function.
 * - GenerateListingDescriptionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateListingDescriptionInputSchema = z.object({
  propertyType: z.string().describe("The type of property (e.g., House, Flat, Room)."),
  beds: z.coerce.number().describe("The number of bedrooms."),
  keywords: z.string().describe("A comma-separated list of keywords or highlights about the property."),
  city: z.string().describe("The city where the property is located.")
});
export type GenerateListingDescriptionInput = z.infer<typeof GenerateListingDescriptionInputSchema>;

const GenerateListingDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated property listing description, written in a friendly and appealing tone.'),
});
export type GenerateListingDescriptionOutput = z.infer<typeof GenerateListingDescriptionOutputSchema>;

export async function generateListingDescription(input: GenerateListingDescriptionInput): Promise<GenerateListingDescriptionOutput> {
  return generateListingDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateListingDescriptionPrompt',
  input: {schema: GenerateListingDescriptionInputSchema},
  output: {schema: GenerateListingDescriptionOutputSchema},
  prompt: `You are a creative real estate copywriter. Your task is to write a compelling and attractive property listing description.

  **Property Details:**
  - **Type:** {{{propertyType}}}
  - **Bedrooms:** {{{beds}}}
  - **Location:** {{{city}}}
  - **Key Features:** {{{keywords}}}

  **Instructions:**
  1.  Write a warm, inviting, and detailed description for a rental listing.
  2.  Incorporate the provided key features naturally into the text.
  3.  Highlight the benefits of the property type and location.
  4.  The tone should be professional yet friendly, aiming to attract potential tenants.
  5.  The final output should be a single paragraph of text, around 4-6 sentences long. Do not use headings or bullet points.
  `,
});

const generateListingDescriptionFlow = ai.defineFlow(
  {
    name: 'generateListingDescriptionFlow',
    inputSchema: GenerateListingDescriptionInputSchema,
    outputSchema: GenerateListingDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
