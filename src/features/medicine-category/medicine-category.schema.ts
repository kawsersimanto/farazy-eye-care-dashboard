import { z } from "zod";

export const MedicineCategorySchema = z.object({});

export type MedicineCategorySchemaType = z.infer<typeof MedicineCategorySchema>;
