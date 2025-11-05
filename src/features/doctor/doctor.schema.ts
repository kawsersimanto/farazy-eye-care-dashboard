import { z } from "zod";

export const DoctorSchema = z.object({});

export type DoctorSchemaType = z.infer<typeof DoctorSchema>;
