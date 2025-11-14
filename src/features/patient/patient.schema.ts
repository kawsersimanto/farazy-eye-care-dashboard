import { z } from "zod";
import { BLOOD_GROUPS, IGender } from "../user/user.interface";

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  dateOfBirth: z.date({ error: "Invalid date of birth" }),
  gender: z.enum(Object.values(IGender), {
    error: "Gender must be MALE, FEMALE, or OTHER",
  }),
  bloodGroup: z.enum(BLOOD_GROUPS, {
    error: "blood must be O+, O-, A+, A-, B+, B-, AB+, or AB-",
  }),
  address: z.string().optional(),
  emergencyPhone: z.string().optional(),
  branchId: z.string().min(1, "Branch ID is required"),
});

export const updatePatientSchema = patientSchema.extend({});

export type UpdatePatientFormValue = z.infer<typeof updatePatientSchema>;
export type PatientFormValue = z.infer<typeof patientSchema>;
