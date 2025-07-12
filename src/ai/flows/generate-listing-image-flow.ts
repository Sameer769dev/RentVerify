
'use server';
/**
 * @fileOverview Generates a property image based on a description.
 *
 * - generateListingImage - A function that handles image generation.
 * - GenerateListingImageInput - The input type for the function.
 * - GenerateListingImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateListingImageInputSchema = z.object({
  description: z.string().describe("A detailed description of the property, including style, key features, and setting."),
});
export type GenerateListingImageInput = z.infer<typeof GenerateListingImageInputSchema>;

const GenerateListingImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI, including MIME type and Base64 encoding. Format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateListingImageOutput = z.infer<typeof GenerateListingImageOutputSchema>;

export async function generateListingImage(input: GenerateListingImageInput): Promise<GenerateListingImageOutput> {
  return generateListingImageFlow(input);
}

const generateListingImageFlow = ai.defineFlow(
  {
    name: 'generateListingImageFlow',
    inputSchema: GenerateListingImageInputSchema,
    outputSchema: GenerateListingImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a photorealistic image of the interior or exterior of a rental property. The image should look like a professional real estate photograph. Do not include any people or text in the image.

        Property description: "${input.description}"`,
        config: {
            responseModalities: ['IMAGE', 'TEXT'],
        },
    });

    if (!media.url) {
        throw new Error('Image generation failed to return a data URI.');
    }

    return {
      imageDataUri: media.url,
    };
  }
);
