import { NextFunction, Request, Response } from "express";
import { queryParamsSchema } from "./schema";
import { AuthRequest } from "../../../../middleware/auth";
import { validateData } from "../../../../middleware/zodValidate";
import { prisma } from "../../../../prisma/prismaClient";
import { getMoodsByMonth } from "../../../../services/mood/moods.service";
import { USER_ID } from "../../moodRouterTestData";

export const getMoodsCalendarHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = { userId: USER_ID }; // req.user;

  try {
    const data = validateData(
      queryParamsSchema,
      {
        year: isNaN(Number(req.query.year))
          ? req.query.year
          : Number(req.query.year),
        month: isNaN(Number(req.query.month))
          ? req.query.month
          : Number(req.query.month),
      },
      "Invalid query params"
    );

    const events = await getMoodsByMonth(prisma, userId, data.month, data.year);

    res.json(events);
  } catch (e) {
    next(e);
  }
};
