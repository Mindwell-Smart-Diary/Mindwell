import { PrismaClient, users } from '@prisma/client';
import { eventsAndMoods, getUserLastDaysEventsAndMoodsFromDB } from '../repository/events.repository';
import { getUserFromDB } from '../repository/users.repository';

export const getUserById = async (prisma: PrismaClient, userId:number):
  Promise<users> => getUserFromDB(prisma, userId);

export const getUserAge = (user: users): number => new Date().getFullYear() - new Date(user.birthdate).getFullYear()
