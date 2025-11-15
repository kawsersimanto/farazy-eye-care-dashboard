import { z } from "zod";

export const ScheduleSchema = z.object({});

export type ScheduleSchemaType = z.infer<typeof ScheduleSchema>;
