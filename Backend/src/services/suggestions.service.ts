import { PrismaClient } from '@prisma/client';
import { Mood } from '../models/enums/mood.enum';

export const getSuggestionsByUserMood = async(prisma: PrismaClient, userId: number, userMood: Mood): 
  Promise<{ id: number; title: string; rank: number; execution_date: Date; }[]> => {
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
}
