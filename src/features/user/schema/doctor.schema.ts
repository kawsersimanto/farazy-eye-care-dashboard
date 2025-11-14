import { z } from "zod";
import { profileSchema } from "./profile.schema";

export const doctorSchema = profileSchema.extend({});

export type doctorSchemaType = z.infer<typeof doctorSchema>;
