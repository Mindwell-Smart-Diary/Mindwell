import { Mood } from "../../../../models/enums/mood.enum";
import { moodPromptFunction } from "../../../../services/mood/moods.service";
import { prisma } from "../../../../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";
import { suggestionSchema } from "./schema";
import { getUserAge, getUserById } from "../../../../services/users.service";
import {
  getSuggestionsByUserMood,
  suggestionPromptFunction,
} from "../../../../services/suggestions/suggestions.service";

// TODO: remove user id from the body and take it from the cookie
export const generateSuggestionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, dailySharing } = suggestionSchema.parse(req.body);

  try {
    const user = await getUserById(prisma, userId);

    const userInformation: {
      age: number;
      gender: string;
    } = { age: getUserAge(user), gender: "male" }; // TODO: Add "gender" to users schema and exrtract it from user const

    const mood: Mood = await moodPromptFunction(userInformation, dailySharing);

    const historyByMood = await getSuggestionsByUserMood(prisma, userId, mood);

    const suggestion = await suggestionPromptFunction(
      userInformation,
      dailySharing,
      mood,
      historyByMood.filter(({ rank }) => rank >= 2).map(({ title }) => title),
      historyByMood.filter(({ rank }) => rank === 1).map(({ title }) => title)
    );

    res.json({ mood, suggestion });
  } catch (e) {
    next(e);
  }
};
