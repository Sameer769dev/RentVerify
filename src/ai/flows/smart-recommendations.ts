
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
import { listings } from '@/lib/mock-data';
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

const ListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    country: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  images: z.array(z.string()),
  beds: z.number(),
  baths: z.number(),
  amenities: z.array(z.string()),
  verified: z.boolean(),
  type: z.enum(['House', 'Flat', 'Room']),
});

const RecommendListingsOutputSchema = z.object({
  recommendations: z
    .array(ListingSchema)
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
  async input => {
    const availableListings = listings.filter(l => l.id !== input.currentListingId);
    
    const prompt = ai.definePrompt({
      name: 'recommendListingsPrompt',
      input: {schema: RecommendListingsInputSchema},
      output: {schema: RecommendListingsOutputSchema},
      prompt: `You are an expert rental recommendation agent.

      Your task is to find up to 3 properties from the provided list of available properties that are a good match for the user, based on their preferences and the property they are currently viewing.

      **User Preferences:** {{{userPreferences}}}
      **Search History / Current Context:** {{{searchHistory}}}

      **IMPORTANT:** The user is currently viewing the property with ID {{{currentListingId}}}. Do NOT include this property in your recommendations.

      Here is the full list of available properties you can choose from:
      ---
      ${JSON.stringify(availableListings)}
      ---

      Analyze the user's information and select the three best-matching properties from the list above. Return them as a structured array.
      `,
    });

    const {output} = await prompt(input);
    return output!;
  }
);
