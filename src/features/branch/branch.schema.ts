import { z } from "zod";

export const BranchSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  code: z.string().min(1, {
    message: "Code is required",
  }),
  logoUrl: z.string().min(1, "Logo is required"),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  addressLine1: z.string().min(1, {
    message: "Address line 1 is required",
  }),
  addressLine2: z.string().min(1, "Address line 2 is required"),
  city: z.string().min(1, {
    message: "City is required",
  }),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
  isActive: z.boolean({
    message: "Status is required",
  }),
});

export type BranchFormValues = z.infer<typeof BranchSchema>;
