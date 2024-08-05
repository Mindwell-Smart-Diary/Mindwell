import { z } from "zod";

export const suggestionSchema = z.object({
  eventId: z.number(),
});
