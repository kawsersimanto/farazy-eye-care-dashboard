import { z } from "zod";

export const userSchema = z.object({});

export type UserSchemaType = z.infer<typeof userSchema>;
