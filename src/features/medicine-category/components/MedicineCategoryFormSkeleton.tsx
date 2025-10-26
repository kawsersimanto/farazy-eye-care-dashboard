"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const MedicineCategoryFormSkeleton = () => {
  return (
    <div className="space-y-5 py-5">
      {/* Name field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
      </div>

      {/* Description field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" /> {/* Label */}
        <Skeleton className="h-24 w-full rounded-md" /> {/* Textarea */}
      </div>

      {/* Status field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Select */}
      </div>

      {/* Submit button */}
      <div>
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  );
};
