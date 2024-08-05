import { PrismaClient, events } from "@prisma/client";
import { findEvents } from "../repository/events.repository";
import { Mood } from "../models/enums/mood.enum";
import { DateTime } from "luxon";
import { getUserAge, getUserById } from "./users.service";
import { moodPromptFunction } from "./mood/moods.service";
import { prisma } from "../prisma/prismaClient";

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
  options: { date?: number; withSuggestions?: boolean }
) => {
  const { date, withSuggestions } = options;
  const findOptions: any = {};

  if (withSuggestions) {
    findOptions.withSuggestions = true;
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
): Promise<Pick<events, "content" | "mood" | "date" | "id">> => {
  const user = await getUserById(prisma, userId);
  const mood: Mood = await moodPromptFunction(
    { age: getUserAge(user), gender: user.gender },
    event
  );

  const savedEvent = await prisma.events.create({
    data: {
      content: event,
      mood,
      date: new Date(),
      user_id: userId,
    },
  });

  return {
    date: savedEvent.date,
    content: savedEvent.content,
    mood: savedEvent.mood,
    id: savedEvent.id,
  };
};
