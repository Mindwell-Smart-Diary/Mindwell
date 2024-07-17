import { Day } from "./enums/Day"
import { MoodGroup } from "./enums/MoodGroup"

export type CalendarDay = {
    day: Day,
    date: number,
    mood?: MoodGroup,
}