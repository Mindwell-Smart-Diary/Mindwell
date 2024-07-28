import { FormControl, FormControlProps, InputLabel, MenuItem, Select } from "@mui/material"

import { YEARS } from "@/utilities/DateUtils"

interface YearInputProps extends FormControlProps {
    year: number,
    setYear: (year: number) => void
}

export const YearInput = (props: YearInputProps) => {
    const { year, setYear } = props

    return (
        <FormControl {...props} fullWidth>
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
                value={year}
                label="Year"
                onChange={(e) => setYear(Number(e.target.value))}
            >
                {[...YEARS].map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}