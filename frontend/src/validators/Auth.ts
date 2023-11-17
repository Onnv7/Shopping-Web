import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6).max(32),
});

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(6),
  password: z.string().min(6),
});
