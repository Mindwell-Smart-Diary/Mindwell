import { Mood } from "../models/enums/mood.enum";
import { sendToGennerativeAi } from "./generative-ai.service";
import { PromptPart } from "../models/prompt-parts.model";

const generateSuggestionPrompt = (
    userInformation: { age: number; gender: string },
    dailySharing: string,
    mood: Mood,
    likedSuggetionsHistoryInCurrMode: string[],
    dislikedSuggestionsHistoryInCurrMode: string[],
): PromptPart[] => {
    const parts: PromptPart[] = [
        { text: "You are a psychologist and your main goal is to suggest an action that is relevant and meaningful for the patient, aimed at improving their mood or preserving their current positive state.\nGive the most weight to the daily sharing. Consider the following details:.\nDaily Sharing, Mood, History of liked suggestions in the current mood, History of disliked suggestions in the current mood, Age, Gender. \nProvide the most appropriate and meaningful action primarily based on the daily sharing. \nYou must to reply only with the suggestion itself, choose the one which is the most appropriate if there are multiple that might be correct." },
        { text: `Daily sharing: ${dailySharing}` },
        { text: `Mood: ${mood}` },
        { text: `History of liked suggestions in the current mood: ${likedSuggetionsHistoryInCurrMode.join('.\n')}` },
        { text: `History of disliked suggestions in the current mood: ${dislikedSuggestionsHistoryInCurrMode.join('.\n')}` },
        { text: `Age:  ${userInformation.age}` },
        { text: `Gender: ${userInformation.gender}` },
        { text: "Suggestion: " },
    ];

    return parts;
};

export const suggestionPromptFunction = (
    userInformation: { age: number; gender: string },
    dailySharing: string,
    mood: Mood,
    likedSuggetionsHistoryInCurrMode: string[],
    dislikedSuggestionsHistoryInCurrMode: string[],
): Mood => {
    const prompt = generateSuggestionPrompt(
        userInformation,
        dailySharing,
        mood,
        likedSuggetionsHistoryInCurrMode,
        dislikedSuggestionsHistoryInCurrMode
    );
    const response = sendToGennerativeAi(prompt);
    return response;
};
