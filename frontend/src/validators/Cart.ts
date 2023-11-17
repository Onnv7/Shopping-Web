import { z } from "zod";

export const deliveringSchema = z.object({
  address: z.string().min(1),
  phoneNumber: z.string().min(10),
});
