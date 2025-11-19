"use client";

import { useGetMedicinesQuery } from "@/features/medicine/medicine.api";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { PrescriptionMedicineCard } from "./PrescriptionMedicineCard";

export const PrescriptionMedicine = () => {
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

  console.log({ handleSearch });

  console.log(medicines);
  return (
    <div className="grid grid-cols-2 gap-2">
      {medicines?.map((medicine, id) => (
        <PrescriptionMedicineCard key={id} medicine={medicine} />
      ))}
    </div>
  );
};
