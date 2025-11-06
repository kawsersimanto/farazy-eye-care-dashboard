import { z } from "zod";

export const BranchAdminSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ error: "Invalid Email" }),
});

export type BranchAdminSchemaType = z.infer<typeof BranchAdminSchema>;
