"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const MedicinePreloader = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-6 w-40 mb-2" /> {/* Medicine Name */}
          <Skeleton className="h-4 w-32" /> {/* Generic Name */}
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" /> {/* Status Badge */}
          <Skeleton className="h-6 w-14 rounded-full" /> {/* Rx Only Badge */}
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      <Separator className="mb-4" />

      {/* Category & Brand */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Pricing */}
      <div className="mb-6">
        <Skeleton className="h-4 w-20 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div>
            <Skeleton className="h-3 w-12 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <Skeleton className="h-4 w-28 mb-3" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>

      {/* Side Effects */}
      <div className="mb-6">
        <Skeleton className="h-4 w-28 mb-3" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Timestamps */}
      <Separator className="mb-4" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  );
};
