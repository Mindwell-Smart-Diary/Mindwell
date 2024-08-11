import { Mood } from "../types/enums/Moods";

export const NON_MOOD_COLOR = '#666666';

export const MoodColors: { [key in Mood]: [number, number, number] } = {
    [Mood.Happy]: [255, 223, 70],
    [Mood.Excited]: [255, 102, 0],
    [Mood.Relaxed]: [144, 238, 144],
    [Mood.Confident]: [0, 128, 255],
    [Mood.Creative]: [255, 105, 180],
    [Mood.Grateful]: [255, 182, 193],
    [Mood.Motivated]: [0, 204, 102],
    [Mood.Curious]: [75, 0, 130],
    [Mood.Hopeful]: [173, 216, 230],
    [Mood.Sad]: [70, 130, 180],
    [Mood.Angry]: [255, 0, 0],
    [Mood.Anxious]: [128, 128, 128],
    [Mood.Stressed]: [255, 69, 0],
    [Mood.Lonely]: [70, 70, 70],
    [Mood.Frustrated]: [139, 0, 0],
    [Mood.Bored]: [169, 169, 169],
    [Mood.Surprised]: [255, 165, 0],
    [Mood.Nostalgic]: [255, 228, 181],
} as const;