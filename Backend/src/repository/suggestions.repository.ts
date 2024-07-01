import { PrismaClient } from '@prisma/client';
import { Mood } from '../models/enums/mood.enum';

export type suggestionByMood = {
  id: number;
  title: string;
  rank: number;
  execution_date: Date;
}

export const getSuggestionsByUserMoodFromDB = async(prisma: PrismaClient, userId: number, userMood: Mood): 
  Promise<suggestionByMood[]> => {
    try {
      const suggestions = await prisma.suggestions.findMany({
        where: {
          events: {
            user_id: userId,
            mood: userMood
          }
        },
        select: {
          id: true,
          title: true,
          rank: true,
          execution_date: true
        }
      });
      
      return suggestions;
    } catch (err) {
      console.log(err);
      throw err;
    }
}
