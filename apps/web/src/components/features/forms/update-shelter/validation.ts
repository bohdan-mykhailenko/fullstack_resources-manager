import { z } from "zod";

export const updateShelterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  websiteUrl: z
    .string()
    .min(1, "Website URL is required")
    .url("Invalid URL format"),
  imageUrl: z
    .string()
    .min(1, "Image URL is required")
    .url("Invalid URL format"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone number format"),
});

export type UpdateShelterFormData = z.infer<typeof updateShelterSchema>;
