import { z } from "zod";

export const MedicineSchema = z.object({});

export type MedicineSchemaType = z.infer<typeof MedicineSchema>;
