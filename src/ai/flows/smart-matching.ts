'use server';
/**
 * @fileOverview Implements smart matching of blood donors and hospital requests.
 *
 * - smartMatching - A function that matches donors to requests based on location, blood type, and other criteria.
 * - SmartMatchingInput - The input type for the smartMatching function.
 * - SmartMatchingOutput - The return type for the smartMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartMatchingInputSchema = z.object({
  hospitalLocation: z.string().describe('The location of the hospital making the request (City, State or ZIP)'),
  bloodGroupNeeded: z.string().describe('The blood group needed for the request (e.g., A+, O-)'),
  component: z.string().describe('The blood component needed (e.g., Whole Blood, PRBC)'),
  urgencyLevel: z.string().describe('The urgency level of the request (Routine, Urgent, Emergency)'),
  donorLocation: z.string().describe('The location of the donor (City, State or ZIP)'),
  donorBloodGroup: z.string().describe('The blood group of the donor.'),
  donorLastDonation: z.string().optional().describe('The last donation date of the donor (YYYY-MM-DD). Leave blank if never donated before.'),
});
export type SmartMatchingInput = z.infer<typeof SmartMatchingInputSchema>;

const SmartMatchingOutputSchema = z.object({
  isMatch: z.boolean().describe('Whether the donor is a suitable match for the request.'),
  reason: z.string().describe('The reason for the match or non-match.'),
});
export type SmartMatchingOutput = z.infer<typeof SmartMatchingOutputSchema>;

export async function smartMatching(input: SmartMatchingInput): Promise<SmartMatchingOutput> {
  return smartMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartMatchingPrompt',
  input: {schema: SmartMatchingInputSchema},
  output: {schema: SmartMatchingOutputSchema},
  prompt: `You are an AI assistant designed to determine if a blood donor is a suitable match for a hospital's blood request.

  Consider the following factors:
  - **Blood Group Compatibility:** The donor's blood group must be compatible with the requested blood group.
  - **Location:** The donor should be located near the hospital (same city or nearby).
  - **Urgency:** Take into account the urgency level of the request.  If it is routine, be more strict with location.
  - **Last Donation Date:**  If the donor has donated recently (within the last 2 months), they may not be eligible.

  Given the following information about the hospital request and the potential donor, determine if the donor is a suitable match and provide a reason for your determination.  Focus on safety and efficiency, only recommending the donor if there is a clear and present need.

Hospital Location: {{{hospitalLocation}}}
Blood Group Needed: {{{bloodGroupNeeded}}}
Component: {{{component}}}
Urgency Level: {{{urgencyLevel}}}

Donor Location: {{{donorLocation}}}
Donor Blood Group: {{{donorBloodGroup}}}
Donor Last Donation Date: {{{donorLastDonation}}}

Respond with a JSON object that indicates whether the donor is a match (isMatch: true/false) and provides a detailed reason for your decision.
`,
});

const smartMatchingFlow = ai.defineFlow(
  {
    name: 'smartMatchingFlow',
    inputSchema: SmartMatchingInputSchema,
    outputSchema: SmartMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
