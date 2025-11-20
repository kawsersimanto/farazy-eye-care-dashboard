"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useGetMedicinesQuery } from "@/features/medicine/medicine.api";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch } from "@/redux/hook";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { setSelectedMedicine } from "../store/prescription.slice";
import { PrescriptionMedicineCard } from "./PrescriptionMedicineCard";
import { PrescriptionMedicineCardSkeleton } from "./PrescriptionMedicineCardSkeleton";

export const PrescriptionMedicine = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { data: medicineData, isLoading } = useGetMedicinesQuery({
    page,
    limit: 10,
    searchTerm: debouncedSearch,
  });
  const medicines = medicineData?.data?.data || [];

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="mb-2">Search Patient</Label>
        <InputGroup>
          <InputGroupInput
            placeholder="ex. Renova"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {isLoading ? (
          <>
            <PrescriptionMedicineCardSkeleton />
            <PrescriptionMedicineCardSkeleton />
            <PrescriptionMedicineCardSkeleton />
            <PrescriptionMedicineCardSkeleton />
          </>
        ) : (
          medicines?.map((medicine, id) => (
            <div
              key={id}
              onClick={() => dispatch(setSelectedMedicine(medicine))}
            >
              <PrescriptionMedicineCard medicine={medicine} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
