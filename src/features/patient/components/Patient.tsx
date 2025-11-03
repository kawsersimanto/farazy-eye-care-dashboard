"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MedicinePreloader } from "@/features/medicine/components/MedicinePreloader";
import { useGetUserByIdQuery } from "@/features/user/user.api";
import { getAgeFromISO } from "@/utils/date";

export const Patient = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetUserByIdQuery(id);
  const patientData = data?.data;
  const patientProfile = patientData?.patientProfile;

  if (isLoading) return <MedicinePreloader />;

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            {patientData?.name || "Not found"}
          </CardTitle>
          <CopyableCell value={patientData?.email || "-"}>
            <p className="text-sm text-muted-foreground mt-1">
              {patientData?.email || "-"}
            </p>
          </CopyableCell>
        </div>

        <div className="flex gap-2">
          <Badge variant={patientData?.isActive ? "default" : "secondary"}>
            {patientData?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Phone
          </h4>
          <CopyableCell value={patientData?.phone || "-"}>
            <p className="text-sm font-medium">{patientData?.phone}</p>
          </CopyableCell>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Age
          </h4>
          <p className="text-sm font-medium">
            {patientProfile?.dateOfBirth &&
              getAgeFromISO(patientProfile?.dateOfBirth)}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Gender
          </h4>
          <p className="text-sm font-medium">{patientProfile?.gender || "—"}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Emergency Phone
          </h4>
          <p className="text-sm font-medium">
            {patientProfile?.emergencyPhone || "—"}
          </p>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Category & Brand */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-bold mb-1">Blood Group</h4>
          <p className="text-sm text-foreground">
            {patientProfile?.bloodGroup || "-"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-1">Address</h4>
          <p className="text-sm text-foreground">
            {patientProfile?.address || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};
