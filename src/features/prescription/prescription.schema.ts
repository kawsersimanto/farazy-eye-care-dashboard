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
        name: z.string().min(1, "Feature name is required"),
        description: z.string().min(1, "Feature description is required"),
      })
    )
    .min(1, "At least one feature is required"),
});

export type PrescriptionSchemaType = z.infer<typeof PrescriptionSchema>;
