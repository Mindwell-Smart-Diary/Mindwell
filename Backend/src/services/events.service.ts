import { PrismaClient } from '@prisma/client';
import { eventsAndMoods, getUserLastDaysEventsAndMoodsFromDB } from '../repository/events.repository';

export const getUserLastDaysEventsAndMoods = async (prisma: PrismaClient, userId:number, numOfDays: number):
  Promise<eventsAndMoods[]> => getUserLastDaysEventsAndMoodsFromDB(prisma, userId, numOfDays);