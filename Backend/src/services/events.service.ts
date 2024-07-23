import { PrismaClient, events } from "@prisma/client";
import {
  eventsAndMoods,
  getEventsByDates,
  getUserLastDaysEventsAndMoodsFromDB,
} from "../repository/events.repository";
import { Mood } from "../models/enums/mood.enum";

export const getUserLastDaysEventsAndMoods = async (
  prisma: PrismaClient,
  userId: number,
  numOfDays: number
): Promise<eventsAndMoods[]> =>
  getUserLastDaysEventsAndMoodsFromDB(prisma, userId, numOfDays);

export const getEvents = async (
  prisma: PrismaClient,
  userId: number,
  month: number,
  year: number
): Promise<Record<string, Mood[]>> => {
  const matchingEvents: events[] = await getEventsByDates(
    prisma,
    userId,
    month,
    year
  );

  console.log("FOUND");
  console.log(matchingEvents.map(({ id, date }) => ({ id, date })));
  return matchingEvents.reduce<Record<string, Mood[]>>(
    (finalRes, currEvent) => {
      const day = new Date(currEvent.date).getDate();
      if (!finalRes[day]) {
        finalRes[day] = [];
      }

      finalRes[day].push(currEvent.mood as Mood);

      return finalRes;
    },
    {}
  );
};
