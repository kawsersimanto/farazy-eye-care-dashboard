"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatTime, getDayName } from "@/utils/date";
import { useGetScheduleByIdQuery } from "../schedule.api";
import { ScheduleFormSkeleton } from "./ScheduleFormSkeleton";

export const Schedule = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetScheduleByIdQuery(id);
  const schedule = data?.data;

  if (isLoading) return <ScheduleFormSkeleton />;

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            {getDayName(schedule?.dayOfWeek || "-")}
          </CardTitle>
        </div>

        <div className="flex gap-2">
          <Badge variant={schedule?.isActive ? "default" : "secondary"}>
            {schedule?.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Day of Week
          </h4>
          <p className="text-sm font-medium">
            {getDayName(schedule?.dayOfWeek || "") || "—"}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Slot Duration
          </h4>
          <p className="text-sm font-medium">
            {schedule?.slotMinutes ? `${schedule?.slotMinutes} minutes` : "—"}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Start Time
          </h4>
          <p className="text-sm font-medium">
            <Badge variant="outline">
              {schedule?.startTime ? formatTime(schedule?.startTime) : "—"}
            </Badge>
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            End Time
          </h4>
          <p className="text-sm font-medium">
            <Badge variant="outline">
              {schedule?.endTime ? formatTime(schedule?.endTime) : "—"}
            </Badge>
          </p>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Timestamps */}
      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
        <p className="capitalize">
          Created: {schedule?.createdAt ? formatDate(schedule?.createdAt) : "—"}
        </p>
        <p className="capitalize">
          Updated: {schedule?.updatedAt ? formatDate(schedule?.updatedAt) : "—"}
        </p>
      </div>
    </div>
  );
};
