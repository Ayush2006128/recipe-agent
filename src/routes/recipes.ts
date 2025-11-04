import { Router } from "express";
import { validateBody } from "../middleware/validate.ts";
import recipeFlow from "../flows/recipeFlow.ts";
import { inputSchema } from "../schemas/recipeSchemas.ts";
import type { RecipeFlowInput } from "../types/recipeTypes.ts";

const router = Router();

router.post("/v1/recipes", validateBody(inputSchema as unknown as any), async (req, res, next) => {
  try {
    const body = (req as any).validatedBody as RecipeFlowInput;
    const result = await recipeFlow(body);
    res.status(200).json(result);
  } catch (err) {
    next({ status: 502, code: "UPSTREAM_FAILURE", message: (err as Error).message, details: err });
  }
});

export default router;


