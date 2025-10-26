"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetDepartmentByIdQuery } from "../department.api";
import { DepartmentFormSkeleton } from "./DepartmentFormSkeleton";

export const DepartmentPreview = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDepartmentByIdQuery(id);
  const department = data?.data;

  if (isLoading) return <DepartmentFormSkeleton />;

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {department?.name}
          </CardTitle>
          <Badge variant={department?.isActive ? "default" : "secondary"}>
            {department?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Alias: {department?.alias || "—"}
        </p>
      </div>

      <Separator className="mt-5 mb-2" />

      <div className="pt-4 space-y-3">
        <div>
          <h4 className="text-sm font-bold">Description</h4>
          <p className="text-sm mt-1 text-foreground">
            {department?.description || "No description provided."}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <p>
            Created:{" "}
            {new Date(department?.createdAt as string).toLocaleDateString()}
          </p>
          <p>
            Updated:{" "}
            {new Date(department?.updatedAt as string).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
