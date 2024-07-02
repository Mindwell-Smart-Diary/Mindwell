import { Mood } from "../../../../models/enums/mood.enum";
import { moodPromptFunction } from "../../../../services/mood.service";
import { suggestionPromptFunction } from "../../../../services/suggestion.service";
import { getSuggestionsByUserMood } from "../../../../services/suggestions.service";
import { prisma } from "../../prisma/prismaClient";
import { Request, Response } from "express";
import { suggestionSchema } from "./schema";

export const generateSuggestionHandler = async (
  req: Request,
  res: Response
) => {
  const { userId, dailySharing } = suggestionSchema.parse(req.body);

  const userInformation: {
    age: number;
    gender: string;
  } = null; // getUserInfo(id)

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
};
