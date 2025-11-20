import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PrescriptionMedicineCardSkeleton = () => {
  return (
    <Card className="p-3 gap-2">
      <div className="flex items-start justify-between gap-1 mb-2">
        <Skeleton className="h-4 w-40 rounded" />
        <Skeleton className="h-4 w-6 rounded" />
      </div>

      <div className="flex justify-between gap-2">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </Card>
  );
};
