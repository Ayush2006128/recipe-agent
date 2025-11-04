import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import router from "./routes/recipes.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import logger from "./logging/logger.ts";
import { config } from "dotenv";

// Load env early
config();

const app = express();

// Security and parsing
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Logging
app.use(
  pinoHttp({
    logger,
    customProps: () => ({ service: "recipe-agent" }),
  })
);

// Basic rate limiting (no auth)
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Routes
app.use(router);

// Health endpoints (simple versions; readiness expanded later)
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/readyz", (_req, res) => {
  const missing: string[] = [];
  if (!process.env.GOOGLE_API_KEY) missing.push("GOOGLE_API_KEY");
  if (!process.env.TAVILY_API_KEY) missing.push("TAVILY_API_KEY");
  if (missing.length) {
    return res.status(503).json({ status: "not ready", missing });
  }
  return res.status(200).json({ status: "ready" });
});

// Errors
app.use(errorHandler);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  logger.info({ port }, "Server started");
});

export default app;


