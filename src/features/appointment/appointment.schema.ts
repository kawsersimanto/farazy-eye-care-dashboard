import { z } from "zod";

export const AppointmentSchema = z.object({});

export type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;
