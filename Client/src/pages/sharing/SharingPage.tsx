import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as styles from "./styles";

interface AccordionItem {
    dailySharing: string;
    suggestion: string;
    date: Date;
}

const SuggestionPage: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [suggestion, setSuggestion] = useState<string>('');
    const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([]);

    const handleAskForSuggestion = () => {
        // Generate a suggestion
        setSuggestion('Generated suggestion text'); // Replace with your suggestion logic
    };

    const handleLike = () => {
        const currentDateTime = new Date();
        setAccordionItems([...accordionItems, { dailySharing: inputText, suggestion, date: currentDateTime }]);
        setInputText('');
        setSuggestion('');
    };

    const handleReplaceSuggestion = () => {
        setSuggestion('New generated suggestion text'); // Replace with your suggestion logic
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    return (
        <Box sx={styles.container}>
            <TextField
                placeholder="Did you do something relaxing today?"
                multiline
                rows={4}
                value={inputText}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                inputProps={{ style: { direction: 'ltr', textAlign: 'left' } }}
                InputLabelProps={{ shrink: true, style: { display: 'none' } }}
            />
            <Box display="flex" justifyContent="center" marginTop="1rem">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAskForSuggestion}
                >
                    ASK FOR SUGGESTION
                </Button>
            </Box>
            {suggestion && (
                <Card style={{ marginTop: '1rem' }}>
                    <CardContent>
                        <Typography>{suggestion}</Typography>
                        <Box display="flex" justifyContent="center" gap="0.5rem">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLike}
                            >
                                Like
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleReplaceSuggestion}>
                                Replace Suggestion
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}
            {accordionItems.map((item, index) => (
                <Accordion key={index} style={{ marginTop: '20px' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box>
                            <Typography sx={styles.dateField}>{item.date.toLocaleString()}</Typography>
                            <Typography sx={styles.dailySharingField}>{item.dailySharing}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ fontWeight: 'bold' }}>Suggestion:</Typography>
                        <Typography>
                            {item.suggestion}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default SuggestionPage;
