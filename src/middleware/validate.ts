import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";

// Accept either zod or genkit's zod-compatible schemas
export function validateBody<T>(schema: ZodSchema<T>): RequestHandler {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req.body);
      // attach parsed data for handlers
      (req as any).validatedBody = parsed;
      next();
    } catch (err) {
      next({ status: 400, code: "BAD_REQUEST", message: "Invalid request body", details: err });
    }
  };
}


