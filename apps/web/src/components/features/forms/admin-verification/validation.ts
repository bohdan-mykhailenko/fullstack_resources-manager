import { z } from "zod";

export const adminAuthSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export type AdminAuthFormData = z.infer<typeof adminAuthSchema>;
