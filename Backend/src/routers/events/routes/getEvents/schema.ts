import { z } from "zod";

export const queryParamsSchema = z.object({
  date: z.number().int().optional(),
  withSuggestions: z.boolean().optional(),
});
