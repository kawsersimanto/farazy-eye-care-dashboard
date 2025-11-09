import { IRole } from "@/features/user/user.interface";
import { SidebarMenuItem } from "@/types/sidebar";
import {
  Accessibility,
  BriefcaseMedical,
  Calendar,
  Clock,
  Contact,
  FileText,
  Hospital,
  LayoutDashboard,
  Stethoscope,
  Syringe,
  UserLock,
  Users,
} from "lucide-react";

export const ALL_MENU_ITEMS: Record<string, SidebarMenuItem> = {
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
  // payments: {
  //   title: "Payments",
  //   icon: CircleDollarSign,
  //   url: "#",
  //   items: [
  //     { title: "All Payments", url: "/payments" },
  //     { title: "Add New", url: "/payments/create" },
  //   ],
  // },
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
  branchAdmins: {
    title: "Branch Admin",
    icon: UserLock,
    url: "#",
    items: [
      { title: "All Branch Admin", url: "/branch-admin" },
      { title: "Add New", url: "/branch-admin/create" },
    ],
  },
  employees: {
    title: "Employees",
    icon: Contact,
    url: "#",
    items: [
      { title: "All Employees", url: "/employees" },
      { title: "Add New", url: "/employees/create" },
    ],
  },
  patients: {
    title: "Patients",
    icon: Accessibility,
    url: "#",
    items: [
      { title: "All Patients", url: "/patients" },
      { title: "Add New", url: "/patients/create" },
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

export const COMMON_ROUTES = [
  "/profile",
  "/settings",
  "/change-password",
  "/notifications",
];

export const ROLE_MENU_CONFIG: Record<IRole, string[]> = {
  [IRole.SUPER_ADMIN]: [
    "dashboard",
    "branches",
    "departments",
    "branchAdmins",
    "medicine",
    // "payments",
    "users",
  ],
  [IRole.ADMIN]: [
    "dashboard",
    "branches",
    "departments",
    "doctors",
    "medicine",
    "employees",
    "branchAdmins",
    // "payments",
    "users",
  ],
  [IRole.BRANCH_ADMIN]: [
    "dashboard",
    "departments",
    "doctors",
    "medicine",
    "branchAdmins",
    // "payments",
    "employees",
    "patients",
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
