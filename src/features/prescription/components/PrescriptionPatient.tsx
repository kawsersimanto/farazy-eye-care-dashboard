"use client";

import { useGetUserByIdQuery } from "@/features/user/user.api";
import { formatTodayDate, getAgeFromISO } from "@/utils/date";

export const PrescriptionPatient = () => {
  const { data: patientData } = useGetUserByIdQuery("6917665d84030b43c9ed6a36");
  const patient = patientData?.data;

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="text-base">
        <span className="font-medium text-foreground">Name:</span>{" "}
        {patient?.name}
      </div>
      <div className="text-base">
        <span className="font-medium text-foreground">Sex:</span>{" "}
        {patient?.patientProfile?.gender}
      </div>
      <div className="text-base">
        <span className="font-medium text-foreground">Age: </span>
        {patient?.patientProfile?.dateOfBirth
          ? getAgeFromISO(patient?.patientProfile?.dateOfBirth) + " Years"
          : "-"}
      </div>
      <div className="text-base">
        <span className="font-medium text-foreground">Date:</span>{" "}
        {formatTodayDate()}
      </div>
    </div>
  );
};
