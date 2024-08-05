import { PrismaClient, suggestions } from "@prisma/client";
import { Mood } from "../models/enums/mood.enum";
import omit from "lodash.omit";

export type suggestionByMood = {
  id: number;
  title: string;
  rank: number;
  execution_date: Date;
};

export const getSuggestionsByEventId = async (
  prisma: PrismaClient,
  eventId: number
): Promise<
  Pick<suggestions, "id" | "content" | "execution_date" | "rank" | "title">[]
> =>
  (
    await prisma.suggestions.findMany({
      where: {
        event_id: eventId,
      },
    })
  ).map((suggestion) => omit(suggestion, "event_id"));

export const saveNewSuggestion = async (
  prisma: PrismaClient,
  suggestion: string,
  eventId: number
) =>
  prisma.suggestions.create({
    data: {
      content: suggestion,
      title: "", // TODO: Do we need the title?
      event_id: eventId,
    },
  });

export const updateSuggestion = async (
  prisma: PrismaClient,
  suggestionId: number,
  data: {
    execution_date?: Date;
    rank?: number;
  }
) =>
  prisma.suggestions.update({
    data,
    where: {
      id: suggestionId,
    },
  });

export const getSuggestion = async (
  prisma: PrismaClient,
  suggestionId: number,
  options?: {
    withEvent: boolean;
  }
) =>
  prisma.suggestions.findUnique({
    where: {
      id: suggestionId,
    },
    include: {
      event: options?.withEvent,
    },
  });

export const getSuggestionsByUserMoodFromDB = async (
  prisma: PrismaClient,
  userId: number,
  userMood: Mood
): Promise<suggestionByMood[]> => {
  try {
    const suggestions = await prisma.suggestions.findMany({
      where: {
        event: {
          user_id: userId,
          mood: userMood,
        },
      },
      select: {
        id: true,
        title: true,
        rank: true,
        execution_date: true,
      },
    });

    return suggestions;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
