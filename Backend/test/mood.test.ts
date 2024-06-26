import { Mood } from "../src/models/enums/mood.enum";
import { moodPromptFunction } from "../src/services/mood.service";
import { sendToGennerativeAi } from "../src/services/generative-ai.service";

jest.mock("../src/services/generative-ai.service", () => ({
  ...jest.requireActual("../src/services/generative-ai.service"),
  sendToGennerativeAi: jest.fn(),
}));

describe("moodPromptFunction", () => {
  const mockSendToGennerativeAi = sendToGennerativeAi as jest.MockedFunction<
    typeof sendToGennerativeAi
  >;

  const userInformation = {
    age: 30,
    gender: "Male",
  };

  const dailySharing =
    "I had a productive day at work and enjoyed a nice walk in the evening.";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a positive mood when AI returns a positive mood", () => {
    const expectedMood = Mood.Happy;
    mockSendToGennerativeAi.mockReturnValue(expectedMood);

    const result = moodPromptFunction(userInformation, dailySharing);

    expect(result).toBe(expectedMood);
  });

  it("should handle unexpected AI responses gracefully", () => {
    mockSendToGennerativeAi.mockImplementation(() => {
      throw new Error("unexpected AI response");
    });

    expect(() => moodPromptFunction(userInformation, dailySharing)).toThrow();
  });
});
