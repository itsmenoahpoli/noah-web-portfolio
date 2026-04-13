import { z } from "zod";

export const contactSubmissionSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.email("Please enter a valid email address").trim(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters"),
  country: z.string().trim().min(1, "Country is required"),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
