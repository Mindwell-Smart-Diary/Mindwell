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
  const { userId } = req.user;

  try {
    const options = validateData(
      queryParamsSchema,
      {
        date: isNaN(Number(req.query.date))
          ? req.query.date
          : Number(req.query.date),
      },
      "Invalid query params"
    );

    const events = await getEvents(prisma, userId, {
      date: options.date,
    });

    res.json(events);
  } catch (e) {
    next(e);
  }
};
