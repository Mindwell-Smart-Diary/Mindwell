import { MONTHS_OF_YEAR_SHORT } from "@/types/enums/Month";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const KeywordsDay = ({ keyword, date }: {
    date: Date;
    keyword: string;
}) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getUTCDate();


    const navigate = useNavigate();

    const handleDayClick = (year: number, month: number, day: number) => {
        navigate(`/sharing/${year}/${month}/${day}`);
    };

    return (
        <ButtonBase disableRipple onClick={() => handleDayClick(year, month + 1, day)}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20%',
                    alignItems: 'flex-start',
                    padding: '5px',
                }}
            >
                <Typography sx={{ color: '#00000080' }}>{day} {MONTHS_OF_YEAR_SHORT[month]} {year}</Typography>
                <Typography sx={{ textAlign: 'left' }}>{keyword}</Typography>
            </Box>
        </ButtonBase >
    )
}