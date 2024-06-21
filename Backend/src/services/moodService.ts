import { Mood } from "../models/enums/Mood";
import { MOOD_CATEGORIES } from "../models/enums/MoodCategory";

const generateMoodPrompt = (
  userInformation: { name: string; age: number; gender: string },
  dailySharing: string
): string => {
  let possibleMoods = "";

  for (const [category, moods] of Object.entries(MOOD_CATEGORIES)) {
    possibleMoods += `${category}: ${moods.join(", ")}\n    `;
  }

  return `
    Determine the mood of the user based on the following information:
    - Name: ${userInformation.name}
    - Age: ${userInformation.age}
    - Gender: ${userInformation.gender}
    - Daily Sharing: "${dailySharing}"

    Possible moods are:
    ${possibleMoods}

    Return the most appropriate mood from the list above in the format: {"mood":"the mood"}.
  `;
};

export const sendToGennerativeAi = (prompt: string): any => {
  // Assume this function is implemented elsewhere
};

export const moodPromptFunction = (
  userInformation: {
    name: string;
    age: number;
    gender: string;
  },
  dailySharing: string
): Mood => {
  const prompt = generateMoodPrompt(userInformation, dailySharing);
  const response = sendToGennerativeAi(prompt); // Assume this returns a JSON object like {"mood":"Happy"}
  return response.mood as Mood;
};
