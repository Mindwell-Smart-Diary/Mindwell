import { Box, Card, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { Month } from "@/types/enums/Month";
import { CalendarDay } from "@/types/CalendarDay";
import { getMonthCalendar } from "@/utilities/DateUtils";
import { Calendar, SearchInput } from "@/components/History";
import { useQuery } from "@tanstack/react-query";
import { backendAxiosInstance } from "@/axios/backendInstance";
import { useThemeMode } from "@/hooks/ThemeModeContext";
import { DailySharing } from "@/types/DailySharing";
import { KeywordsDay } from "@/components/History/KeywordDay/Keyworday";

export const History = () => {
  const currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const currentMonth: Month = currentDate.getMonth() + 1;

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<Month>(currentMonth);

  const calendarDays: CalendarDay[] = useMemo(() => {
    return getMonthCalendar(selectedMonth, selectedYear).days;
  }, [selectedYear, selectedMonth]);

  const { data: dailySharings } = useQuery({
    enabled: searchValue.length > 0,
    queryKey: ['events', { keywordsPrefix: searchValue }],
    queryFn: async () => (await backendAxiosInstance.get('/events', {
      params: {
        keywordsPrefix: searchValue,
      }
    })).data as DailySharing[]
  })

  const keyWordsByDate = useMemo(() => {
    if (!dailySharings) return [];

    const keywordDateSet = new Set<string>(); // To ensure uniqueness
    const result: { keyword: string; date: Date }[] = [];

    dailySharings.forEach(dailySharing => {
      const matchingKeywords = dailySharing.keywords.filter(keyword => keyword.startsWith(searchValue));

      matchingKeywords.forEach(keyword => {
        const date = new Date(dailySharing.date)

        const keywordDatePair = `${keyword}_${date.toDateString()}`; // Unique identifier
        if (!keywordDateSet.has(keywordDatePair)) {
          keywordDateSet.add(keywordDatePair);
          result.push({
            keyword,
            date,
          });
        }
      });
    });

    // Sorting the result array by date (newest first) and then by keyword (alphabetically)
    result.sort((a, b) => {
      const dateComparison = b.date.getTime() - a.date.getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return a.keyword.localeCompare(b.keyword);
    });

    return result;
  }, [dailySharings, searchValue])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ m: 5, maxWidth: '600px' }}>
        <SearchInput setValue={(val: string) => setSearchValue(val)} />
        {
          searchValue.length > 0 ?
            <Box sx={{
              my: 1,
              width: '600px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}>
              {
                keyWordsByDate.length > 0 ?
                  keyWordsByDate.map(keywordDate =>
                    <KeywordsDay {...keywordDate} key={`${keywordDate.keyword}_${keywordDate.date.toISOString()}`} />
                  ) : <Typography variant="h6">no evnets founds</Typography>
              }
            </Box>
            :
            <Calendar
              month={selectedMonth}
              year={selectedYear}
              monthDays={calendarDays}
              setMonth={(month) => setSelectedMonth(month)}
              setYear={(year) => setSelectedYear(year)}
            />
        }
      </Box>
    </Box>
  );
};