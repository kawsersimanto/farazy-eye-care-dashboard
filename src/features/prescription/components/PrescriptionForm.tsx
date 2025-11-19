"use client";

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetMedicinesQuery } from "@/features/medicine/medicine.api";
import { useGetDoctorScheduleByIdQuery } from "@/features/schedule/schedule.api";
import { useDebounce } from "@/hooks/useDebounce";
import { formatScheduleWithTime } from "@/utils/date";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export const PrescriptionForm = () => {
  const printRef = useRef(null);
  const { profile } = useAuth();
  const branch = profile?.branch;
  const doctor = profile?.doctorProfile;
  const id = profile?.id as string;
  const { data: scheduleData } = useGetDoctorScheduleByIdQuery(id, {
    skip: !id,
  });
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { data: medicineData } = useGetMedicinesQuery({
    page,
    limit: 50,
    searchTerm: debouncedSearch,
  });

  const schedules = scheduleData?.data || [];
  const medicines = medicineData?.data?.data || [];

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  return (
    <>
      <div ref={printRef}>
        {/* Hospital and Branch Info */}
        <div className="flex items-center justify-between">
          <Image
            src="/logo.webp"
            width={200}
            height={200}
            className="object-contain h-auto w-[200px]"
            alt="Farazy Eye Care Hospital"
          />
          <div className="flex flex-col gap-2 max-w-[280px]">
            <div className="flex items-start gap-2 text-xs text-black">
              <MapPin className="text-sm shrink-0 text-primary" size={16} />{" "}
              {branch?.addressLine1}, {branch?.addressLine2}
            </div>
            <div className="flex items-start gap-2 text-xs text-black">
              <Mail className="text-sm shrink-0 text-primary" size={16} />{" "}
              {branch?.email}
            </div>
            <div className="flex items-start gap-2 text-xs text-black">
              <Phone className="text-sm shrink-0 text-primary" size={16} />{" "}
              {branch?.phone}
            </div>
          </div>
        </div>
        <Separator className="my-10" />

        {/* Doctor Info */}
        <div className="grid grid-cols-2 gap-4 items-center justify-between">
          <div>
            <h2 className="text-2xl">{profile?.name}</h2>
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

        <Separator className="my-10" />

        {/* Patient Info */}
        <div>
          <div>Hello</div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
        <div>Hello</div>
        <div>asdf</div>
      </div> */}
      </div>
    </>
  );
};
