"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetEmployeeByIdQuery } from "@/features/employee/employee.api";
import { MedicinePreloader } from "@/features/medicine/components/MedicinePreloader";
import Image from "next/image";

export const Employee = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetEmployeeByIdQuery(id);
  const employeeData = data?.data;
  const employeeProfile = employeeData?.employeeProfile;

  if (isLoading) return <MedicinePreloader />;

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            <div className="flex items-center gap-2">
              <Image
                src={employeeData?.profileImageUrl || "placeholder.png"}
                alt={employeeData?.name || "Employee Photo"}
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
                  {employeeData?.name || "Not Set"}
                </span>
                <CopyableCell
                  value={employeeData?.email || "-"}
                  className="text-xs"
                >
                  {employeeData?.email || "-"}
                </CopyableCell>
              </div>
            </div>
          </CardTitle>
        </div>

        <div className="flex gap-2">
          <Badge variant={employeeData?.isActive ? "default" : "secondary"}>
            {employeeData?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Phone
          </h4>
          <CopyableCell value={employeeData?.phone || "-"}>
            <p className="text-sm font-medium">{employeeData?.phone || "-"}</p>
          </CopyableCell>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Position
          </h4>
          <p className="text-sm font-medium">
            {employeeProfile?.position || "—"}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Department
          </h4>
          <p className="text-sm font-medium">
            {employeeProfile?.department || "—"}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Employee ID
          </h4>
          <p className="text-sm font-medium">
            {employeeProfile?.employeeId || "—"}
          </p>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Employment Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-medium mb-1">Salary</h4>
          <p className="text-sm text-foreground">
            {employeeProfile?.salary
              ? `৳${employeeProfile.salary.toLocaleString()}`
              : "-"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Branch</h4>
          <CopyableCell value={employeeData?.branchId || "-"}>
            <p className="text-sm text-foreground">
              {employeeData?.branch?.name || "-"}
            </p>
          </CopyableCell>
        </div>

        {/* <div>
          <h4 className="text-sm font-medium mb-1">Joined Date</h4>
          <p className="text-sm text-foreground">
            {employeeProfile?.joinedAt
              ? new Date(employeeProfile.joinedAt).toLocaleDateString()
              : "-"}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Role</h4>
          <Badge variant="outline">{employeeData?.role || "-"}</Badge>
        </div> */}
      </div>

      <Separator className="mb-4" />

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Created At
          </h4>
          <p className="text-xs text-muted-foreground">
            {employeeData?.createdAt
              ? new Date(employeeData.createdAt).toLocaleString()
              : "-"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Updated At
          </h4>
          <p className="text-xs text-muted-foreground">
            {employeeData?.updatedAt
              ? new Date(employeeData.updatedAt).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};
