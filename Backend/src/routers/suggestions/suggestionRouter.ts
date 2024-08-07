import { Router } from "express";
import { validateDataMiddleware } from "../../middleware/zodValidate";
import { suggestionSchema } from "./routes/generateSuggestion/schema";
import { generateSuggestionHandler } from "./routes/generateSuggestion/handler";
import { suggestionPatchSchema } from "./routes/patchSuggestion/schema";
import { patchSuggestionHandler } from "./routes/patchSuggestion/handler";

export const buildSuggestionRouter = () => {
  const router = Router();

  router.post(
    "/",
    validateDataMiddleware(suggestionSchema),
    generateSuggestionHandler
  );
  router.patch(
    "/:id",
    validateDataMiddleware(suggestionPatchSchema),
    patchSuggestionHandler
  );

  return router;
};
