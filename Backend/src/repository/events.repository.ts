import { PrismaClient, events } from "@prisma/client";
import { DateTime } from "luxon";
export type eventsAndMoods = {
  title: string;
  mood: string;
};

export const getUserLastDaysEventsAndMoodsFromDB = async (
  prisma: PrismaClient,
  userId: number,
  numOfDays: number
): Promise<eventsAndMoods[]> => {
  try {
    const lastDaysAgo = new Date();
    lastDaysAgo.setDate(lastDaysAgo.getDate() - numOfDays);

    const events = await prisma.events.findMany({
      where: {
        user_id: userId,
        date: {
          gte: lastDaysAgo,
        },
      },
      select: {
        title: true,
        mood: true,
      },
    });

    return events;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getEventsByDates = (
  prisma: PrismaClient,
  userId: number,
  month: number,
  year: number
): Promise<events[]> => {
  return prisma.events.findMany({
    where: {
      user_id: userId,
      date: {
        gte:
          DateTime.fromObject({ year, month })
            .startOf("month")
            .toString()
            .split("+")[0] + "Z",
        lt:
          DateTime.fromObject({ year, month })
            .plus({ month: 1 })
            .startOf("month")
            .toString()
            .split("+")[0] + "Z",
        // lt: new Date(endYear, nextMoth),
      },
    },
  });
};
