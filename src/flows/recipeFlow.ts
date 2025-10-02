import ai from "../genkit.ts";
import { inputSchema, outputSchema } from "../schemas/recipeSchemas.ts";
import searchTool from "../tools/searchTool.ts";
import type { RecipeFlowInput, RecipeFlowOutput } from "../types/recipeTypes.ts";

export const recipeFlow = ai.defineFlow(
  {
    name: "recipeFlow",
    inputSchema: inputSchema,
    outputSchema: outputSchema,
  },

  async (input: RecipeFlowInput): Promise<RecipeFlowOutput> => {
    const prompt = `
    Create a tasty and healthy recipe with following info.
      Main ingredient: ${input.ingredient},
      Dietary restrictions: ${input.restrictions || "none"}.
    You can use the web search tool to gather more information about the ingredient and dietary restrictions.
    `;

    const { output }: { output: RecipeFlowOutput | null } = await ai.generate({
      prompt,
      output: { schema: outputSchema },
      tools: [searchTool],
    });

    if (!output) throw new Error("Something went wrong!");

    return output;
  },
);

export default recipeFlow;
