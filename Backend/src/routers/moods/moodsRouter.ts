import { Router } from "express";
import { getMoodsCalendarHandler } from "./routes/getEvents/handler";
import { authorizeUser } from "../../middleware/auth";

export const buildMoodsRouter = () => {
  const router = Router();

  // TODO: add authorizeUser middleware
  router.get("/calendar", getMoodsCalendarHandler);

  return router;
};
