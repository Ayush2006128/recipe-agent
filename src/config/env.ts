import { config } from "dotenv";
import { z } from "zod";

config();

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string().transform((v) => Number(v)).pipe(z.number().int().positive()).default("8080" as unknown as any),
  GOOGLE_API_KEY: z.string().min(1, "GOOGLE_API_KEY is required"),
  TAVILY_API_KEY: z.string().min(1, "TAVILY_API_KEY is required"),
  LOG_LEVEL: z.string().optional(),
});

const parsed = EnvSchema.safeParse(process.env);

export type AppEnv = {
  NODE_ENV: string;
  PORT: number;
  GOOGLE_API_KEY: string;
  TAVILY_API_KEY: string;
  LOG_LEVEL?: string;
};

if (!parsed.success) {
  // Don't throw at import-time in dev; export a partial and let readiness handle it.
  // Still expose values (may be undefined) so server can start for non-critical flows.
}

export const env: AppEnv = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 8080),
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  TAVILY_API_KEY: process.env.TAVILY_API_KEY || "",
  LOG_LEVEL: process.env.LOG_LEVEL,
};

export default env;


