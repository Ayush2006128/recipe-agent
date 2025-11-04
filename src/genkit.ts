import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { config } from "dotenv";

// Load .env early
config();

export const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.5-pro", { temperature: 0.7 }),
});

export default ai;
