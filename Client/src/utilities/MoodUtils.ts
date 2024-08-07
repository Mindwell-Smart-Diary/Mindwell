import { MoodColors } from "@/constants/MoodColor";
import { Mood } from "@/types/enums/Moods";

export const averageMoodColor = (moods: Mood[]): string => {
    let sumR = 0,
        sumG = 0,
        sumB = 0;

    for (const mood of moods) {
        const [r, g, b] = MoodColors[mood];
        sumR += r;
        sumG += g;
        sumB += b;
    }

    const avgR = Math.round(sumR / moods.length);
    const avgG = Math.round(sumG / moods.length);
    const avgB = Math.round(sumB / moods.length);

    return `rgb(${avgR}, ${avgG}, ${avgB})`;
};
