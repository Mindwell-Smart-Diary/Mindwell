import { z } from "zod";

export const suggestionSchema = z.object({
  userId: z.number(),
  dailySharing: z.string(),
});
