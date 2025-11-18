import { z } from "zod";

export const PrescriptionSchema = z.object({});

export type PrescriptionSchemaType = z.infer<typeof PrescriptionSchema>;
