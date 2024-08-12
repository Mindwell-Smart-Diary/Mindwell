import { Day } from "./enums/Day"
import { MoodCategory } from "./enums/MoodGroup"

export type CalendarDay = {
    day: Day,
    date: number,
    mood?: MoodCategory,
    moodColor?: string,
}