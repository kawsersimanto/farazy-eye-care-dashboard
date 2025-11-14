import { z } from "zod";
import { profileSchema } from "./profile.schema";

export const employeeSchema = profileSchema.extend({
  department: z.string().optional(),
  position: z.string().optional(),
  salary: z.number().optional(),
});

export type employeeSchemaType = z.infer<typeof employeeSchema>;
