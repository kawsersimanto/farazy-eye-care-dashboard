"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const PrescriptionSkeleton = () => {
  return (
    <div className="animate-pulse p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>

      <Separator className="my-5" />

      {/* Consultant row */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-64 rounded-md" />
          <Skeleton className="h-3 w-40 rounded-md" />
        </div>
        <div className="w-48 space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-3 w-28 rounded-md" />
        </div>
      </div>

      <Separator className="my-5" />

      {/* Form layout: left (medical notes) and right (medicine list) */}
      <div className="grid grid-cols-[1fr_3fr] gap-10">
        {/* Medical notes column */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>

        {/* Medicine list column */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />

          {/* Simulate a list of medicine rows */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48 rounded-md" />
                  <Skeleton className="h-3 w-28 rounded-md" />
                </div>
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            ))}
          </div>

          {/* Eye examination toggle area */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-12 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>

          {/* Expanded eye exam placeholder */}
          <div className="space-y-2">
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* Action buttons (bottom-right) */}
      <div className="flex justify-end mt-8 space-x-3">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </div>
  );
};
