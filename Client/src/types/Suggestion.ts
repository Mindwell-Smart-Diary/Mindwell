import { SuggestionRank } from "./enums/SuggestionRank";

export type Suggestion = {
    id: number;
    eventId: number;
    content: string;
    rank: SuggestionRank | undefined;
    executionDate: Date;
}