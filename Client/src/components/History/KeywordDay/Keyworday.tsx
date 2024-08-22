import { useThemeMode } from "@/contexts/ThemeModeContext";
import { MONTHS_OF_YEAR_SHORT } from "@/types/enums/Month";
import { Box, ButtonBase, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const KeywordsDay = ({ keyword, date }: {
    date: Date;
    keyword: string;
}) => {
    const { theme } = useThemeMode();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getUTCDate();


    const navigate = useNavigate();

    const handleDayClick = (year: number, month: number, day: number) => {
        navigate(`/sharing/${year}/${month}/${day}`);
    };

    return (
        <ButtonBase onClick={() => handleDayClick(year, month + 1, day)} sx={{ borderRadius: 5 }}>
            <Card sx={{ display: 'flex', alignItems: 'center', width: '290px', borderRadius: 5 }}>
                <Box
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 1,
                        marginRight: 2,
                        height: '100%'
                    }}
                >
                    <Typography variant="h6" component="div" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
                        {day} {MONTHS_OF_YEAR_SHORT[month]}
                    </Typography>
                    <Typography variant="subtitle1">
                        {year}
                    </Typography>
                </Box>
                <Typography variant="body1" component="div">
                    {keyword}
                </Typography>
            </Card>
        </ButtonBase>
    )
}