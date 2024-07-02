import { Router } from "express";
import { validateData } from "../../middleware/zodValidate";
import { suggestionSchema } from "./routes/genrateSuggestion/schema";
import { generateSuggestionHandler } from "./routes/genrateSuggestion/handler";

export const buildSuggestionRouter = () => {
  const router = Router();

  router.post(
    "/suggestions",
    validateData(suggestionSchema),
    generateSuggestionHandler
  );

  return router;
};
