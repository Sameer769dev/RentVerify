
'use server';

/**
 * @fileOverview Recommends similar listings based on user preferences and search history.
 *
 * - recommendListings - A function that handles the listing recommendation process.
 * - RecommendListingsInput - The input type for the recommendListings function.
 * - RecommendListingsOutput - The return type for the recommendListings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { getListings } from '@/lib/firestore'; // Changed from mock-data
import type { Listing } from '@/types';

const RecommendListingsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user’s preferences, including desired location, price range, number of bedrooms, and amenities.'),
  searchHistory: z
    .string()
    .describe('A summary of the user’s past searches and viewed properties, including location, price range, and property types.'),
  currentListingId: z
    .string()
    .describe('The ID of the currently viewed listing, to be excluded from recommendations.'),
});
export type RecommendListingsInput = z.infer<typeof RecommendListingsInputSchema>;

// Only need to return IDs and a brief reason, the full data will be fetched client-side.
const RecommendedListingSchema = z.object({
  id: z.string().describe("The ID of the recommended listing."),
  reason: z.string().describe("A brief explanation of why this listing was recommended.")
})

const RecommendListingsOutputSchema = z.object({
  recommendations: z
    .array(RecommendedListingSchema)
    .describe('An array of up to 3 recommended listing objects that are similar to the current one.'),
});
export type RecommendListingsOutput = z.infer<typeof RecommendListingsOutputSchema>;

export async function recommendListings(input: RecommendListingsInput): Promise<RecommendListingsOutput> {
  return recommendListingsFlow(input);
}

const recommendListingsFlow = ai.defineFlow(
  {
    name: 'recommendListingsFlow',
    inputSchema: RecommendListingsInputSchema,
    outputSchema: RecommendListingsOutputSchema,
  },
  async (input) => {
    const allListings = await getListings();
    const availableListings = allListings.filter(l => l.id !== input.currentListingId);
    
    const prompt = ai.definePrompt({
      name: 'recommendListingsPrompt',
      input: {schema: RecommendListingsInputSchema},
      output: {schema: RecommendListingsOutputSchema},
      prompt: `You are an expert rental recommendation agent.

      Your task is to find up to 3 properties from the provided list of available properties that are a good match for the user, based on their preferences and the property they are currently viewing.

      **User Preferences:** {{{userPreferences}}}
      **Search History / Current Context:** {{{searchHistory}}}

      **IMPORTANT:** The user is currently viewing the property with ID {{{currentListingId}}}. Do NOT include this property in your recommendations.

      Here is the full list of available properties you can choose from. Only use properties from this list:
      ---
      ${JSON.stringify(availableListings.map(l => ({ id: l.id, title: l.title, description: l.description, price: l.price, location: l.location, amenities: l.amenities })))}
      ---

      Analyze the user's information and select the three best-matching properties from the list above. For each recommendation, provide a brief reason. Return them as a structured array.
      `,
    });

    const {output} = await prompt(input);
    return output!;
  }
);
