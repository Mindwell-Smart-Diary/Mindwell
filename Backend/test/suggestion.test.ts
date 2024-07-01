import { suggestionPromptFunction } from "../src/services/suggestion.service";
import * as genAI from "../src/services/generative-ai.service";
import { Mood } from "../src/models/enums/mood.enum";
import { vi, describe, it, beforeEach, expect } from "vitest";
const mockLLMGenerate = vi.spyOn(genAI, "llmGenerate");

describe("suggestionPromptFunction", () => {
  const userInformation = {
    age: 29,
    gender: "Male",
  };

  const dailySharing =
    "Had a relaxing weekend, spent time with family and friends.";

  const mood = Mood.Happy;

  const likedSuggestionsHistory = [
    "Go for a walk in the park",
    "Watch a comedy movie",
  ];
  const dislikedSuggestionsHistory = [
    "Read a technical book",
    "Do house chores",
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a positive suggestion when AI returns a positive suggestion", async () => {
    const expectSuggestion = `Since you enjoyed going for a walk in the park and watching a comedy movie, how about planning a fun outing with friends to a nearby park?
         You can enjoy some outdoor activities and have a picnic together.`;

    mockLLMGenerate.mockResolvedValue(expectSuggestion);

    const result = await suggestionPromptFunction(
      userInformation,
      dailySharing,
      mood,
      likedSuggestionsHistory,
      dislikedSuggestionsHistory
    );

    expect(result).toBe(expectSuggestion);
  });

  it.fails("should handle unexpected AI responses gracefully", () => {
    // mockLLMGenerate.mockRejectedValue(new Error("unexpected AI response"));

    expect(() =>
      suggestionPromptFunction(
        userInformation,
        dailySharing,
        mood,
        likedSuggestionsHistory,
        dislikedSuggestionsHistory
      )
    ).toThrow();
  });
});
