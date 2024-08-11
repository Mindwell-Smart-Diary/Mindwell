import { PrismaClient, events } from "@prisma/client";
import { findEvents } from "../repository/events.repository";
import { Mood } from "../models/enums/mood.enum";
import { DateTime } from "luxon";
import { getUserAge, getUserById } from "./users.service";
import { moodPromptFunction } from "./mood/moods.service";
import { prisma } from "../prisma/prismaClient";
import { llmGenerate } from "./generative-ai.service";

const generateKeywords = async (event: string): Promise<string[]> => {
  const response = await llmGenerate([
    {
      text: `Generate 3-5 keywords for the given event so we can later filter by them.
        Try to generate general keywords and don't be too specific and if you can only one word per keyword.
        For example for this event: "I went to play basketball with my friends and it was a great game, it was very close but at the end we won", You can generate those keywords: sports, basketball, friends, happy, exciting.
        I want you to respond only with the keywords separated by commas. 
        
        Please generate keywords for this event:
        ${event}
        `,
    },
  ]);

  return response.split(",").map((keyword) => keyword.trim());
};

export const getKeywordsByPrefix = async (
  userId: number,
  prefix: string
): Promise<string[]> => {
  return (
    await prisma.event_keywords.findMany({
      where: {
        keyword: {
          startsWith: prefix,
        },
        event: {
          user_id: userId,
        },
      },
    })
  ).map(({ keyword }) => keyword);
};

export const getEventById = async (
  prisma: PrismaClient,
  eventId: number
): Promise<events> =>
  prisma.events.findUnique({
    where: {
      id: eventId,
    },
  });

export const getEvents = async (
  prisma: PrismaClient,
  userId: number,
  options: { date?: number; withSuggestions?: boolean; keywords?: string[] }
) => {
  const { date, withSuggestions, keywords } = options;
  const findOptions: any = {};

  if (withSuggestions) {
    findOptions.withSuggestions = true;
  }

  if (keywords) {
    findOptions.keywords = keywords;
  }

  if (date) {
    const startDate =
      DateTime.fromMillis(date).startOf("day").toString().split("+")[0] + "Z";
    const endDate =
      DateTime.fromMillis(date)
        .plus({ day: 1 })
        .startOf("day")
        .toString()
        .split("+")[0] + "Z";

    findOptions.dates = {
      startDate,
      endDate,
    };
  }

  const matchingEvents: events[] = await findEvents(
    prisma,
    userId,
    findOptions
  );

  return matchingEvents;
};

export const saveEvent = async (
  event: string,
  userId: number
): Promise<
  Pick<events, "content" | "mood" | "date" | "id"> & { keywords: string[] }
> => {
  const user = await getUserById(prisma, userId);
  const mood: Mood = await moodPromptFunction(
    { age: getUserAge(user), gender: user.gender },
    event
  );

  const keywords: string[] = await generateKeywords(event);

  const savedEvent = await prisma.events.create({
    data: {
      content: event,
      mood,
      date: new Date(),
      user_id: userId,
    },
  });

  await prisma.event_keywords.createMany({
    data: keywords.map((keyword) => ({
      keyword,
      event_id: savedEvent.id,
    })),
  });

  return {
    date: savedEvent.date,
    content: savedEvent.content,
    mood: savedEvent.mood,
    id: savedEvent.id,
    keywords,
  };
};
