import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Card, Typography, Box } from '@mui/material';
import * as styles from "./styles";
import { SuggestionRank } from '@/types/enums/SuggestionRank';

const SuggestionPage: React.FC = () => {
    const [dailySharing, setDailySharing] = useState<string>('');
    const [dailySharings, setDailySharings] = useState<string[]>([]);
    const [suggestion, setSuggestion] = useState<string>('');
    const [chosenRank, setChosenRank] = useState<SuggestionRank>();

    const handleAddDailySharing = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && dailySharing.trim().length) {
            // Todo: create daily sharing and get the suggestion and the current mood
            setDailySharings([dailySharing, ...dailySharings])
            setDailySharing('')
            setSuggestion('Your suggestion is...');
            setChosenRank(undefined);
            event.preventDefault()
        }
    }

    const handleChangeRank = (rank: SuggestionRank) => {
        // Todo: update rank and execution date in the server
        setChosenRank(rank);
    }

    const handleGenerateSuggestion = () => {
        // Todo: get new suggestion from the server
        setChosenRank(undefined);
        setSuggestion('I want to give you another suggestion... ' + Math.random())
    }

    return (
        <Box sx={styles.container}>
            <Typography sx={styles.title}>Did you do something <br></br>relaxing today?</Typography>
            <TextField
                value={dailySharing}
                rows={2}
                multiline={true}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setDailySharing(event.target.value)}
                onKeyDown={handleAddDailySharing}
                sx={styles.dailySharingText}>
            </TextField>
            {suggestion &&
                <Card sx={styles.suggestionCard}>
                    <Typography sx={styles.suggestionText}>{suggestion}</Typography>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={() => handleChangeRank(SuggestionRank.LIKE)}
                            sx={{
                                ...styles.suggestionButton,
                                border: chosenRank === SuggestionRank.LIKE ? '1.5px solid #3A3A3A' : 'none'
                            }}>I liked it!</Button>
                        <Button
                            onClick={() => handleChangeRank(SuggestionRank.DID_NOT_HELP)}
                            sx={{
                                ...styles.suggestionButton,
                                border: chosenRank === SuggestionRank.DID_NOT_HELP ? '1.5px solid #3A3A3A' : 'none'
                            }}>It didn't help</Button>
                        <Button
                            onClick={() => handleChangeRank(SuggestionRank.DID_NOT_LIKE)}
                            sx={{
                                ...styles.suggestionButton,
                                border: chosenRank === SuggestionRank.DID_NOT_LIKE ? '1.5px solid #3A3A3A' : 'none'
                            }}>I didn't liked it</Button>
                        <Button
                            onClick={() => handleGenerateSuggestion()}
                            sx={styles.suggestionButton}>Generate another</Button>
                    </Box>
                </Card>
            }
            <Box sx={styles.listContainer}>
                {dailySharings.map((item =>
                    <Card sx={styles.dailySharingCard}>{item}</Card>
                ))}
            </Box>
        </Box>
    );
};

export default SuggestionPage;
