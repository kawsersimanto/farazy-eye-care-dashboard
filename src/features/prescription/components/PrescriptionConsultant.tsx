"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetDoctorScheduleByIdQuery } from "@/features/schedule/schedule.api";
import { formatScheduleWithTime } from "@/utils/date";

export const PrescriptionConsultant = () => {
  const { profile } = useAuth();
  const doctor = profile?.doctorProfile;
  const id = profile?.id as string;
  const { data: scheduleData } = useGetDoctorScheduleByIdQuery(id, {
    skip: !id,
  });
  const schedules = scheduleData?.data || [];

  return (
    <div className="grid grid-cols-2 gap-4 items-center justify-between">
      <div>
        <h2 className="text-3xl text-foreground tracking-tight">
          {profile?.name}
        </h2>
        <div>{doctor?.title}</div>
        <div>{doctor?.qualifications?.join(", ")}</div>
        <div>{doctor?.degrees?.join(", ")}</div>
      </div>
      <div className="flex items-center justify-end">
        <div className="border border-border rounded-lg overflow-hidden max-w-[280px] text-center">
          <div className="text-center py-2 px-5 bg-primary text-white font-medium">
            Consultant Time
          </div>
          <div className="px-5 py-3 text-sm">
            {formatScheduleWithTime(schedules)}
          </div>
        </div>
      </div>
    </div>
  );
};
