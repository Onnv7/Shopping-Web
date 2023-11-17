import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    rePassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "New password and re-entered password must match",
    path: ["rePassword"],
  });
