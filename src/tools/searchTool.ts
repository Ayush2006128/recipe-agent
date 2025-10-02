import { z } from "zod";
import ai from "../genkit.ts";
import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY || "",
});

const searchTool = ai.defineTool({
  name: "searchTool",
  description: "A tool to search the web for relevant information.",
  inputSchema: z.object({
    query: z.string().describe("The search query."),
    numResults: z.number().describe("Number of search results to return.").default(3).optional(),
  }),
  outputSchema: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      content: z.string(),
    })
  ),
}, async (input) => {
  const results = await tvly.search(input.query, {
    max_results: input.numResults ?? 3,
  });
  
  return results.results.map(result => ({
    title: result.title,
    url: result.url,
    content: result.content,
  }));
});

export default searchTool;
