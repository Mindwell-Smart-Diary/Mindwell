import React, { useState, ChangeEvent, useMemo } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import * as styles from "./styles";
import { SuggestionRank } from "@/types/enums/SuggestionRank";
import { DailySharing } from "@/types/DailySharing";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDateByYearMonthDay } from "@/utilities/DateUtils";
import { backendAxiosInstance } from "@/axios/backendInstance";
import { Suggestion } from "@/types/Suggestion";
import { LoadingButton } from "@/components/loadingButton/LoadingButton";
import { useLoadingText } from "@/hooks/useLoadingText";
import { HappyIcon } from "@/components/icons/HappyIcon";
import { EmotionlessIcon } from "@/components/icons/EmotionlessIcon";
import { SadIcon } from "@/components/icons/SadIcon";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SuggestionPage: React.FC = () => {
  const [dailySharing, setDailySharing] = useState<string>("");
  const loadingText = useLoadingText();
  const { year, month, day } = useParams();

  const isToday = useMemo(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    return (
      todayDay === Number(day) &&
      todayMonth === Number(month) &&
      todayYear === Number(year)
    );
  }, [year, month, day]);

  const isDayPass = useMemo(() => {
    const today = new Date();
    const targetDate = new Date(Number(year), Number(month) - 1, Number(day));

    return targetDate < today;
  }, [year, month, day]);

  const queryClient = useQueryClient();

  const time = useMemo(
    () =>
      getDateByYearMonthDay(Number(year), Number(month), Number(day)).getTime(),
    [year, month, day]
  );

  const { data: dailySharings } = useQuery<DailySharing[]>({
    initialData: [],
    queryKey: ["events", { date: time }],
    queryFn: async () => {
      const events: DailySharing[] = (
        await backendAxiosInstance.get("/events", {
          params: {
            date: time,
          },
        })
      ).data;

      return events.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
  });

  const { data: suggestion } = useQuery<Suggestion>({
    enabled: dailySharings.length > 0,
    queryKey: ["events", dailySharings[0]?.id, "suggestions"],
    queryFn: async () => {
      const suggestions: Suggestion[] = (
        await backendAxiosInstance.get(
          `/events/${dailySharings[0]?.id}/suggestions`
        )
      ).data;
      return suggestions.sort((a, b) => b.id - a.id)[0];
    },
  });

  const generateSuggestionMutation = useMutation({
    mutationFn: (id: number) => handleGenerateSuggestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", dailySharings[0].id, "suggestions"],
      });
    },
  });

  const postDailySharingMutation = useMutation({
    mutationFn: (e: React.KeyboardEvent<HTMLDivElement> | undefined) =>
      handleAddDailySharing(e),
    onSuccess: async (res) => {
      setDailySharing("");
      queryClient.invalidateQueries({ queryKey: ["events", { date: time }] });
      if (res.status === 200 || res.status === 201) {
        await generateSuggestionMutation.mutate(res.data.id);
      }
    },
    onError: async (res) => {
      console.log(res);
    },
  });

  const handleAddDailySharing = async (
    event?: React.KeyboardEvent<HTMLDivElement>
  ) => {
    event?.preventDefault();
    return await backendAxiosInstance.post("/events", { event: dailySharing });
  };

  const handleGenerateSuggestion = async (id: number) => {
    return await backendAxiosInstance.post("/suggestions", { eventId: id });
  };

  const updateSuggestionMutation = useMutation({
    mutationFn: async (rank: SuggestionRank) =>
      await backendAxiosInstance.patch(`/suggestions/${suggestion?.id}`, {
        rank,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", dailySharings[0].id, "suggestions"],
      });
    },
  });

  const handleChangeRank = (rank: SuggestionRank) => {
    updateSuggestionMutation.mutate(rank);
  };

  const handleGenerateNewSuggestion = () => {
    handleChangeRank(SuggestionRank.NEW_SUGGESTION);
    generateSuggestionMutation.mutate(dailySharings[0]?.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === "Enter" &&
      dailySharing.trim().length &&
      !postDailySharingMutation.isPending
    ) {
      postDailySharingMutation.mutate(event);
    }
  };

  return (
    <>
      <Box sx={styles.mainContainer}>
        <Box sx={styles.main}>
          {isToday ? (
            <>
              <Typography sx={styles.title}>
                Tell me about your day..
              </Typography>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <TextField
                  value={dailySharing}
                  rows={3}
                  multiline={true}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    !postDailySharingMutation.isPending &&
                    setDailySharing(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  sx={styles.dailySharingText}
                >
                </TextField>
                <Button
                  variant="contained"
                  sx={{ width: '2.5rem', minWidth: '0', p: '0.2rem' }}
                  disabled={!dailySharing.trim().length || postDailySharingMutation.isPending}
                  onClick={() => {

                    postDailySharingMutation.mutate(undefined);

                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: '1.2rem' }} />
                </Button>
              </Box>
            </>
          ) : (
            <Typography sx={{ alignSelf: "center" }} variant="h4">
              {day}/{month}/{year} Events
            </Typography>
          )}
          {postDailySharingMutation.isError ? (
            <Card sx={styles.suggestionCard}>
              I'm sorry, I am not sure I understood what you had on your mind.
              Do mind rephrasing or sharing a bit more?
            </Card>
          ) : postDailySharingMutation.isPending ? (
            <Card sx={styles.suggestionCard}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem" }}
                width={"35%"}
              />
              <Box
                height={20}
                display="flex"
                flexDirection="row"
                justifyContent={"space-between"}
              >
                <Box display="flex" flexDirection="row" gap={6}>
                  <Skeleton component={Button} />
                  <Skeleton component={Button} />
                  <Skeleton component={Button} />
                </Box>

                <Skeleton
                  //   variant="rectangular"
                  //   width="20%"
                  component={Button}
                />
              </Box>
            </Card>
          ) : (
            suggestion &&
            isToday && (
              <Card sx={styles.suggestionCard}>
                <Typography sx={styles.suggestionText}>
                  {generateSuggestionMutation.isPending
                    ? "Generating new suggestion" + loadingText
                    : suggestion.content}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" gap="1.5rem">
                    <Button
                      startIcon={<HappyIcon />}
                      onClick={() => handleChangeRank(SuggestionRank.LIKE)}
                      sx={{
                        ...styles.suggestionButton,
                        border:
                          suggestion.rank === SuggestionRank.LIKE
                            ? "1.5px solid white"
                            : "none",
                      }}
                    >
                      I liked it!
                    </Button>
                    <Button
                      startIcon={<EmotionlessIcon />}
                      onClick={() =>
                        handleChangeRank(SuggestionRank.DID_NOT_HELP)
                      }
                      sx={{
                        ...styles.suggestionButton,
                        border:
                          suggestion.rank === SuggestionRank.DID_NOT_HELP
                            ? "1.5px solid white"
                            : "none",
                      }}
                    >
                      It didn't help
                    </Button>
                    <Button
                      startIcon={<SadIcon />}
                      onClick={() =>
                        handleChangeRank(SuggestionRank.DID_NOT_LIKE)
                      }
                      sx={{
                        ...styles.suggestionButton,
                        border:
                          suggestion.rank === SuggestionRank.DID_NOT_LIKE
                            ? "1.5px solid white"
                            : "none",
                      }}
                    >
                      I didn't like it
                    </Button>
                  </Box>

                  <LoadingButton
                    isLoading={generateSuggestionMutation.isPending}
                    onClick={() => handleGenerateNewSuggestion()}
                    sx={styles.suggestionButton}
                  >
                    Generate another
                  </LoadingButton>
                </Box>
                <Typography variant="subtitle2">
                  {[
                    SuggestionRank.DID_NOT_LIKE,
                    SuggestionRank.DID_NOT_HELP,
                  ].includes(suggestion.rank ?? SuggestionRank.NEW_SUGGESTION)
                    ? " We are sorry to here that! You can always generate another suggestion and try something new"
                    : suggestion.rank === SuggestionRank.LIKE
                      ? "Great! You can still generate a new suggestion to get more activities or share new events"
                      : ""}
                </Typography>
              </Card>
            )
          )}
        </Box>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.listContainer}>
          {dailySharings?.length > 0
            ? dailySharings.map((item) => (
              <Card key={item.id} sx={styles.dailySharingCard}>
                {item.content}
              </Card>
            ))
            : !isToday && (
              <>
                {isDayPass ? (
                  <Typography variant="h6" sx={{ alignSelf: "center" }}>
                    No sharings found on this date
                  </Typography>
                ) : (
                  <Typography variant="h6" sx={{ alignSelf: "center" }}>
                    This day has not occurred yet
                  </Typography>
                )}
              </>
            )}
        </Box>
      </Box>
    </>
  );
};

export default SuggestionPage;
