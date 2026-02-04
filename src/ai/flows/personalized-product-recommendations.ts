'use server';

/**
 * @fileOverview Personalized product recommendations based on browsing history and purchase patterns.
 *
 * - getPersonalizedRecommendations - A function that retrieves personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  browsingHistory: z.array(z.string()).describe('The user\'s browsing history (list of product IDs).'),
  purchaseHistory: z.array(z.string()).describe('The user\'s purchase history (list of product IDs).'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedProductIds: z
    .array(z.string())
    .describe('A list of product IDs recommended for the user.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce recommendation engine. Given a user's ID, browsing history, and purchase history, you will recommend a list of products that the user is likely to be interested in.

User ID: {{{userId}}}
Browsing History: {{#if browsingHistory}}{{#each browsingHistory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}
Purchase History: {{#if purchaseHistory}}{{#each purchaseHistory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}

Based on this information, recommend a list of product IDs that the user is likely to be interested in.  Return ONLY the product IDs, comma separated.
`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    //split the comma seperated list of products into an array.
    const recommendedProductIds = output!.recommendedProductIds;
    return {
      recommendedProductIds: recommendedProductIds,
    };
  }
);
