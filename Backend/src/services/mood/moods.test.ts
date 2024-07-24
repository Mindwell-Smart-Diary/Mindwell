import { Mood } from "../../models/enums/mood.enum";
import { moodPromptFunction } from "./moods.service";
import * as genAI from "../generative-ai.service";
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
  });

  it("should return a positive mood when AI returns a positive mood", async () => {
    const expectedMood = Mood.Happy;
    mockLLMGenerate.mockResolvedValue(expectedMood);

    const result = await moodPromptFunction(userInformation, dailySharing);
    expect(result).toBe(expectedMood);
  });

  it("should throw an error if the returned invalid mood", async () => {
    const InvalidMood = "InvalidMood";
    mockLLMGenerate.mockResolvedValue(InvalidMood);

    await expect(
      moodPromptFunction(userInformation, dailySharing)
    ).rejects.toThrow(`Invalid mood received: ${InvalidMood}`);
  });
});
