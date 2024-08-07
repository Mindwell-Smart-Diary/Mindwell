import { z } from "zod";

export const suggestionPatchSchema = z.object({
  rank: z.number().optional(),
  executionDate: z.date().optional(),
});
