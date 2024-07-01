import { suggestionPromptFunction } from "../src/services/suggestion.service";
import { sendToGennerativeAi } from "../src/services/generative-ai.service";
import { Mood } from "../src/models/enums/mood.enum";

jest.mock("../src/services/generative-ai.service", () => ({
    ...jest.requireActual("../src/services/generative-ai.service"),
    sendToGennerativeAi: jest.fn(),
}));

describe("suggestionPromptFunction", () => {
    const mockSendToGennerativeAi = sendToGennerativeAi as jest.MockedFunction<
        typeof sendToGennerativeAi
    >;

    const userInformation = {
        age: 29,
        gender: "Male",
    };

    const dailySharing =
        "Had a relaxing weekend, spent time with family and friends.";

    const mood = Mood.Happy;

    const likedSuggestionsHistory = ["Go for a walk in the park", "Watch a comedy movie"];
    const dislikedSuggestionsHistory = ["Read a technical book", "Do house chores"];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return a positive suggetion when AI returns a positive suggetion", () => {
        const expectSuggestion = `Since you enjoyed going for a walk in the park and watching a comedy movie, how about planning a fun outing with friends to a nearby park?
         You can enjoy some outdoor activities and have a picnic together.`;

        mockSendToGennerativeAi.mockReturnValue(expectSuggestion);

        const result = suggestionPromptFunction(userInformation, dailySharing, mood, likedSuggestionsHistory, dislikedSuggestionsHistory);

        expect(result).toBe(expectSuggestion);
    });

    it("should handle unexpected AI responses gracefully", () => {
        mockSendToGennerativeAi.mockImplementation(() => {
            throw new Error("unexpected AI response");
        });

        expect(() => suggestionPromptFunction(userInformation, dailySharing, mood, likedSuggestionsHistory, dislikedSuggestionsHistory)).toThrow();
    });
});
