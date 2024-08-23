import styles from './Calendar.module.css';

import { CalendarDay } from '@/types/CalendarDay';
import { ButtonBase, Menu, MenuItem, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { NON_MOOD_COLOR } from '@/constants/MoodColor';
import { averageMoodColor } from '@/utilities/MoodUtils';
import { getReadableTextColor } from '@/utilities/ColorUtils';
import { backendAxiosInstance } from '@/axios/backendInstance';
import { useQuery } from '@tanstack/react-query';
import { Month, MONTHS_OF_YEAR } from '@/types/enums/Month';

const DateDropdown = ({ title, values, selectValue }: {
    title: string, values: number[] | string[], selectValue: (value: string | number) => void
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
        <Button
            onClick={handleClick}
            disableRipple
            sx={{
                backgroundColor: "transparent",
                color: "black",
                fontWeight: 'bold',
                fontSize: '1.2rem',
                '&:hover': {
                    backgroundColor: "transparent",
                },
            }}
        >
            {title}
        </Button>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
                sx: {
                    maxHeight: '200px',
                    overflowY: 'auto',
                },
            }}
        >
            {values?.map((value) => (
                <MenuItem key={value} onClick={() => {
                    handleClose();
                    selectValue(value);
                }}>
                    {value}
                </MenuItem>
            ))}
        </Menu>
    </>);
}
const MonthDays = ({ days, month, year, handleDayClick }: { days: CalendarDay[], month: number, year: number, handleDayClick: (day: number) => void }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-indexed month
    const currentDate = today.getDate();

    return (
        <ul className={styles.days}>
            {
                days.map(({ date, moodColor }, index) => {
                    const isFutureDate = date > 0 && (
                        year > currentYear ||
                        (year === currentYear && month > currentMonth) ||
                        (year === currentYear && month === currentMonth && date > currentDate)
                    );

                    return (<li style={{ opacity: `${date == -1 ? 0 : 1}` }} key={`${date}_${index}`}>
                        <ButtonBase
                            onClick={() => handleDayClick(date)}
                            className={styles.day}
                            disabled={isFutureDate}
                            sx={{
                                borderRadius: '10%',
                                maxWidth: '90%',
                                width: '40px',
                                height: '40px',
                                bgcolor: isFutureDate ? '#d0d0d0' : moodColor ?? NON_MOOD_COLOR,
                                color: getReadableTextColor(moodColor ?? NON_MOOD_COLOR),
                            }}
                        >
                            {date > 0 ? date : ''}
                        </ButtonBase>
                    </li>)
                }
                )
            }
        </ul >
    )
}

interface CalendarProps {
    month: number;
    year: number;
    setYear: (year: number) => void;
    setMonth: (month: number) => void;
    monthDays: CalendarDay[]
}

export const Calendar = (props: CalendarProps) => {
    const navigate = useNavigate();

    const handleDayClick = (year: number, month: number, day: number) => {
        navigate(`/sharing/${year}/${month}/${day}`);
    };

    const { data: dayMoods } = useQuery(
        {
            queryKey: ['moods', "calendar", { year: props.year, month: props.month }],
            queryFn: async () => (await backendAxiosInstance.get('/moods/calendar', {
                params: {
                    year: props.year,
                    month: props.month,
                }
            })).data
        }
    )

    const monthDays = useMemo<CalendarDay[]>(() =>
        props.monthDays?.map(day => {
            return {
                ...day,
                moodColor: (dayMoods && dayMoods[day.date]?.length > 0) ?
                    averageMoodColor(dayMoods[day.date]) :
                    NON_MOOD_COLOR
            }
        })
        , [props.monthDays, dayMoods])

    return (
        <div className={styles.calendar}>
            <div className={styles.monthAndYearDropdown}>
                <DateDropdown
                    title={'Year'}
                    values={Array.from({ length: new Date().getFullYear() - 1969 }, (_, index) => new Date().getFullYear() - index)}
                    selectValue={(year) => props.setYear(Number(year))} />
                <DateDropdown title={'Month'} values={MONTHS_OF_YEAR} selectValue={(month) => props.setMonth(Month[month as keyof typeof Month])} />
            </div>
            <Typography sx={{ textTransform: 'uppercase' }}>{Month[props.month]} {props.year}</Typography>
            <MonthDays
                days={monthDays}
                month={props.month}
                year={props.year}
                handleDayClick={(day: number) => handleDayClick(props.year, props.month, day)}
            />
        </div>
    );
}