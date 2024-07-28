import { Box } from "@mui/material";
import { useMemo, useState } from "react";

import { Month } from "@/types/enums/Month";
import { CalendarDay } from "@/types/CalendarDay";
import { getMonthCalendar } from "@/utilities/DateUtils";
import { Calendar, YearInput, MonthInput } from "@/components/History";


export const History = () => {
  const currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const currentMonth: Month = currentDate.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<Month>(currentMonth);

  const calendarDays: CalendarDay[] = useMemo(() => {
    return getMonthCalendar(selectedMonth, selectedYear).days;
  }, [selectedYear, selectedMonth]);

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
        <YearInput sx={{ maxWidth: '50%', m: 2 }} year={selectedYear} setYear={(year: number) => setSelectedYear(year)} />
        <MonthInput sx={{ maxWidth: '50%', m: 2 }} month={selectedMonth} setMonth={(month: Month) => setSelectedMonth(month)} />
        <Calendar
          month={selectedMonth}
          year={selectedYear}
          monthDays={calendarDays}
          setMonth={(month) => setSelectedMonth(month)}
          setYear={(year) => setSelectedYear(year)}
        />
      </Box>
    </>
  );
};
