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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ m: 5, maxWidth: '600px' }}>
        <Box sx={{ my: 2, width: '100%', display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <YearInput year={selectedYear} setYear={(year: number) => setSelectedYear(year)} />
          <MonthInput month={selectedMonth} setMonth={(month: Month) => setSelectedMonth(month)} />
        </Box>
        <Calendar
          month={selectedMonth}
          year={selectedYear}
          monthDays={calendarDays}
          setMonth={(month) => setSelectedMonth(month)}
          setYear={(year) => setSelectedYear(year)}
        />
      </Box>
    </Box>
  );
};
