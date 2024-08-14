export type DailySharing = {
    id: number;
    user_id: number;
    content: string;
    date: Date;
    mood: string;
    keywords: string[];
}