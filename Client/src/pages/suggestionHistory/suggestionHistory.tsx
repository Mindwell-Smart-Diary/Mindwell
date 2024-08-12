import { useThemeMode } from '@/hooks/ThemeModeContext';
import { ThemeProvider, Container, Grid, Typography, Card, CardContent, Rating, IconButton, Collapse, Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

interface Suggestion {
  title: string;
  content: string;
  rank: number;
  date: Date;
  eventTitle: string;
  eventContent: string;
  eventMoodCategory: MoodCategory;
}

enum MoodCategory {
  Positive = "Positive",
  Negative = "Negative",
  Regular = "Regular",
}

const suggestionsList: Suggestion[] = [
  {
    eventTitle: "Morning Jog",
    eventContent: "Went for a 5km jog in the park. Felt great.",
    title: "Stretching",
    content: "Do some stretching exercises to cool down.",
    rank: 2,
    date: new Date(),
    eventMoodCategory: MoodCategory.Positive
  },
  {
    eventTitle: "Evening Walk",
    eventContent: "Had a relaxing walk in the neighborhood.",
    title: "Hydrate",
    content: "Drink plenty of water after your walk.",
    rank: 3,
    date: new Date(),
    eventMoodCategory: MoodCategory.Regular
  },
  {
    eventTitle: "Evening Walk",
    eventContent: "Had a relaxing walk in the neighborhood.",
    title: "Hydrate",
    content: "Drink plenty of water after your walk.",
    rank: 1,
    date: new Date(),
    eventMoodCategory: MoodCategory.Negative
  },
  {
    eventTitle: "Evening Walk",
    eventContent: "Had a relaxing walk in the neighborhood.",
    title: "Hydrate",
    content: "Drink plenty of water after your walk.",
    rank: 3,
    date: new Date(),
    eventMoodCategory: MoodCategory.Regular
  },
  // Add more suggestions as needed
];

const HistoryOfSuggestionsPage: React.FC = () => {
  const [suggestions, setSuggestios] = useState<Suggestion[]>([]);

  useEffect(() => {
    // Todo: get dailySharings of today
    // const events: Suggestion[] = [];

    setSuggestios(suggestionsList);
  }, []);
  const customIcons = {
    [MoodCategory.Negative]: {
      icon: <SentimentDissatisfiedIcon style={{ color: '#FF4136' }} />,
      label: 'Dissatisfied',
    },
    [MoodCategory.Regular]: {
      icon: <SentimentSatisfiedIcon style={{ color: '#FF851B' }} />,
      label: 'Neutral',
    },
    [MoodCategory.Positive]: {
      icon: <SentimentSatisfiedAltIcon style={{ color: '#3D9970' }} />,
      label: 'Satisfied',
    }
  };
  const { theme } = useThemeMode();

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleExpandClick = (index: number) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const getMoodIcon = (mood: MoodCategory) => {
    return customIcons[mood];
  };

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
                <Card sx={{ position: 'relative', my: 1, }} elevation={1}>
                  <CardContent>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={8}>
                        <Typography variant="h6" component="div">
                          {suggestion.eventTitle}
                          <IconButton style={{ marginLeft: '10px' }} size="small" onClick={() => handleExpandClick(index)}>
                            {getMoodIcon(suggestion.eventMoodCategory).icon}
                          </IconButton>
                        </Typography>
                        <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                          <Typography color="text.secondary" gutterBottom>
                            Your personal share: {suggestion.eventContent}
                          </Typography>
                        </Collapse>
                        <Typography color="text.secondary" gutterBottom>
                          Our recommendation: {suggestion.title}, {suggestion.content}
                        </Typography>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Rating value={suggestion.rank} readOnly size="large" max={3} />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <CalendarTodayIcon fontSize="medium" />
                          </Grid>
                          <Grid item>
                            <Typography color="text.secondary" variant="body1">
                              {new Date(suggestion.date).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {/* {index < suggestions.length - 1 && <Divider />} */}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default HistoryOfSuggestionsPage;
