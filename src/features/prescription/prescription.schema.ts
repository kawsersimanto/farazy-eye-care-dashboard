import { z } from "zod";

export const PrescriptionSchema = z.object({
  cc: z.string().optional(),
  oe: z.string().optional(),
  var: z.string().optional(),
  antSegment: z.string().optional(),
  postSegment: z.string().optional(),
  medicine: z
    .array(
      z.object({
        name: z.string().min(1, "Medicine name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        mealTiming: z.string().optional(),
        duration: z.string().optional(),
        instruction: z.string().optional(),
      })
    )
    .min(1, "At least one medicine is required"),
});

export type PrescriptionSchemaType = z.infer<typeof PrescriptionSchema>;
