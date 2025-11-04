import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err?.status ?? 500;
  const code = err?.code ?? (status === 400 ? "BAD_REQUEST" : status === 502 ? "UPSTREAM_FAILURE" : "INTERNAL_ERROR");
  const message = err?.message ?? "Internal Server Error";
  const details = err?.details;

  res.status(status).json({ error: { message, code, details } });
};


