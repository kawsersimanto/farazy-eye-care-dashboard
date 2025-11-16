import { z } from "zod";

export const ScheduleSchema = z.object({
  doctorId: z.string().min(1),
  dayOfWeek: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  slotMinutes: z.number(),
  maxPatients: z.number(),
  isActive: z.boolean(),
});

export type ScheduleSchemaType = z.infer<typeof ScheduleSchema>;
