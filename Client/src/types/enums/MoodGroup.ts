export enum MoodGroup {
    Positive = "Positive",
    Negative = "Negative",
    Regular = "Regular",
}

export const MOOD_GROUP_COLORS: Record<MoodGroup, string> = {
    [MoodGroup.Positive]: "#32CD32",
    [MoodGroup.Negative]: "#FF6347",
    [MoodGroup.Regular]: "#808080",
};