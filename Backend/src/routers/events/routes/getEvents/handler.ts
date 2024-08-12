import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../../middleware/auth";
import { queryParamsSchema } from "./schema";
import { validateData } from "../../../../middleware/zodValidate";
import { getEvents } from "../../../../services/events.service";
import { prisma } from "../../../../prisma/prismaClient";

export const getEventsHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  console.log("req.query.withSuggestions: "+ req.query.withSuggestions)
  console.log("userId: "+ userId)
  try {
    const options = validateData(
      queryParamsSchema,
      {
        withSuggestions: req.query.withSuggestions === "true",
        date: isNaN(Number(req.query.date))
          ? req.query.date
          : Number(req.query.date),
      },
      "Invalid query params"
    );

    console.log(options);
    const events = await getEvents(prisma, userId, {
      date: options.date,
      withSuggestions: options.withSuggestions,
    });

    res.json(events);
  } catch (e) {
    next(e);
  }
};
