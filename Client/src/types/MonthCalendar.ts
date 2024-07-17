import { Month } from "./enums/Month";
import { CalendarDay } from "./CalendarDay";

export type MonthCalendar = {
    month: Month;
    year: number;
    days: CalendarDay[];
}