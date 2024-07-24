import { z } from "zod";

export const queryParamsSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(0),
});
