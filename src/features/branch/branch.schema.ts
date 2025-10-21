import { z } from "zod";

export const BranchSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  logoUrl: z.string(),
  addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
  addressLine2: z.string(),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  isActive: z.boolean({
    error: "Active status is required",
  }),
});

export type IBranch = z.infer<typeof BranchSchema>;
