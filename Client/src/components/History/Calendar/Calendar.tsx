import styles from './Calendar.module.css';

import { DAYS_OF_WEEK } from '@/types/enums/Day';
import { CalendarDay } from '@/types/CalendarDay';

import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { ButtonBase } from '@mui/material';
import { MOOD_GROUP_COLORS, MoodGroup } from '@/types/enums/MoodGroup';
import { useNavigate } from 'react-router-dom';

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
                days.map(({ date, mood }, index) => (
                    <li style={{ opacity: `${date == -1 ? 0 : 1}` }} key={`${date}_${index}`}>
                        <ButtonBase
                            onClick={() => handleDayClick(date)}
                            className={styles.day}
                            sx={{
                                borderRadius: '50%',
                                maxWidth: '90%',
                                width: 27,
                                bgcolor: `${mood ? MOOD_GROUP_COLORS[mood] : MOOD_GROUP_COLORS[MoodGroup.Regular]}`
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

    const handleDayClick = (year: number, month: number, day: number) => {
        navigate(`/sharing/${year}/${month}/${day}`);
    };


    return (
        <div className={styles.calendar}>
            <CalendarHeader {...props} />
            <CalendarWeekDays />
            <MonthDays
                days={props.monthDays}
                handleDayClick={(day: number) => handleDayClick(props.year, props.month, day)}
            />
        </div>
    );
}

