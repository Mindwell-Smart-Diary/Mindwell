import { Mood } from "./Moods";

export enum MoodCategory {
    Positive = "Positive",
    Negative = "Negative",
    Regular = "Regular",
}

export const MOOD_CATEGORIES = {
    [MoodCategory.Positive]: [
      Mood.Happy,
      Mood.Excited,
      Mood.Relaxed,
      Mood.Confident,
      Mood.Creative,
      Mood.Grateful,
      Mood.Motivated,
      Mood.Curious,
      Mood.Hopeful,
    ],
    [MoodCategory.Negative]: [
      Mood.Sad,
      Mood.Angry,
      Mood.Anxious,
      Mood.Stressed,
      Mood.Lonely,
      Mood.Frustrated,
    ],
    [MoodCategory.Regular]: [Mood.Bored, Mood.Surprised, Mood.Nostalgic],
  };
  

export const MOOD_GROUP_COLORS: Record<MoodCategory, string> = {
    [MoodCategory.Positive]: "#32CD32",
    [MoodCategory.Negative]: "#FF6347",
    [MoodCategory.Regular]: "#808080",
};