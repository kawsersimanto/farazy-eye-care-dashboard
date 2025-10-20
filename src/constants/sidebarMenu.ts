import {
  BriefcaseMedical,
  CircleDollarSign,
  Hospital,
  LayoutDashboard,
  Stethoscope,
  Users,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Branches",
    icon: Hospital,
    url: "#",
    items: [
      { title: "All Branches", url: "/branches" },
      { title: "Add New", url: "/branches/create" },
    ],
  },
  {
    title: "Department",
    icon: BriefcaseMedical,
    url: "#",
    items: [
      { title: "All Department", url: "/department" },
      { title: "Add New", url: "/department/create" },
    ],
  },
  {
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
  {
    title: "Payments",
    icon: CircleDollarSign,
    url: "#",
    items: [
      { title: "All Payments", url: "/payments" },
      { title: "Add New", url: "/payments/create" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    url: "#",
    items: [
      { title: "All Users", url: "/users" },
      { title: "Add New", url: "/users/create" },
    ],
  },
];
