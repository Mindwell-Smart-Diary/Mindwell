import { Mood } from "../../models/enums/mood.enum";
import { llmGenerate } from "../generative-ai.service";
import { PromptPart } from "../../models/prompt-parts.model";
import { DateTime } from "luxon";
import { PrismaClient, events } from "@prisma/client";
import { findEvents } from "../../repository/events.repository";

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
  const response = await llmGenerate(prompt);
  const mood = response.trim() as Mood;

  if (!Object.values(Mood).includes(mood)) {
    throw new Error(`Invalid mood received: ${mood}`);
  }

  return mood;
};

export const getMoodsByMonth = async (
  prisma: PrismaClient,
  userId: number,
  month: number,
  year: number
): Promise<Record<string, Mood[]>> => {
  const startDate =
    DateTime.fromObject({ year, month })
      .startOf("month")
      .toString()
      .split("+")[0] + "Z";
  const endDate =
    DateTime.fromObject({ year, month })
      .plus({ month: 1 })
      .startOf("month")
      .toString()
      .split("+")[0] + "Z";

  const matchingEvents: events[] = await findEvents(prisma, userId, {
    dates: {
      endDate,
      startDate,
    },
  });

  return matchingEvents.reduce<Record<string, Mood[]>>(
    (finalRes, currEvent) => {
      const day = new Date(currEvent.date).getDate();
      if (!finalRes[day]) {
        finalRes[day] = [];
      }

      finalRes[day].push(currEvent.mood as Mood);

      return finalRes;
    },
    {}
  );
};
