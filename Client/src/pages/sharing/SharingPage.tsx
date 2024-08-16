import React, { useState, ChangeEvent, useMemo } from 'react';
import { TextField, Button, Card, Typography, Box } from '@mui/material';
import * as styles from "./styles";
import { SuggestionRank } from '@/types/enums/SuggestionRank';
import { DailySharing } from '@/types/DailySharing';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDateByYearMonthDay } from '@/utilities/DateUtils';
import { backendAxiosInstance } from '@/axios/backendInstance';
import { Suggestion } from '@/types/Suggestion';

const SuggestionPage: React.FC = () => {
    const [dailySharing, setDailySharing] = useState<string>('');

    const { year, month, day } = useParams();

    const isToday = useMemo(() => {
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() + 1;
        const todayDay = today.getDate();

        return todayDay === Number(day) && todayMonth === Number(month) && todayYear === Number(year)
    }, [year, month, day])

    const isDayPass = useMemo(() => {
        const today = new Date();
        const targetDate = new Date(Number(year), Number(month) - 1, Number(day));

        return targetDate < today;
    }, [year, month, day]);

    const queryClient = useQueryClient();

    const time = useMemo(() =>
        getDateByYearMonthDay(Number(year), Number(month), Number(day)).getTime(),
        [year, month, day]);

    const { data: dailySharings } = useQuery<DailySharing[]>({
        initialData: [],
        queryKey: ["events", { date: time }],
        queryFn: async () => {
            const events: DailySharing[] = (await backendAxiosInstance.get("/events", {
                params: {
                    date: time
                }
            })).data;

            return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        },
    });

    const { data: suggestion } = useQuery<Suggestion>({
        enabled: dailySharings.length > 0,
        queryKey: ["events", dailySharings[0]?.id, "suggestions"],
        queryFn: async () => {
            const suggestions: Suggestion[] = (await backendAxiosInstance.get(`/events/${dailySharings[0]?.id}/suggestions`)).data;
            return suggestions.sort((a, b) => b.id - a.id)[0];
        }
    });

    const generateSuggestionMutation = useMutation({
        mutationFn: (id: number) => handleGenerrateSuggetion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", dailySharings[0].id, "suggestions"] });
        },
    });

    const postDailySharingMutation = useMutation({
        mutationFn: (e: React.KeyboardEvent<HTMLDivElement>) => handleAddDailySharing(e),
        onSuccess: async (res) => {
            setDailySharing('')
            queryClient.invalidateQueries({ queryKey: ["events", { date: time }] });
            if (res.status === 200 || res.status === 201) {
                await generateSuggestionMutation.mutate(res.data.id);
            }
        },
    });

    const handleAddDailySharing = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        return await backendAxiosInstance.post("/events", { event: dailySharing });
    }

    const handleGenerrateSuggetion = async (id: number) => {
        return await backendAxiosInstance.post("/suggestions", { eventId: id })
    }

    const updateSuggestionMutation = useMutation({
        mutationFn: async (rank: SuggestionRank) => await backendAxiosInstance.patch(`/suggestions/${suggestion?.id}`, { rank }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", dailySharings[0].id, "suggestions"] });
        },
    });

    const handleChangeRank = (rank: SuggestionRank) => {
        updateSuggestionMutation.mutate(rank);
    }

    const handleGenerateNewSuggestion = () => {
        handleChangeRank(SuggestionRank.NEW_SUGGESTION);
        generateSuggestionMutation.mutate(dailySharings[0]?.id);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>
    ) => {
        if (event.key === 'Enter' && dailySharing.trim().length && !postDailySharingMutation.isPending) {
            postDailySharingMutation.mutate(event)
        }
    }

    return (
        <Box sx={styles.container}>
            {
                isToday &&
                <>
                    <Typography sx={styles.title}>Did you do something <br></br>relaxing today?</Typography>
                    <TextField
                        value={dailySharing}
                        rows={2}
                        multiline={true}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => !postDailySharingMutation.isPending && setDailySharing(event.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={styles.dailySharingText}>
                    </TextField>
                </>
            }
            {suggestion &&
                <Card sx={styles.suggestionCard}>
                    <Typography sx={styles.suggestionText}>{suggestion.content}</Typography>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={() => handleChangeRank(SuggestionRank.LIKE)}
                            sx={{
                                ...styles.suggestionButton,
                                border: suggestion.rank === SuggestionRank.LIKE ? '1.5px solid #3A3A3A' : 'none'
                            }}>I liked it!</Button>
                        <Button
                            onClick={() => handleChangeRank(SuggestionRank.DID_NOT_HELP)}
                            sx={{
                                ...styles.suggestionButton,
                                border: suggestion.rank === SuggestionRank.DID_NOT_HELP ? '1.5px solid #3A3A3A' : 'none'
                            }}>It didn't help</Button>
                        <Button
                            onClick={() => handleChangeRank(SuggestionRank.DID_NOT_LIKE)}
                            sx={{
                                ...styles.suggestionButton,
                                border: suggestion.rank === SuggestionRank.DID_NOT_LIKE ? '1.5px solid #3A3A3A' : 'none'
                            }}>I didn't liked it</Button>
                        <Button
                            onClick={() => handleGenerateNewSuggestion()}
                            sx={styles.suggestionButton}>Generate another</Button>
                    </Box>
                </Card>
            }
            <Box sx={styles.listContainer}>
                {
                    dailySharings?.length > 0 ?
                        dailySharings.map((item =>
                            <Card key={item.id} sx={styles.dailySharingCard}>{item.content}</Card>
                        )) :
                        !isToday &&
                        <>{isDayPass ?
                            <Typography variant='h2'>
                                No sharings found on {day}/{month}/{year}.
                            </Typography> : <Typography variant='h2'>
                                The day {day}/{month}/{year} has not occurred yet.
                            </Typography>
                        }</>
                }
            </Box>
        </Box >
    );
};

export default SuggestionPage;
