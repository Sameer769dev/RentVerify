
'use server';
/**
 * @fileOverview A Know Your Customer (KYC) AI agent.
 *
 * - verifyKyc - A function that handles the KYC verification process.
 * - KycInput - The input type for the verifyKyc function.
 * - KycOutput - The return type for the verifyKyc function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KycInputSchema = z.object({
  firstName: z.string().describe('The first name of the user.'),
  lastName: z.string().describe('The last name of the user.'),
  address: z.string().describe('The full address of the user.'),
  documentType: z.enum(['passport', 'drivers_license', 'national_id']).describe('The type of document being submitted.'),
  documentFrontPhotoDataUri: z
    .string()
    .describe(
      "A photo of the front of the user's identification document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentBackPhotoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the back of the user's identification document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. This may not be present for all document types (e.g., passport)."
    ),
});
export type KycInput = z.infer<typeof KycInputSchema>;

const KycOutputSchema = z.object({
  isVerified: z.boolean().describe('Whether the KYC verification was successful.'),
  reason: z.string().describe('The reason for the verification status.'),
  extractedData: z.object({
    firstName: z.string().optional().describe('The first name extracted from the document.'),
    lastName: z.string().optional().describe('The last name extracted from the document.'),
    address: z.string().optional().describe('The address extracted from the document.'),
    documentNumber: z.string().optional().describe('The document number extracted from the document.'),
    dateOfBirth: z.string().optional().describe('The date of birth extracted from the document (YYYY-MM-DD).'),
    expirationDate: z.string().optional().describe('The expiration date of the document (YYYY-MM-DD).'),
  }).optional().describe('The data extracted from the document.'),
});
export type KycOutput = z.infer<typeof KycOutputSchema>;

export async function verifyKyc(input: KycInput): Promise<KycOutput> {
  return kycFlow(input);
}

const prompt = ai.definePrompt({
  name: 'kycPrompt',
  input: {schema: KycInputSchema},
  output: {schema: KycOutputSchema},
  prompt: `You are a highly advanced KYC verification agent. Your task is to analyze the provided user information and the image(s) of their identification document to verify their identity.

  User Provided Information:
  - Name: {{{firstName}}} {{{lastName}}}
  - Address: {{{address}}}
  - Document Type: {{{documentType}}}

  Document Images:
  - Front: {{media url=documentFrontPhotoDataUri}}
  {{#if documentBackPhotoDataUri}}- Back: {{media url=documentBackPhotoDataUri}}{{/if}}

  Please perform the following steps:
  1.  Carefully analyze the document images (front and back, if provided) to determine authenticity. Look for signs of tampering, low quality, or if it's not a real ID document.
  2.  Extract the following information from the document(s): First Name, Last Name, Address, Document Number, Date of Birth, and Expiration Date. Information may be split between the front and back.
  3.  Compare the extracted information with the user-provided information.
  4.  Determine if the verification is successful based on the following criteria:
      - The document appears authentic.
      - The name on the document closely matches the user-provided name.
      - The document is not expired.
  5.  Set 'isVerified' to true if all criteria are met, otherwise set it to false.
  6.  Provide a clear 'reason' for your decision. If verified, state what was successfully verified. If not, explain the exact reason for failure (e.g., "Document is expired", "Name mismatch", "Image is blurry or appears to be a screenshot").
  7.  Fill the 'extractedData' object with the information you extracted from the document.
  `,
});

const kycFlow = ai.defineFlow(
  {
    name: 'kycFlow',
    inputSchema: KycInputSchema,
    outputSchema: KycOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
