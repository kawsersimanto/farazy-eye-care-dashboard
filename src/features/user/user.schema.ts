import { UserRole } from "@/features/user/user.interface";
import { z } from "zod";

export const UserRoleEnum = z.enum(Object.values(UserRole));

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  emailVerified: z.boolean({ error: "Email verification status is required" }),
  phoneVerified: z.boolean({ error: "Phone verification status is required" }),
  profileImageUrl: z
    .string()
    .min(1, { message: "Profile image URL is required" })
    .url({ message: "Invalid URL format" }),
  isActive: z.boolean({ error: "Status is required" }),
  role: UserRoleEnum,
  branchId: z.string().min(1, { message: "Branch ID is required" }),
});

export type UserSchemaType = z.infer<typeof userSchema>;
