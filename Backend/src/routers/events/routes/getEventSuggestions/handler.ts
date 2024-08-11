import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../../middleware/auth";
import { getEventById } from "../../../../services/events.service";
import { prisma } from "../../../../prisma/prismaClient";
import { NotFoundError } from "../../../../errors/NotFoundError";
import { getSuggestionsByEventId } from "../../../../repository/suggestions.repository";

export const getEventSuggestionsHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  try {
    const event = await getEventById(prisma, Number(req.params.id));

    if (!event || event.user_id !== userId) {
      throw new NotFoundError("Event not found");
    }

    const suggestions = await getSuggestionsByEventId(prisma, event.id);

    res.json(suggestions);
  } catch (e) {
    next(e);
  }
};
