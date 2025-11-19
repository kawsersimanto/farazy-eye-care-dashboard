"use client";

import { Separator } from "@/components/ui/separator";
import { useGetMedicinesQuery } from "@/features/medicine/medicine.api";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { PrescriptionConsultant } from "./PrescriptionConsultant";
import { PrescriptionHeader } from "./PrescriptionHeader";
import { PrescriptionPatient } from "./PrescriptionPatient";

export const PrescriptionForm = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { data: medicineData } = useGetMedicinesQuery({
    page,
    limit: 50,
    searchTerm: debouncedSearch,
  });

  const medicines = medicineData?.data?.data || [];

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  return (
    <>
      <div>
        <PrescriptionHeader />
        <Separator className="my-5" />
        <PrescriptionConsultant />
        <Separator className="my-5" />
        <PrescriptionPatient />
        {/* <Separator className="my-5" /> */}
        {/* <div className="grid grid-cols-2 gap-4">
        <div>Hello</div>
        <div>asdf</div>
      </div> */}
      </div>
    </>
  );
};
