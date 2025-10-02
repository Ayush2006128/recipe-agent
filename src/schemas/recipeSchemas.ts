import { z } from "genkit";

export const inputSchema = z.object({
  ingredient: z.string().describe("Main ingredient for the recipe."),
  restrictions: z.string().optional().describe("Dietary restrictions for recipe."),
});

export const outputSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  ingredients: z.array(z.string()),
  instrictions: z.array(z.string()),
  tips: z.array(z.string().optional()),
});
