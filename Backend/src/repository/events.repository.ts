import { PrismaClient, events } from "@prisma/client";
export type eventsAndMoods = {
  content: string;
  mood: string;
};

export const findEvents = async (
  prisma: PrismaClient,
  userId: number,
  options?: {
    withSuggestions?: boolean;
    dates?: {
      startDate: string;
      endDate: string;
    };
    keywords?: string[];
  }
) => {
  const { withSuggestions = false, dates, keywords } = options ?? {};
  const whereDates = !dates
    ? {}
    : {
        date: {
          gte: dates.startDate,
          lt: dates.endDate,
        },
      };

  const whereKeywords =
    Array.isArray(keywords) && keywords.length > 0
      ? {
          keywords: {
            some: {
              keyword: {
                in: keywords,
              },
            },
          },
        }
      : {};

  return (
    await prisma.events.findMany({
      where: {
        user_id: userId,
        ...whereKeywords,
        ...whereDates,
      },
      include: {
        suggestions: withSuggestions,
        keywords: true,
      },
    })
  ).map(({ keywords, ...rest }) => ({
    ...rest,
    keywords: keywords.map(({ keyword }) => keyword),
  }));
};
