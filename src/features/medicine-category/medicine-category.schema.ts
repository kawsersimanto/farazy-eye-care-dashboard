import { z } from "zod";

export const MedicineCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean({
    message: "Status is required",
  }),
});

export type MedicineCategoryValues = z.infer<typeof MedicineCategorySchema>;
