import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { MONTHS_OF_YEAR } from '@/types/enums/Month';
import { useThemeMode } from '@/hooks/ThemeModeContext';

import styles from './CalendarHeader.module.css';

interface CalendarHeaderProps {
    month: number;
    year: number;
    setYear: (year: number) => void;
    setMonth: (month: number) => void;
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
    const { month, year, setMonth, setYear } = props;

    const { theme } = useThemeMode();

    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    return (
        <Box bgcolor={theme.palette.primary.main} className={styles.header}>
            <ul>
                <li className={styles.prev}>
                    <IconButton onClick={handlePrevMonth} aria-label="Previous month">
                        <ArrowBackIosIcon style={{ color: 'white' }} />
                    </IconButton>
                </li>
                <li className={styles.next}>
                    <IconButton onClick={handleNextMonth} aria-label="Next month">
                        <ArrowForwardIosIcon style={{ color: 'white' }} />
                    </IconButton>
                </li>
                <li>
                    {MONTHS_OF_YEAR[month - 1]}
                    <br />
                    <span style={{ fontSize: '18px' }}>{year}</span>
                </li>
            </ul>
        </Box>
    )
}
