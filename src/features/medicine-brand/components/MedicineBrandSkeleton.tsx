import { Skeleton } from "@/components/ui/skeleton";

export const MedicineBrandSkeleton = () => {
  return (
    <div className="space-y-5 py-5">
      {/* Name */}
      <div>
        <div className="mb-2 h-4">
          <Skeleton className="h-full w-full rounded-sm" />
        </div>
        <div className="h-10 w-full">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </div>

      {/* Alias */}
      <div>
        <div className="mb-2 h-4">
          <Skeleton className="h-full w-full rounded-sm" />
        </div>
        <div className="h-10 w-full">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </div>

      {/* Status (select) */}
      <div>
        <div className="mb-2 h-4">
          <Skeleton className="h-full w-full rounded-sm" />
        </div>
        <div className="h-10 w-40">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </div>

      {/* Description (textarea) */}
      <div>
        <div className="mb-2 h-4 w-28">
          <Skeleton className="h-full w-full rounded-sm" />
        </div>
        <div className="h-28 w-full">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <div className="inline-block h-10 w-28">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};
