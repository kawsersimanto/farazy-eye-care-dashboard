"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMedicineByIdQuery } from "../medicine.api";
import { MedicineFormSkeleton } from "./MedicineFormSkeleton";

export const Medicine = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetMedicineByIdQuery(id);
  const medicine = data?.data;

  if (isLoading) return <MedicineFormSkeleton />;

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            {medicine?.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {medicine?.genericName}
          </p>
        </div>

        <div className="flex gap-2">
          <Badge variant={medicine?.isActive ? "default" : "secondary"}>
            {medicine?.isActive ? "Active" : "Inactive"}
          </Badge>
          {medicine?.isPrescriptionOnly && (
            <Badge variant="outline">Rx Only</Badge>
          )}
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Strength
          </h4>
          <p className="text-sm font-medium">
            {medicine?.strength
              ? `${medicine?.strength} ${medicine?.unit || ""}`
              : "—"}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Type
          </h4>
          <p className="text-sm font-medium">{medicine?.type || "—"}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Dosage Form
          </h4>
          <p className="text-sm font-medium">{medicine?.dosageForm || "—"}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Route of Administration
          </h4>
          <p className="text-sm font-medium">{medicine?.routeOfAdmin || "—"}</p>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Category & Brand */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {medicine?.category && (
          <div>
            <h4 className="text-sm font-bold mb-1">Category</h4>
            <p className="text-sm text-foreground">{medicine?.category.name}</p>
          </div>
        )}

        {medicine?.brand && (
          <div>
            <h4 className="text-sm font-bold mb-1">Brand</h4>
            <p className="text-sm text-foreground">{medicine?.brand.name}</p>
          </div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Pricing */}
      <div className="mb-6">
        <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
          Pricing
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Unit Price</p>
            <p className="text-sm font-semibold">
              {medicine?.unitPrice ? `৳${medicine?.unitPrice.toFixed(2)}` : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">MRP</p>
            <p className="text-sm font-semibold">
              {medicine?.mrp ? `৳${medicine?.mrp.toFixed(2)}` : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {medicine?.description && (
        <div className="mb-6">
          <h4 className="text-sm font-bold mb-2">Description</h4>
          <p className="text-sm text-foreground leading-relaxed">
            {medicine?.description}
          </p>
        </div>
      )}

      {/* Side Effects */}
      {medicine?.sideEffects && (
        <div className="mb-6">
          <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
            Side Effects
          </h4>
          <p className="text-sm text-foreground leading-relaxed">
            {medicine?.sideEffects}
          </p>
        </div>
      )}

      {/* Timestamps */}
      <Separator className="mb-4" />
      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
        <p>
          Created:{" "}
          {medicine?.createdAt
            ? new Date(medicine?.createdAt).toLocaleDateString()
            : "—"}
        </p>
        <p>
          Updated:{" "}
          {medicine?.updatedAt
            ? new Date(medicine?.updatedAt).toLocaleDateString()
            : "—"}
        </p>
      </div>
    </div>
  );
};
