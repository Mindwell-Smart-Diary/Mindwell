import { z } from "zod";

export const userPatchSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    birthdate: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();
