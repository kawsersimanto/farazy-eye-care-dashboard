import { z } from "zod";

export const EmployeeSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ error: "Invalid Email" }),
});

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;
