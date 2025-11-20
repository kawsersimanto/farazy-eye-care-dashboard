import { z } from "zod";

export const PrescriptionPdfSchema = z.object({});

export type PrescriptionPdfSchemaType = z.infer<typeof PrescriptionPdfSchema>;
