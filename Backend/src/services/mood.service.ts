import { Mood } from "../models/enums/mood.enum";
import { llmGenerate } from "./generative-ai.service";
import { PromptPart } from "../models/prompt-parts.model";

const generateMoodPrompt = (
  userInformation: { age: number; gender: string },
  dailySharing: string
): PromptPart[] => {
  const parts: PromptPart[] = [
    {
      text: `You are a psychologist and your main goal is to define the patient's mood based on the input.\nPossible moods are: ${Object.values(
        Mood
      ).join(
        ", "
      )}.\nYou must reply only with the mood itself, choose the one which is the most appropriate if there are multiple that might be correct.`,
    },
    { text: `Daily sharing: ${dailySharing}` },
    { text: `Age:  ${userInformation.age}` },
    { text: `Gender: ${userInformation.gender}` },
    { text: "Mood:  " },
  ];

  return parts;
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
