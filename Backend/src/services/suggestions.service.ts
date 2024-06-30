import { PrismaClient } from '@prisma/client';
import { Mood } from '../models/enums/mood.enum';
import { getSuggestionsByUserMoodFromDB, suggestionByMood } from '../repository/suggestions.repository';

export const getSuggestionsByUserMood = async(prisma: PrismaClient, userId: number, userMood: Mood): 
  Promise<suggestionByMood[]> => getSuggestionsByUserMoodFromDB(prisma, userId, userMood);