import { z } from "zod";

export const MedicineBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  country: z.string().min(1, "Country is required"),
  isActive: z.boolean({
    message: "Status is required",
  }),
});

export type MedicineBrandValues = z.infer<typeof MedicineBrandSchema>;
