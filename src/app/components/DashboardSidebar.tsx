"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  LayoutDashboard,
  ClipboardList,
  UserRound,
  Home,
  Wrench,
  ClipboardCheck,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const role = session?.user?.role || "customer";

  const isTechnician = role === "technician";
  const isAdmin = role === "admin";

  const adminMenu = [
    {
      name: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Manage Services",
      href: "/dashboard/admin/services",
      icon: Wrench,
    },
    {
      name: "Manage Bookings",
      href: "/dashboard/admin/bookings",
      icon: ClipboardList,
    },
    {
      name: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ];

  const technicianMenu = [
    {
      name: "Overview",
      href: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      name: "My Services",
      href: "/dashboard/technician/services",
      icon: Wrench,
    },
    {
      name: "Service Requests",
      href: "/dashboard/technician/requests",
      icon: ClipboardList,
    },
    {
      name: "Completed Jobs",
      href: "/dashboard/technician/completed-jobs",
      icon: ClipboardCheck,
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ];

  const customerMenu = [
    {
      name: "Overview",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      name: "My Bookings",
      href: "/dashboard/customer/bookings",
      icon: ClipboardList,
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ];

  const menuItems = isAdmin
    ? adminMenu
    : isTechnician
      ? technicianMenu
      : customerMenu;

  const panelTitle = isAdmin
    ? "Admin Panel"
    : isTechnician
      ? "Technician Panel"
      : "Customer Panel";

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-5">
      <h2 className="text-xl font-bold text-gray-900 mb-8">
        {panelTitle}
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </Link>
      </nav>
    </aside>
  );
}