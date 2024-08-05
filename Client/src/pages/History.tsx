import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";

import { Month } from "@/types/enums/Month";
import { CalendarDay } from "@/types/CalendarDay";
import { getMonthCalendar } from "@/utilities/DateUtils";
import { Calendar, SearchInput } from "@/components/History";
import { useThemeMode } from "@/hooks/ThemeModeContext";

export const History = () => {

  const currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const currentMonth: Month = currentDate.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<Month>(currentMonth);

  const calendarDays: CalendarDay[] = useMemo(() => {
    return getMonthCalendar(selectedMonth, selectedYear).days;
  }, [selectedYear, selectedMonth]);

  const { toggleDarkMode } = useThemeMode();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Button onClick={toggleDarkMode}>dark mode</Button>
      <Box sx={{ m: 5, maxWidth: '600px' }}>
        <SearchInput />
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
