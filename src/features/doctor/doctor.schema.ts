import { z } from "zod";

export const DoctorSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ error: "Invalid Email" }),
});

export type DoctorSchemaType = z.infer<typeof DoctorSchema>;
