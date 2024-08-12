import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { TextField, Button, Card, Typography, Box } from '@mui/material';
import * as styles from "./styles";
import { SuggestionRank } from '@/types/enums/SuggestionRank';
import { DailySharing } from '@/types/DailySharing';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDateByYearMonthDay } from '@/utilities/DateUtils';
import { backendAxiosInstance } from '@/axios/backendInstance';

const SuggestionPage: React.FC = () => {
    const [dailySharing, setDailySharing] = useState<string>('');
    // const [dailySharings, setDailySharings] = useState<DailySharing[]>([]);
    // const [suggestion, setSuggestion] = useState<string>('');
    const [chosenRank, setChosenRank] = useState<SuggestionRank>();

    const { year, month, day } = useParams();

    const queryClient = useQueryClient();

    const time = useMemo(() =>
        getDateByYearMonthDay(Number(year), Number(month), Number(day)).getTime(),
        [year, month, day]);

    const {
        data: dailySharings,
        isLoading: isDailySharingsLoading,
        isError: isDailySharingsError,
    } = useQuery<DailySharing[]>({
        initialData: [],
        queryKey: ["events", { date: time }],
        queryFn: async () => {
            const events: DailySharing[] = (await backendAxiosInstance.get("/events", {
                params: {
                    date: time
                }
            })).data;

            return events.sort((a, b) => a.date.getTime() - b.date.getTime());
        },
    });

    const {
        data: suggestion,
        isLoading: isSuggestionLoading,
        isError: isSuggestionError,
    } = useQuery<string>({
        enabled: dailySharings.length > 0,
        queryKey: ["events", dailySharings[-1]?.id, "suggestions"],
        queryFn: async () => (await backendAxiosInstance.get(`/events/${dailySharings[-1]?.id}/suggestions`)).data.suggestion,
    });

    const postDailySharingMutation = useMutation({
        mutationFn: (e: React.KeyboardEvent<HTMLDivElement>) => handleAddDailySharing(e),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", { date: time }] });
            queryClient.invalidateQueries({ queryKey: ["events", dailySharings[-1].id, "suggestions"] });
            setDailySharing('')
            setChosenRank(undefined);
            // event.preventDefault()
        },
    });

    useEffect(() => {
        console.log({ year, month, day })
    }, [year, month, day])

    const handleAddDailySharing = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && dailySharing.trim().length) {
            const postDailySharingResponse = await backendAxiosInstance.post("/events", { event: dailySharing });
            if (postDailySharingResponse.status === 201) {
                await backendAxiosInstance.post("/suggestions", { eventId: postDailySharingResponse.data.id });
            }

            // setDailySharing('')
            // setChosenRank(undefined);
            // event.preventDefault()
        }
    }

    const handleChangeRank = (rank: SuggestionRank) => {
        // Todo: update rank and execution date in the server
        setChosenRank(rank);
    }

    const handleGenerateSuggestion = () => {
        // Todo: get new suggestion from the server
        setChosenRank(undefined);
        // setSuggestion('I want to give you another suggestion... ' + Math.random())
    }

    return (
        <Box sx={styles.container}>
            <Typography sx={styles.title}>Did you do something <br></br>relaxing today?</Typography>
            <TextField
                value={dailySharing}
                rows={2}
                multiline={true}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setDailySharing(event.target.value)}
                onKeyDown={(event) => postDailySharingMutation.mutate(event)}
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
                {dailySharings?.map((item =>
                    <Card key={item.id} sx={styles.dailySharingCard}>{item.content}</Card>
                ))}
            </Box>
        </Box>
    );
};

export default SuggestionPage;
