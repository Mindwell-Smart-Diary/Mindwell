import { z } from "zod";

export const createEventSchema = z.object({
  event: z.string(),
});
