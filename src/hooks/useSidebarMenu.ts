"use client";

import { getSidebarMenu } from "@/constants/sidebarMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMemo } from "react";

export const useSidebarMenu = () => {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  const sidebarMenu = useMemo(() => {
    return getSidebarMenu(role);
  }, [role]);

  return sidebarMenu;
};
