import { PrismaClient, events } from "@prisma/client";
import {
  eventsAndMoods,
  getEventsByDates,
  getUserLastDaysEventsAndMoodsFromDB,
} from "../repository/events.repository";
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

export const getUserLastDaysEventsAndMoods = async (
  prisma: PrismaClient,
  userId: number,
  numOfDays: number
): Promise<eventsAndMoods[]> =>
  getUserLastDaysEventsAndMoodsFromDB(prisma, userId, numOfDays);

export const getEvents = async (
  prisma: PrismaClient,
  userId: number,
  options: { date: number }
) => {
  const { date } = options;

  const startDate =
    DateTime.fromMillis(date).startOf("day").toString().split("+")[0] + "Z";
  const endDate =
    DateTime.fromMillis(date)
      .plus({ day: 1 })
      .startOf("day")
      .toString()
      .split("+")[0] + "Z";

  const matchingEvents: events[] = await getEventsByDates(
    prisma,
    userId,
    startDate,
    endDate
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
