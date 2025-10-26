"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMedicineBrandByIdQuery } from "../medicine-brand.api";
import { MedicineBrandSkeleton } from "./MedicineBrandSkeleton";

export const MedicineBrand = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetMedicineBrandByIdQuery(id);
  const medicineBrand = data?.data;
  console.log(medicineBrand);

  if (isLoading) return <MedicineBrandSkeleton />;

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {medicineBrand?.name}
          </CardTitle>
          <Badge variant={medicineBrand?.isActive ? "default" : "secondary"}>
            {medicineBrand?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Alias: {medicineBrand?.manufacturer || "—"}
        </p>
      </div>

      <Separator className="mt-5" />

      <div className="pt-4 space-y-0">
        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <p>
            Created:{" "}
            {new Date(medicineBrand?.createdAt as string).toLocaleDateString()}
          </p>
          <p>
            Last Updated:{" "}
            {new Date(medicineBrand?.updatedAt as string).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
