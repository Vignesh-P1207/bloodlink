// donation-scheduling.ts
'use server';

/**
 * @fileOverview A flow for generating personalized donation reminders for blood donors.
 *
 * This file exports:
 * - `generateDonationReminder` - An async function that takes donor information and returns a personalized donation reminder message.
 * - `DonationReminderInput` - The input type for the `generateDonationReminder` function.
 * - `DonationReminderOutput` - The output type for the `generateDonationReminder` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DonationReminderInputSchema = z.object({
  donorName: z.string().describe('The name of the donor.'),
  bloodGroup: z.string().describe('The blood group of the donor.'),
  lastDonationDate: z.string().optional().describe('The last donation date of the donor (YYYY-MM-DD). Optional if the donor has never donated before.'),
  timeSinceLastDonation: z.string().describe("The time passed since the donor's last donation. Should be human readable with units, e.g. '3 months'."),
  location: z.string().describe('The location of the donor.'),
});
export type DonationReminderInput = z.infer<typeof DonationReminderInputSchema>;

const DonationReminderOutputSchema = z.object({
  reminderMessage: z.string().describe('A personalized reminder message for the donor.'),
});
export type DonationReminderOutput = z.infer<typeof DonationReminderOutputSchema>;

export async function generateDonationReminder(input: DonationReminderInput): Promise<DonationReminderOutput> {
  return donationReminderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'donationReminderPrompt',
  input: {schema: DonationReminderInputSchema},
  output: {schema: DonationReminderOutputSchema},
  prompt: `You are a helpful assistant that crafts personalized blood donation reminder messages.

  Consider the donor's name, blood group, location, and last donation date when creating the message.
  Encourage regular donations and highlight the impact of their contribution.
  If the donor has never donated before, encourage them to donate for the first time.

  Donor Name: {{{donorName}}}
  Blood Group: {{{bloodGroup}}}
  Last Donation Date: {{{lastDonationDate}}}
  Time Since Last Donation: {{{timeSinceLastDonation}}}
  Location: {{{location}}}

  Reminder Message:`, // Ensure a complete sentence/message is returned
});

const donationReminderFlow = ai.defineFlow(
  {
    name: 'donationReminderFlow',
    inputSchema: DonationReminderInputSchema,
    outputSchema: DonationReminderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
