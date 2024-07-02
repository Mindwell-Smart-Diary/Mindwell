import { Mood } from "../src/models/enums/mood.enum";
import { moodPromptFunction } from "../src/services/mood.service";
import * as genAI from "../src/services/generative-ai.service";
import { vi, describe, beforeEach, it, expect } from "vitest";
import dotenv from "dotenv";

dotenv.config();

const mockLLMGenerate = vi.spyOn(genAI, "llmGenerate");

describe("moodPromptFunction", () => {
  const userInformation = {
    age: 30,
    gender: "Male",
  };

  const dailySharing =
    "I had a productive day at work and enjoyed a nice walk in the evening.";

  beforeEach(() => {
    vi.clearAllMocks();
    // vi.restoreAllMocks();
  });

  it("should return a positive mood when AI returns a positive mood", async () => {
    const expectedMood = Mood.Happy;
    mockLLMGenerate.mockResolvedValue(expectedMood);

    const result = await moodPromptFunction(userInformation, dailySharing);
    expect(result).toBe(expectedMood);
  });

  it("should return a motivated mood according to the daily sharing", async () => {
    const expectedMood = Mood.Motivated;
    const dailySharingInMotivatedMood = 'Worked out at the gym, focusing on strength training and cardio exercises to stay fit and healthy';

    const result = await moodPromptFunction(userInformation, dailySharingInMotivatedMood);
    expect(result).toBe(expectedMood);
  });

  it("should throw an error if the returned mood is not valid", async () => {
    const InvalidMood = 'InvalidMood';
    mockLLMGenerate.mockResolvedValue(InvalidMood);

    await expect(moodPromptFunction(userInformation, dailySharing)).rejects.toThrow(
      `Invalid mood received: ${InvalidMood}`
    );
  });
});
