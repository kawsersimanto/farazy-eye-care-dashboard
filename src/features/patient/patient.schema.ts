import { z } from "zod";
import { IBloodGroup, IGender } from "../user/user.interface";

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dateOfBirth: z.date({ error: "Invalid date of birth" }),
  gender: z.enum(Object.values(IGender), {
    error: "Gender must be MALE, FEMALE, or OTHER",
  }),
  bloodGroup: z.enum(Object.values(IBloodGroup), {
    error: "blood must be O+, O-, A+, A-, B+, B-, AB+, or AB-",
  }),
  address: z
    .string()
    .transform((v) => v ?? "")
    .optional(),
  emergencyPhone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, "Invalid emergency phone number")
    .transform((v) => v ?? "")
    .optional(),
  branchId: z.string().min(1, "Branch ID is required"),
});

export type PatientFormValue = z.infer<typeof patientSchema>;
