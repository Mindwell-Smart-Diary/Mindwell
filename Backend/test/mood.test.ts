import { Mood } from "../src/models/enums/mood.enum";
import { moodPromptFunction } from "../src/services/mood.service";
import * as genAI from "../src/services/generative-ai.service";
import { vi, describe, beforeEach, it } from "vitest";

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

  it("should return a positive mood when AI returns a positive mood", () => {
    const expectedMood = Mood.Happy;
    mockLLMGenerate.mockResolvedValue(expectedMood);

    const result = moodPromptFunction(userInformation, dailySharing);

    expect(result).toBe(expectedMood);
    expect(mockLLMGenerate).toHaveBeenCalledWith(
      expect.stringContaining(dailySharing)
    );
  });

  it("should handle unexpected AI responses gracefully", () => {
    mockLLMGenerate.mockImplementation(() => {
      throw new Error("unexpected AI response");
    });

    expect(() => moodPromptFunction(userInformation, dailySharing)).toThrow();
  });
});
