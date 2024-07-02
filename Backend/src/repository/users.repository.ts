import { PrismaClient, users } from '@prisma/client';
import { Mood } from '../models/enums/mood.enum';

export type suggestionByMood = {
  id: number;
  title: string;
  rank: number;
  execution_date: Date;
}

export const getUserFromDB = async(prisma: PrismaClient, userId: number): 
  Promise<users> => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      })
      
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
}
