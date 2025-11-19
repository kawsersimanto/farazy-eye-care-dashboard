import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IMedicine } from "@/features/medicine/medicine.interface";

export const PrescriptionMedicineCard = ({
  medicine,
}: {
  medicine: IMedicine;
}) => {
  return (
    <Card className="p-3 gap-2 cursor-pointer hover:bg-secondary transition-colors duration-100 ease-in-out">
      <CardTitle className="flex items-start justify-between gap-1">
        <div className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-2">
          {medicine?.name || "-"}
        </div>
        {medicine?.isPrescriptionOnly && (
          <Badge
            variant="outline"
            className="text-red-500 bg-red-50 border-none rounded-[4px] text-xs shrink-0"
          >
            Rx
          </Badge>
        )}
      </CardTitle>
      <CardDescription>
        <div className="flex gap-1 justify-between">
          {medicine?.dosageForm && <div>{medicine?.dosageForm || "-"}</div>}
          {medicine?.strength && <div>{medicine?.strength || "-"}</div>}
        </div>
      </CardDescription>
    </Card>
  );
};
