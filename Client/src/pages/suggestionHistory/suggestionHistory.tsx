import { useThemeMode } from '@/hooks/ThemeModeContext';
import { ThemeProvider, Container, Grid, Typography, Card, CardContent, Rating, IconButton, Collapse, Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { Mood } from '@/types/enums/Moods';
import { MOOD_CATEGORIES, MoodCategory } from '@/types/enums/MoodGroup';

interface FlatEvent {
  eventId: number;
  userId: number;
  eventContent: string;
  eventDate: string; 
  mood: Mood;
  suggestionId: number;
  suggestionTitle: string;
  suggestionContent: string;
  suggestionRank: number; 
  suggestionExecutionDate: string;
  // keywords: [];
}

const HistoryOfSuggestionsPage: React.FC = () => {
  const [suggestions, setSuggestios] = useState<FlatEvent[]>([]);

  useEffect(() => {
      async function fetchMyAPI() {
        // TODO: Update to SERVER_URL
        const response = await fetch('http://localhost:3000/events/?withSuggestions=true', {
          method: 'GET',
          headers: {
            // TODO: Update to user token
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNzIzNDg0NTc2LCJleHAiOjE3MjM1ODQ1NzZ9.1L_d4V7cGS7izOSuRlBi-6jO9JGGitkh44nALyePIDs',
            'Content-Type': 'application/json',
          },
        });        

        const result = await response.json();

        const flatEvents : FlatEvent[] = result.flatMap((event: any)  =>
          event.suggestions.map((suggestion: any) => ({
              eventId: event.id,
              userId: event.user_id,
              eventContent: event.content,
              eventDate: event.date,
              mood: event.mood,
              suggestionId: suggestion.id,
              suggestionTitle: suggestion.title,
              suggestionContent: suggestion.content,
              suggestionRank: suggestion.rank,
              suggestionExecutionDate: suggestion.execution_date,
              // keywords: event.keywords
          }))
        );

        flatEvents.sort((a, b) => new Date(b.suggestionExecutionDate).getTime() - new Date(a.suggestionExecutionDate).getTime());
        setSuggestios(flatEvents);
      }
  
      fetchMyAPI();

  }, []);
  const customIcons = {
    [MoodCategory.Negative]: {
      icon: <SentimentDissatisfiedIcon style={{ color: '#FF4136' }} />,
      label: 'Dissatisfied',
    },
    [MoodCategory.Regular]: {
      icon: <SentimentSatisfiedIcon style={{ color: '#FF851B' }}/>,
      label: 'Neutral',
    },
    [MoodCategory.Positive]: {
      icon: <SentimentSatisfiedAltIcon style={{ color: '#3D9970' }}/>,
      label: 'Satisfied',
    }
  };
  const { theme } = useThemeMode();

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleExpandClick = (index: number) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const getMoodCategory = (mood: Mood): MoodCategory => {
    for (const category in MOOD_CATEGORIES) {
      if (MOOD_CATEGORIES[category as MoodCategory].includes(mood)) {
        return category as MoodCategory;
      }
    }
    return MoodCategory.Regular;
  };
  
  const getMoodIcon = (mood: MoodCategory) => customIcons[mood];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box mt={4} mb={2}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            History of Suggestions
          </Typography>
        </Box>
        <Grid container spacing={0.5} direction="column">
          {suggestions.map((suggestion, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Card style={{ position: 'relative', backgroundColor: 'inherit', boxShadow: 'none' }}>
                  <CardContent>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={8}>
                        <Typography variant="h6" component="div">
                          {suggestion.suggestionTitle}
                          <IconButton  style={{ marginLeft: '10px' }} size="small">
                            {getMoodIcon(getMoodCategory(suggestion.mood)).icon}
                          </IconButton>
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          Your personal share: {suggestion.eventContent}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          Our recommendation: {suggestion.suggestionContent}
                        </Typography>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Rating value={suggestion.suggestionRank} readOnly size="large" max={3}/>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <CalendarTodayIcon fontSize="medium" />
                          </Grid>
                          <Grid item>
                            <Typography color="text.secondary" variant="body1">
                              {new Date(suggestion.suggestionExecutionDate).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {index < suggestions.length - 1 && <Divider />}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default HistoryOfSuggestionsPage;