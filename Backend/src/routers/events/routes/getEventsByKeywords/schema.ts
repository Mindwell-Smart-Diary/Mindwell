import { z } from "zod";

export const queryParamsSchema = z.object({
  prefix: z.string(),
});
