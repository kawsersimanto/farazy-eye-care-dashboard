import { z } from "zod";

export const MedicineBrandSchema = z.object({});

export type MedicineBrandSchemaType = z.infer<typeof MedicineBrandSchema>;
