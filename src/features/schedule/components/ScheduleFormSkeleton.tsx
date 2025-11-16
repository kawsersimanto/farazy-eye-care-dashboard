"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const ScheduleFormSkeleton = () => {
  return (
    <div className="space-y-5 py-5">
      {/* Doctor ID (hidden in real form) */}
      <div className="sr-only space-y-2">
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Day Of Week */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Start / End Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      {/* slotMinutes & maxPatients (hidden in real form) */}
      <div className="sr-only space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Status select */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-40 rounded-md" />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};
