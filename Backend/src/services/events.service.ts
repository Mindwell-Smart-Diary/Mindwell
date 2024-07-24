import { PrismaClient, events } from "@prisma/client";
import {
  eventsAndMoods,
  getEventsByDates,
  getUserLastDaysEventsAndMoodsFromDB,
} from "../repository/events.repository";
import { Mood } from "../models/enums/mood.enum";
import { DateTime } from "luxon";

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
