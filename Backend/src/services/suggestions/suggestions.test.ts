import { suggestionPromptFunction } from "../suggestions/suggestions.service";
import * as genAI from "../generative-ai.service";
import { Mood } from "../../models/enums/mood.enum";
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
    const expectedSuggestion = `Since you enjoyed going for a walk in the park and watching a comedy movie, how about planning a fun outing with friends to a nearby park?
         You can enjoy some outdoor activities and have a picnic together.`;

    mockLLMGenerate.mockResolvedValue(expectedSuggestion);

    const result = await suggestionPromptFunction(
      userInformation,
      dailySharing,
      mood,
      likedSuggestionsHistory,
      dislikedSuggestionsHistory,
      []
    );

    expect(result).toBe(expectedSuggestion);
  });

  it("should throw an error for an empty suggestion", async () => {
    const invalidSuggestion = "";

    mockLLMGenerate.mockResolvedValue(invalidSuggestion);

    await expect(
      suggestionPromptFunction(
        userInformation,
        dailySharing,
        mood,
        likedSuggestionsHistory,
        dislikedSuggestionsHistory,
        []
      )
    ).rejects.toThrow("No suggestion received");
  });
});
