"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { MedicineFormSkeleton } from "@/features/medicine/components/MedicineFormSkeleton";
import { ReactNode } from "react";
import { IRole } from "../user.interface";
import { ProfileForm } from "./ProfileForm";

export const Profile = () => {
  const { isLoading, getUserRole } = useAuth();

  if (isLoading) return <MedicineFormSkeleton />;

  const role = getUserRole() ?? "UNKNOWN";

  const roleComponents: Record<IRole | "UNKNOWN", ReactNode> = {
    [IRole.SUPER_ADMIN]: <ProfileForm />,
    [IRole.BRANCH_ADMIN]: <ProfileForm />,
    [IRole.ADMIN]: "admin",
    [IRole.DOCTOR]: "isDoctor",
    [IRole.EMPLOYEE]: "isEmployee",
    [IRole.PATIENT]: <div>Profile</div>,
    UNKNOWN: <div>Role not found</div>,
  };

  return roleComponents[role];
};
