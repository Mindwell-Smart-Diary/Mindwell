import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../../middleware/auth";

import { prisma } from "../../../../prisma/prismaClient";
import { NotFoundError } from "../../../../errors/NotFoundError";

export const getEventsByIdHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  try {
    const event = await prisma.events.findUnique({
      where: {
        user_id: userId,
        id: Number(req.params.id),
      },
      select: {
        content: true,
        date: true,
        mood: true,
        keywords: true,
      },
    });

    if (!event) {
      throw new NotFoundError("Could not find requested event");
    }

    res.json(event);
  } catch (e) {
    next(e);
  }
};
