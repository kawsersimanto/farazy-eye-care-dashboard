"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const MedicineFormSkeleton = () => {
  return (
    <div className="space-y-5 py-5">
      {/* Name */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Generic Name */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Strength */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Unit */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* Side Effects */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Dosage Form */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Route Of Admin */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Unit Price */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* MRP */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Prescription Only */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Submit Button */}
      <div>
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  );
};
