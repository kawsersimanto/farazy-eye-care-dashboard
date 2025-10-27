import { IRole } from "@/features/user/user.interface";
import {
  BriefcaseMedical,
  Calendar,
  CircleDollarSign,
  Clock,
  FileText,
  Hospital,
  LayoutDashboard,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
  title: string;
  icon: LucideIcon;
  url: string;
  items?: SidebarSubItem[];
}

export interface SidebarSubItem {
  title: string;
  url: string;
}

// Define all available menu items
const ALL_MENU_ITEMS: Record<string, SidebarMenuItem> = {
  dashboard: {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  branches: {
    title: "Branches",
    icon: Hospital,
    url: "#",
    items: [
      { title: "All Branches", url: "/branches" },
      { title: "Add New", url: "/branches/create" },
    ],
  },
  departments: {
    title: "Departments",
    icon: BriefcaseMedical,
    url: "#",
    items: [
      { title: "All Department", url: "/department" },
      { title: "Add New", url: "/department/create" },
    ],
  },
  doctors: {
    title: "Doctors",
    icon: Stethoscope,
    url: "#",
    items: [
      { title: "All Doctors", url: "/doctors" },
      { title: "Add New", url: "/doctors/create" },
      { title: "Schedule", url: "/doctors/schedules" },
      { title: "Specialization", url: "/doctors/specializations" },
      { title: "Leave Requests", url: "/doctors/leave-requests" },
    ],
  },
  medicine: {
    title: "Medicine",
    icon: Syringe,
    url: "#",
    items: [
      { title: "All Medicine", url: "/medicine" },
      { title: "Add New", url: "/medicine/create" },
      { title: "Brands", url: "/medicine/brands" },
      { title: "Categories", url: "/medicine/categories" },
    ],
  },
  payments: {
    title: "Payments",
    icon: CircleDollarSign,
    url: "#",
    items: [
      { title: "All Payments", url: "/payments" },
      { title: "Add New", url: "/payments/create" },
    ],
  },
  users: {
    title: "Users",
    icon: Users,
    url: "#",
    items: [
      { title: "All Users", url: "/users" },
      { title: "Add New", url: "/users/create" },
    ],
  },
  appointments: {
    title: "Appointments",
    icon: Calendar,
    url: "#",
    items: [
      { title: "My Appointments", url: "/appointments" },
      { title: "Book Appointment", url: "/appointments/create" },
    ],
  },
  medicalRecords: {
    title: "Medical Records",
    icon: FileText,
    url: "/medical-records",
  },
  doctorSchedule: {
    title: "My Schedule",
    icon: Calendar,
    url: "/doctor/schedule",
  },
  employeeAttendance: {
    title: "Attendance",
    icon: Clock,
    url: "/employee/attendance",
  },
};

// Common routes accessible by all authenticated roles (not shown in sidebar)
export const COMMON_ROUTES = [
  "/profile",
  "/settings",
  "/change-password",
  "/notifications",
];

// Role-based menu configuration
const ROLE_MENU_CONFIG: Record<IRole, string[]> = {
  [IRole.SUPER_ADMIN]: [
    "dashboard",
    "branches",
    "departments",
    "doctors",
    "medicine",
    "payments",
    "users",
  ],
  [IRole.ADMIN]: [
    "dashboard",
    "branches",
    "departments",
    "doctors",
    "medicine",
    "payments",
    "users",
  ],
  [IRole.DOCTOR]: [
    "dashboard",
    "appointments",
    "doctorSchedule",
    "medicalRecords",
  ],
  [IRole.PATIENT]: ["dashboard", "appointments", "medicalRecords"],
  [IRole.EMPLOYEE]: ["dashboard", "employeeAttendance"],
};

/**
 * Get sidebar menu items based on user role
 */
export const getSidebarMenu = (role: IRole | null): SidebarMenuItem[] => {
  if (!role) return [];

  const menuKeys = ROLE_MENU_CONFIG[role] || [];
  return menuKeys
    .map((key) => ALL_MENU_ITEMS[key])
    .filter((item): item is SidebarMenuItem => Boolean(item));
};

/**
 * Check if a route is accessible by the user
 * Returns true if route is in role-specific menu or in common routes
 */
export const isRouteAccessible = (
  role: IRole | null,
  pathname: string
): boolean => {
  if (!role) return false;

  // Check if route is in common routes (accessible by all authenticated users)
  if (COMMON_ROUTES.some((route) => pathname.startsWith(route))) {
    return true;
  }

  // Check if route is in role-specific menu
  const menuItems = getSidebarMenu(role);
  return menuItems.some((item) => {
    if (item.url !== "#" && pathname.startsWith(item.url)) return true;
    return (
      item.items?.some((subItem) => pathname.startsWith(subItem.url)) ?? false
    );
  });
};

/**
 * Get all accessible routes for a role (menu items + common routes)
 */
export const getAllAccessibleRoutes = (role: IRole | null): string[] => {
  if (!role) return [];

  const menuItems = getSidebarMenu(role);
  const menuRoutes = menuItems.flatMap((item) => [
    item.url,
    ...(item.items?.map((sub) => sub.url) ?? []),
  ]);

  return [...menuRoutes, ...COMMON_ROUTES];
};
