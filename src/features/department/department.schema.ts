import { z } from "zod";

export const DepartmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  alias: z.string().min(1, "Alias is required"),
  branchId: z.string().min(1, "Branch ID is required"),
  isActive: z.boolean({
    message: "Status is required",
  }),
  description: z.string().min(1, "Description is required"),
});

export type DepartmentFormValues = z.infer<typeof DepartmentSchema>;
