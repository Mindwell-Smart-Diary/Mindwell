import { PrismaClient } from '@prisma/client';

export type eventsAndMoods = {
  title: string;
  mood: string;
}

export const getUserLastDaysEventsAndMoodsFromDB = async (prisma: PrismaClient, userId:number, numOfDays: number):
  Promise<eventsAndMoods[]> => {
    try {
        const lastDaysAgo = new Date();
        lastDaysAgo.setDate(lastDaysAgo.getDate() - numOfDays);
      
        const events = await prisma.events.findMany({
          where: {
            user_id: userId,
            date: {
              gte: lastDaysAgo
            }
          },
          select: {
            title: true,
            mood: true
          }
        });
      
        return events;
      } catch (err) {
        console.error(err);
        throw err;
      }
};