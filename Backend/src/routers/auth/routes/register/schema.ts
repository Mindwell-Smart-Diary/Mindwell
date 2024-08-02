import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  gender: z.enum(["male", "female", "other"]),
  birthdate: z.date(),
});
