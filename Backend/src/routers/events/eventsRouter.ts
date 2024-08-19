import { Router } from "express";
import { getEventsHandler } from "./routes/getEvents/handler";
import { saveNewEvent } from "./routes/saveEvent/handler";
import { validateDataMiddleware } from "../../middleware/zodValidate";
import { createEventSchema } from "./routes/saveEvent/schema";
import { getEventSuggestionsHandler } from "./routes/getEventSuggestions/handler";
import { getKeywords } from "./routes/getEventsByKeywords/handler";

export const buildEventsRouter = () => {
  const router = Router();

  router.get("/", getEventsHandler);
  router.post("/", validateDataMiddleware(createEventSchema), saveNewEvent);
  router.get("/:id/suggestions", getEventSuggestionsHandler);
  router.get("/keywords", getKeywords);

  return router;
};
