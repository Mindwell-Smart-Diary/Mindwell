import { CalendarDay } from "../types/CalendarDay";
import { Day } from "../types/enums/Day";
import { Month } from "../types/enums/Month";
import { MonthCalendar } from "../types/MonthCalendar";

export const YEARS: number[] = [2024, 2025, 2026, 2027, 2028, 2029];

//TODO create a api call to fetch data from a server instead of this mock data
export const getMonthCalendar = (month: Month, year: number): MonthCalendar => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const days: CalendarDay[] = [];

    // Fill in the days before the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push({ day: i + 1, date: -1 });
    }

    // Fill in the actual days of the month
    for (let dayDate = 1; dayDate <= daysInMonth; dayDate++) {
        const date = new Date(year, month - 1, dayDate);
        const day = (date.getDay() + 1) as Day;
        days.push({ day, date: dayDate });
    }

    // Adjust the length of the array to always start on Sunday
    while (days.length % 7 !== 0) {
        days.push({ day: (days.length % 7) + 1, date: -1 });
    }

    return {
        month: month,
        year: year,
        days: days,
    };
};
