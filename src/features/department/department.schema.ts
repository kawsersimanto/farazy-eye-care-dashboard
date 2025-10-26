import { z } from "zod";

export const DepartmentSchema = z.object({});

export type DepartmentSchemaType = z.infer<typeof DepartmentSchema>;
