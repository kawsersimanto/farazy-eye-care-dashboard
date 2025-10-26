"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetBranchByIdQuery } from "../branch.api";
import { BranchFormSkeleton } from "./BranchFormSkeleton";

export const Branch = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetBranchByIdQuery(id);
  const branch = data?.data;

  if (isLoading) return <BranchFormSkeleton />;

  if (!branch)
    return (
      <div className="p-6 text-center text-muted-foreground">
        No branch data found.
      </div>
    );

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">{branch.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Code: {branch.code || "—"}
          </p>
        </div>

        <Badge variant={branch.isActive ? "default" : "secondary"}>
          {branch.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Logo */}
      {branch.logoUrl && (
        <div className="flex mb-4">
          <div className="relative w-[220px] h-24 overflow-hidden border">
            <Image
              src={branch.logoUrl}
              alt={branch.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold mb-2">Contact Information</h4>
          <Link
            href={`tel:${branch.phone}`}
            className="flex items-center gap-2 text-sm mt-1 text-foreground"
          >
            <Phone size="16" /> {branch.phone || "No phone number"}
          </Link>
          <Link
            href={`mailto:${branch.email}`}
            className="flex items-center gap-2 text-sm mt-1 text-foreground"
          >
            <Mail size="16" /> {branch.email || "No email address"}
          </Link>
        </div>

        <div>
          <h4 className="text-sm font-bold">Address</h4>
          <p className="text-sm mt-1 text-foreground">
            {branch.addressLine1}
            {branch.addressLine2 && `, ${branch.addressLine2}`}
            <br />
            {branch.city}, {branch.postalCode}
            <br />
            {branch.country}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <p>Created: {new Date(branch.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(branch.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};
