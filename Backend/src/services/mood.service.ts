import { Mood } from "../models/enums/mood.enum";
import { MOOD_CATEGORIES } from "../models/enums/mood-category.enum";
import { llmGenerate } from "./generative-ai.service";

const generateMoodPrompt = (
  userInformation: { age: number; gender: string },
  dailySharing: string
): string => {
  let possibleMoods = "";

  for (const [category, moods] of Object.entries(MOOD_CATEGORIES)) {
    possibleMoods += `${category}: ${moods.join(", ")}\n    `;
  }

  return `
    Determine the mood of the user based on the following information:
    - Daily Sharing: "${dailySharing}"
    - Age: ${userInformation.age}
    - Gender: ${userInformation.gender}

    Possible moods are:
    ${possibleMoods}

    Return the most appropriate mood from the list above in the format: {"mood":"the mood"}.
  `;
};

export const moodPromptFunction = async (
  userInformation: {
    age: number;
    gender: string;
  },
  dailySharing: string
): Promise<Mood> => {
  const prompt = generateMoodPrompt(userInformation, dailySharing);
  const response = await llmGenerate([{ text: prompt }]); // Assume this returns a JSON object like {"mood":"Happy"}

  return JSON.parse(response).mood as Mood;
};
