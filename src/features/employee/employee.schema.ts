import { z } from "zod";

export const EmployeeSchema = z.object({});

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;
