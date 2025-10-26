"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMedicineCategoryByIdQuery } from "../medicine-category.api";
import { MedicineCategoryFormSkeleton } from "./MedicineCategoryFormSkeleton";

export const MedicineCategory = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetMedicineCategoryByIdQuery(id);
  const medicineCategory = data?.data;

  if (isLoading) return <MedicineCategoryFormSkeleton />;

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {medicineCategory?.name}
          </CardTitle>
          <Badge variant={medicineCategory?.isActive ? "default" : "secondary"}>
            {medicineCategory?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mt-1">
          Description: {medicineCategory?.description || "Not set"}
        </p>
      </div>

      <Separator className="mt-5" />

      <div className="pt-4 space-y-0">
        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <p>
            Created:{" "}
            {new Date(
              medicineCategory?.createdAt as string
            ).toLocaleDateString()}
          </p>
          <p>
            Last Updated:{" "}
            {new Date(
              medicineCategory?.updatedAt as string
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
