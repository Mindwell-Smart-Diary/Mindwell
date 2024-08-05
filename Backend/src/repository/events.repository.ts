import { PrismaClient, events } from "@prisma/client";
export type eventsAndMoods = {
  content: string;
  mood: string;
};

export const findEvents = (
  prisma: PrismaClient,
  userId: number,
  options?: {
    withSuggestions?: boolean;
    dates?: {
      startDate: string;
      endDate: string;
    };
  }
): Promise<events[]> => {
  const { withSuggestions = false, dates } = options ?? {};
  const whereDates = !dates
    ? {}
    : {
        date: {
          gte: dates.startDate,
          lt: dates.endDate,
        },
      };

  console.log(withSuggestions);
  return prisma.events.findMany({
    where: {
      user_id: userId,
      ...whereDates,
    },
    include: {
      suggestions: withSuggestions,
    },
  });
};
