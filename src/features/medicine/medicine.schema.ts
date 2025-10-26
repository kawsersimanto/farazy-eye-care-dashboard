import { z } from "zod";

export const MedicineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  genericName: z.string().min(1, "Generic Name is required"),
  strength: z.string().optional(),
  unit: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  sideEffects: z.string().optional(),
  dosageForm: z.string().optional(),
  routeOfAdmin: z.string().optional(),
  unitPrice: z.number().optional(),
  mrp: z.number().optional(),
  isPrescriptionOnly: z
    .boolean({
      message: "Is PrescriptionOnly is required",
    })
    .optional(),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
  isActive: z.boolean({
    message: "Status is required",
  }),
});

export type MedicineFormValues = z.infer<typeof MedicineSchema>;
