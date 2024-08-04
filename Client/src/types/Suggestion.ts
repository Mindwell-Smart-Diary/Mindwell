import { SuggestionRank } from "./enums/SuggestionRank";

export type Suggestion = {
    content: string;
    rank: SuggestionRank | undefined;
}