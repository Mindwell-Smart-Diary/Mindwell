import styles from './Calendar.module.css';

import { DAYS_OF_WEEK } from '@/types/enums/Day';
import { CalendarDay } from '@/types/CalendarDay';

import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { ButtonBase } from '@mui/material';
import { MOOD_GROUP_COLORS, MoodCategory } from '@/types/enums/MoodGroup';

const CalendarWeekDays = () => {
    return (
        <ul className={styles.weekdays}>
            {
                DAYS_OF_WEEK.map((day) => (<li key={day}>{day}</li>))
            }
        </ul>
    )
}

const MonthDays = ({ days }: { days: CalendarDay[] }) => {
    return (
        <ul className={styles.days}>
            {
                days.map(({ date, mood }, index) => (
                    <li style={{ opacity: `${date == -1 ? 0 : 1}` }} key={`${date}_${index}`}>
                        <ButtonBase
                            className={styles.day}
                            sx={{
                                height: '100%',
                                width: '80%',
                                bgcolor: `${mood ? MOOD_GROUP_COLORS[mood] : MOOD_GROUP_COLORS[MoodCategory.Regular]}`
                            }}
                        >
                            {date > 0 ? date : ''}
                        </ButtonBase>
                    </li>
                ))
            }
        </ul>
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
    return (
        <div className={styles.calendar}>
            <CalendarHeader {...props} />
            <CalendarWeekDays />
            <MonthDays days={props.monthDays} />
        </div>
    );
}

