"use client";

import { IBranch } from "@/features/branch/branch.interface";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const PrescriptionHeader = ({ branch }: { branch: IBranch }) => {
  return (
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
  );
};
