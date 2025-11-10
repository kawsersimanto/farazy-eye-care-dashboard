"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export const Profile = () => {
  const {
    profile,
    isSuperAdmin,
    isBranchAdmin,
    isAdmin,
    isDoctor,
    isEmployee,
  } = useAuth();

  if (isSuperAdmin()) return " Super admin";
  if (isAdmin()) return "admin";
  if (isBranchAdmin()) return "isBranchAdmin";
  if (isDoctor()) return "isDoctor";
  if (isEmployee()) return "isEmployee";

  console.log(profile);
  return <div>Profile</div>;
};
