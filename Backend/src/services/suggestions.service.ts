import { PrismaClient } from '@prisma/client';

export const getSuggestionsByUserMood = async(prisma: PrismaClient, userId: number, userMood: string) => {
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
