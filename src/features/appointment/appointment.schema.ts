import { z } from "zod";

export const AppointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  gender: z.string().min(1, "Gender is required"),
  branchId: z.string().min(1, "Branch ID is required"),
  doctorId: z.string().min(1, "Doctor ID is required"),
  age: z.number("Age is required"),
  notes: z.string().optional(),
  scheduledAt: z.date(),
});

export type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;
