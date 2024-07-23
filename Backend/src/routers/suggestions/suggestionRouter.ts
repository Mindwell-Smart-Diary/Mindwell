import { Router } from "express";
import { validateDataMiddleware } from "../../middleware/zodValidate";
import { suggestionSchema } from "./routes/genrateSuggestion/schema";
import { generateSuggestionHandler } from "./routes/genrateSuggestion/handler";

export const buildSuggestionRouter = () => {
  const router = Router();

  router.post(
    "/suggestions",
    validateDataMiddleware(suggestionSchema),
    generateSuggestionHandler
  );

  return router;
};
