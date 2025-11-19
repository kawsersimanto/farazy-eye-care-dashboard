"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetPatientsQuery } from "@/features/patient/patient.api";
import { IUser } from "@/features/user/user.interface";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { getAgeFromISO } from "@/utils/date";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPatient } from "../store/prescription.slice";

export const PrescriptionSettings = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const selectedPatient = useAppSelector((state) => state.prescription.patient);
  const { data } = useGetPatientsQuery({
    limit: 50,
    page,
    searchTerm: debouncedSearch,
  });

  const users = data?.data?.data;

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  const handleSelectPatient = (user: IUser) => {
    const age = user.patientProfile?.dateOfBirth
      ? getAgeFromISO(user.patientProfile.dateOfBirth)
      : 18;

    dispatch(
      setSelectedPatient({
        id: user.id,
        name: user.name || "",
        phone: user.phone || "",
        age,
        gender: user.patientProfile?.gender || "MALE",
      })
    );
    setOpen(false);
    setSearchInput("");
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-full justify-between")}
          >
            {selectedPatient?.name || "Select Patient"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search patient..."
              value={searchInput}
              onValueChange={handleSearch}
            />
            <CommandList>
              <CommandEmpty>No patient found.</CommandEmpty>
              <CommandGroup>
                {users?.map((user) => (
                  <CommandItem
                    value={user.id}
                    key={user.id}
                    onSelect={() => handleSelectPatient(user)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPatient?.id === user.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
