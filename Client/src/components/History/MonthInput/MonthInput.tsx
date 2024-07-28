import { FormControl, FormControlProps, InputLabel, MenuItem, Select } from "@mui/material"

import { Month, MONTHS_OF_YEAR } from "@/types/enums/Month"

interface MonthInputProps extends FormControlProps {
    month: number,
    setMonth: (month: Month) => void
}

export const MonthInput = (props: MonthInputProps) => {
    const { month, setMonth } = props;

    return (
        <FormControl {...props} fullWidth>
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
                value={month}
                label="Month"
                onChange={(e) => setMonth(e.target.value as Month)}
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
    )
}