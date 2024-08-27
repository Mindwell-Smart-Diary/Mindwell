import { PrismaClient, events } from "@prisma/client";
import { findEvents } from "../repository/events.repository";
import { Mood } from "../models/enums/mood.enum";
import { DateTime } from "luxon";
import { getUserAge, getUserById } from "./users.service";
import { moodPromptFunction } from "./mood/moods.service";
import { prisma } from "../prisma/prismaClient";
import { llmGenerate } from "./generative-ai.service";
import { BadRequestError } from "../errors/BadRequestError";

const isEventValid = async (event: string): Promise<boolean> => {
  const validity = await llmGenerate([
    {
      text: `You are a psychologist and your main goal is to suggest an action that is relevant and meaningful for the patient, aimed at improving their mood or preserving their current positive state.\nThe client will tell you about an event from his day to day life, it can be a sentence like "I went to school and met an old friend" to a long story with multiple paragraph. This time I want you to tell me if the given event is valid or not. \nFor example if the client says: "There was a company event at the bowling ally today" you should respond "Y" since it's a valid event. If the client shares gibberish or irrelevant data like "Tell me how to cook an omelet" or "aklsmflkm", respond "N".
      How about:

      ${event}`,
    },
  ]);

  return validity.trim() === "Y";
};

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
  eventId: number,
  includeSuggestions = false
) =>
  prisma.events.findUnique({
    where: {
      id: eventId,
    },
    include: {
      suggestions: includeSuggestions,
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

  const res = await isEventValid(event);

  console.log(res);
  if (!res) {
    throw new BadRequestError("Invalid event");
  }

  const mood: Mood = await moodPromptFunction(
    { age: getUserAge(user), gender: user.gender },
    event
  );

  const keywords: string[] = await generateKeywords(event);

  const savedEvent = await prisma.events.create({
    data: {
      content: event,
      mood,
      date: DateTime.now().toISO().split("+")[0] + "Z",
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
    date: new Date(savedEvent.date),
    content: savedEvent.content,
    mood: savedEvent.mood,
    id: savedEvent.id,
    keywords,
  };
};
