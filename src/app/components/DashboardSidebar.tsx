
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
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const role = session?.user?.role || "customer";

  const isTechnician = role === "technician";

  const menuItems = isTechnician
    ? [
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
          href:"/dashboard/technician/completed-jobs",
          icon: ClipboardCheck,
        },
        {
          name: "My Profile",
          href: "/dashboard/profile",
          icon: UserRound,
        },
      ]
    : [
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

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-5">

      <h2 className="text-xl font-bold text-gray-900 mb-8">
        {isTechnician ? "Technician Panel" : "Customer Panel"}
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
