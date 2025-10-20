import { CircleDollarSign, LayoutDashboard, Users } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
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
