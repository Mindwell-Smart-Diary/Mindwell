import styles from './Calendar.module.css';

import { DAYS_OF_WEEK } from '@/types/enums/Day';
import { CalendarDay } from '@/types/CalendarDay';

import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Mood } from '@/types/enums/Moods';
import { NON_MOOD_COLOR } from '@/constants/MoodColor';
import { averageMoodColor } from '@/utilities/MoodUtils';
import { getReadableTextColor } from '@/utilities/ColorUtils';

const CalendarWeekDays = () => {
    return (
        <ul className={styles.weekdays}>
            {
                DAYS_OF_WEEK.map((day) => (<li key={day}>{day}</li>))
            }
        </ul>
    )
}

const MonthDays = ({ days, handleDayClick }: { days: CalendarDay[], handleDayClick: (day: number) => void }) => {

    return (
        <ul className={styles.days}>
            {
                days.map(({ date, moodColor }, index) => (
                    <li style={{ opacity: `${date == -1 ? 0 : 1}` }} key={`${date}_${index}`}>
                        <ButtonBase
                            onClick={() => handleDayClick(date)}
                            className={styles.day}
                            sx={{
                                borderRadius: '50%',
                                maxWidth: '90%',
                                width: 27,
                                bgcolor: moodColor ?? NON_MOOD_COLOR,
                                color: getReadableTextColor(moodColor ?? NON_MOOD_COLOR),
                            }}
                        >
                            {date > 0 ? date : ''}
                        </ButtonBase>
                    </li>
                ))
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

    const [dayMoods, setDaysMoods] = useState<Record<number, Mood[]>>()

    const handleDayClick = (year: number, month: number, day: number) => {
        navigate(`/sharing/${year}/${month}/${day}`);
    };

    useEffect(() => {
        const fetchMoods = async () => {
            const response = await axios.get('http://localhost:3000/moods/calendar', {
                params: {
                    year: props.year,
                    month: props.month,
                }
            });
            setDaysMoods(response.data);
        };

        fetchMoods();
    }, [props.year, props.month]);

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
            <CalendarHeader {...props} />
            <CalendarWeekDays />
            <MonthDays
                days={monthDays}
                handleDayClick={(day: number) => handleDayClick(props.year, props.month, day)}
            />
        </div>
    );
}

