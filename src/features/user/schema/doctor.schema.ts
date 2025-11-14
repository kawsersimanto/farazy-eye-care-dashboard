import { z } from "zod";
import { profileSchema } from "./profile.schema";

export const doctorSchema = profileSchema.extend({
  about: z.string().optional(),
  registrationNo: z.string().optional(),
  yearsExperience: z.number().optional(),
  consultationFee: z.number().optional(),
  degrees: z.array(z.string()).optional(),
  qualifications: z.array(z.string()).optional(),
});

export type doctorSchemaType = z.infer<typeof doctorSchema>;
