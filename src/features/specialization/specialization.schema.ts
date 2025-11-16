import { z } from "zod";

export const SpecializationSchema = z.object({});

export type SpecializationSchemaType = z.infer<typeof SpecializationSchema>;
