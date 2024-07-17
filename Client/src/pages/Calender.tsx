import { Month, MONTHS_OF_YEAR } from "@/types/enums/Month";
import { YEARS } from "@/utilities/DateUtils";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const Calender = () => {
  const currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const currentMonth: Month = currentDate.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<Month>(currentMonth);

  return (
    <Box p={5} sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 2 }} fullWidth>
        <InputLabel id="selected-year">Year</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          labelId="selected-year"
          value={selectedYear}
          label="Year"
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {[...YEARS].map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 2 }} fullWidth>
        <InputLabel id="selected-month">Month</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          labelId="selected-month"
          value={selectedMonth}
          label="Month"
          onChange={(e) => setSelectedMonth(e.target.value as Month)}
        >
          {[...Object.values(Month)]
            .filter((month) => typeof month === "number")
            .map((month) => (
              <MenuItem key={month} value={month}>
                {MONTHS_OF_YEAR[month - 1]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
