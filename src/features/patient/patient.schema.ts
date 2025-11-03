import { z } from "zod";

export const PatientSchema = z.object({});

export type PatientSchemaType = z.infer<typeof PatientSchema>;
