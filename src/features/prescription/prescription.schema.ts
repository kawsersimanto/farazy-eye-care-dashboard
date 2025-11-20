import { z } from "zod";

const EyeExaminationSchema = z.object({
  sph: z.string().optional(),
  cyl: z.string().optional(),
  axis: z.string().optional(),
  bcva: z.string().optional(),
});

export const PrescriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z.number("Age must be number"),
  prescribeDate: z.date(),
  cc: z.string().optional(),
  oe: z.string().optional(),
  var: z.string().optional(),
  antSegment: z.string().optional(),
  postSegment: z.string().optional(),
  medicine: z
    .array(
      z.object({
        id: z.string().min(1, "Medicine ID is required"),
        name: z.string().min(1, "Medicine name is required"),
        timing: z.string().min(1, "Timing is required"),
        mealTiming: z.string().optional(),
        duration: z.string().optional(),
        instruction: z.string().optional(),
      })
    )
    .min(1, "At least one medicine is required"),
  rightEye: EyeExaminationSchema,
  leftEye: EyeExaminationSchema,
  add: z.string().optional(),
  ipd: z.string().optional(),
  mm: z.string().optional(),
  advice: z.string().optional(),
});

export type PrescriptionSchemaType = z.infer<typeof PrescriptionSchema>;
