import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string("Phone number must be string").optional(),
  profileImageUrl: z.string().optional(),
});

export type profileSchemaType = z.infer<typeof profileSchema>;
