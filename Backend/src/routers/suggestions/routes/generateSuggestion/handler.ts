import { Mood } from "../../../../models/enums/mood.enum";
import { prisma } from "../../../../prisma/prismaClient";
import { NextFunction, Response } from "express";
import { suggestionSchema } from "./schema";
import { getUserAge, getUserById } from "../../../../services/users.service";
import {
  getSuggestionsByUserMood,
  suggestionPromptFunction,
} from "../../../../services/suggestions/suggestions.service";
import { getEventById } from "../../../../services/events.service";
import { AuthRequest } from "../../../../middleware/auth";
import { NotFoundError } from "../../../../errors/NotFoundError";
import { saveNewSuggestion } from "../../../../repository/suggestions.repository";

export const generateSuggestionHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;
  const { eventId } = suggestionSchema.parse(req.body);

  try {
    const event = await getEventById(prisma, eventId, true);

    if (!event || event.user_id !== userId) {
      throw new NotFoundError("Cannot find event");
    }

    const { mood, content: eventContent } = event;

    const historyByMood = await getSuggestionsByUserMood(
      prisma,
      userId,
      mood as Mood
    );

    const user = await getUserById(prisma, userId);

    const suggestion = await suggestionPromptFunction(
      { age: getUserAge(user), gender: user.gender },
      eventContent,
      mood as Mood,
      historyByMood.filter(({ rank }) => rank >= 2).map(({ title }) => title),
      historyByMood.filter(({ rank }) => rank === 1).map(({ title }) => title),
      event.suggestions.map((suggestion) => suggestion.content)
    );

    await saveNewSuggestion(prisma, suggestion, event.id);

    res.json({ suggestion });
  } catch (e) {
    next(e);
  }
};
