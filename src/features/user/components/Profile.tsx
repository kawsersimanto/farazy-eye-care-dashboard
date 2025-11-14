"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ProfileForm } from "./ProfileForm";

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
  if (isBranchAdmin()) return <ProfileForm />;
  if (isDoctor()) return "isDoctor";
  if (isEmployee()) return "isEmployee";

  console.log(profile);
  return <div>Profile</div>;
};
