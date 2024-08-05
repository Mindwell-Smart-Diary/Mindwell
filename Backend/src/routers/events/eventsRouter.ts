import { Router } from "express";
import { getEventsHandler } from "./routes/getEvents/handler";

export const buildEventsRouter = () => {
  const router = Router();

  // TODO: add authorizeUser middleware
  router.get("/", getEventsHandler);

  return router;
};
