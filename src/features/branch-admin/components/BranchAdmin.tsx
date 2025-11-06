"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MedicinePreloader } from "@/features/medicine/components/MedicinePreloader";
import Image from "next/image";
import { useGetBranchAdminByIdQuery } from "../branch-admin.api";

export const BranchAdmin = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetBranchAdminByIdQuery(id);
  const adminData = data?.data;

  if (isLoading) return <MedicinePreloader />;

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            <div className="flex items-center gap-2">
              <Image
                src={adminData?.profileImageUrl || "placeholder.png"}
                alt={adminData?.name || "Admin Photo"}
                height={120}
                width={120}
                className="h-[90px] w-[90px] object-contain rounded-lg border border-border"
                unoptimized
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
              <div className="flex flex-col">
                <span className="font-medium text-2xl">
                  {adminData?.name || "Not Set"}
                </span>
                <CopyableCell
                  value={adminData?.email || "-"}
                  className="text-xs"
                >
                  {adminData?.email || "-"}
                </CopyableCell>
              </div>
            </div>
          </CardTitle>
        </div>

        <div className="flex gap-2">
          <Badge variant={adminData?.isActive ? "default" : "secondary"}>
            {adminData?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Email
          </h4>
          <CopyableCell value={adminData?.email || "-"}>
            <p className="text-sm font-medium">{adminData?.email || "-"}</p>
          </CopyableCell>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Phone
          </h4>
          <CopyableCell value={adminData?.phone || "-"}>
            <p className="text-sm font-medium">{adminData?.phone || "-"}</p>
          </CopyableCell>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Role
          </h4>
          <Badge variant="outline">{adminData?.role || "-"}</Badge>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Branch
          </h4>
          <CopyableCell value={adminData?.branchId || "-"}>
            <p className="text-sm font-medium">
              {adminData?.branch?.name || "-"}
            </p>
          </CopyableCell>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Created At
          </h4>
          <p className="text-xs text-muted-foreground">
            {adminData?.createdAt
              ? new Date(adminData.createdAt).toLocaleString()
              : "-"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Updated At
          </h4>
          <p className="text-xs text-muted-foreground">
            {adminData?.updatedAt
              ? new Date(adminData.updatedAt).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};
