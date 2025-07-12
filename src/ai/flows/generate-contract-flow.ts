
'use server';
/**
 * @fileOverview Generates a legal rental agreement based on provided details.
 *
 * - generateContract - A function that handles the contract generation process.
 * - GenerateContractInput - The input type for the generateContract function.
 * - GenerateContractOutput - The return type for the generateContract function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContractInputSchema = z.object({
  landlordName: z.string().describe("The full name of the landlord."),
  tenantName: z.string().describe("The full name of the tenant."),
  propertyAddress: z.string().describe("The full address of the rental property."),
  rentAmount: z.coerce.number().describe("The monthly rent amount."),
  leaseStartDate: z.string().describe("The start date of the lease (YYYY-MM-DD)."),
  leaseEndDate: z.string().describe("The end date of the lease (YYYY-MM-DD)."),
  contractType: z.string().describe("The type of contract being generated (e.g., Standard Residential Lease).")
});
export type GenerateContractInput = z.infer<typeof GenerateContractInputSchema>;

const GenerateContractOutputSchema = z.object({
  contractText: z.string().describe('The full, legally-formatted rental agreement text in Markdown format.'),
});
export type GenerateContractOutput = z.infer<typeof GenerateContractOutputSchema>;

export async function generateContract(input: GenerateContractInput): Promise<GenerateContractOutput> {
  return generateContractFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContractPrompt',
  input: {schema: GenerateContractInputSchema},
  output: {schema: GenerateContractOutputSchema},
  prompt: `You are a legal assistant specializing in real estate law. Your task is to generate a comprehensive "{{contractType}}" based on the following details. The contract should be clear, legally sound, and formatted in Markdown.

  **Contract Details:**
  - **Landlord (Lessor):** {{{landlordName}}}
  - **Tenant (Lessee):** {{{tenantName}}}
  - **Property Address:** {{{propertyAddress}}}
  - **Monthly Rent:** \${{{rentAmount}}}
  - **Lease Start Date:** {{{leaseStartDate}}}
  - **Lease End Date:** {{{leaseEndDate}}}

  **Instructions:**
  1.  Generate a complete rental agreement document.
  2.  The tone should be formal and professional.
  3.  Include standard clauses such as:
      - Parties Involved
      - Property Description
      - Lease Term
      - Rent Payment (amount, due date, late fees)
      - Security Deposit
      - Use of Premises
      - Maintenance and Repairs
      - Utilities
      - Entry by Landlord
      - Default
      - Governing Law
      - Signatures section for both Landlord and Tenant with date lines.
  4.  Ensure all placeholders are filled with the provided information.
  5.  The final output must be a single string of Markdown text. Do not include any introductory text, just the contract itself.
  `,
});

const generateContractFlow = ai.defineFlow(
  {
    name: 'generateContractFlow',
    inputSchema: GenerateContractInputSchema,
    outputSchema: GenerateContractOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
