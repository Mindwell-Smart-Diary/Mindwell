import { Router } from "express";
import { getEventsHandler } from "./routes/getEvents/handler";
import { authorizeUser } from "../../middleware/auth";

export const buildEventsRouter = () => {
  const router = Router();

  // TODO: add authorizeUser middleware
  router.get("/events", getEventsHandler);

  return router;
};
