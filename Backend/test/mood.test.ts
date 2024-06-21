import { Mood } from "../src/models/enums/mood.enum";
import {
  sendToGennerativeAi,
  moodPromptFunction,
} from "../src/services/mood.service";

jest.mock("../src/services/mood.service", () => ({
  ...jest.requireActual("../src/services/mood.service"),
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
    mockSendToGennerativeAi.mockReturnValue({ mood: expectedMood });

    const result = moodPromptFunction(userInformation, dailySharing);

    expect(result).toBe(expectedMood);
    expect(mockSendToGennerativeAi).toHaveBeenCalledWith(
      expect.stringContaining(dailySharing)
    );
  });

  it("should handle unexpected AI responses gracefully", () => {
    mockSendToGennerativeAi.mockReturnValue({});

    expect(() =>
      moodPromptFunction(userInformation, dailySharing)
    ).toThrowError();
  });
});
