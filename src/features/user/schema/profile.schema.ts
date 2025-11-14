import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string("Phone number must be string").optional(),
  profileImageUrl: z.string().optional(),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type profileSchemaType = z.infer<typeof profileSchema>;
export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
