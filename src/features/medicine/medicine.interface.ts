import { IMedicineBrand } from "@/features/medicine-brand/medicine-brand.interface";
import { IMedicineCategory } from "@/features/medicine-category/medicine-category.interface";

export interface IMedicine {
  id?: string;
  name: string;
  genericName: string;
  strength: string | null;
  unit: string | null;
  type: string | null;
  description: string | null;
  sideEffects: string | null;
  dosageForm: string | null;
  routeOfAdmin: string | null;
  unitPrice: number | null;
  mrp: number | null;
  isActive: boolean;
  isPrescriptionOnly: boolean | null;
  categoryId: string;
  brandId: string;
  brand?: IMedicineBrand;
  category?: IMedicineCategory;
  createdAt?: string;
  updatedAt?: string;
}
