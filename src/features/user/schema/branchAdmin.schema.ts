import { z } from "zod";
import { profileSchema } from "./profile.schema";

export const branchAdminSchema = profileSchema.extend({});

export type branchAdminSchemaType = z.infer<typeof branchAdminSchema>;
