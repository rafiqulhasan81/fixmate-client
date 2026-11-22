
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/dashboard/admin" },
  { name: "Manage Users", href: "/dashboard/admin/users" },
  { name: "Service Approval", href: "/dashboard/admin/services" },
  { name: "All Bookings", href: "/dashboard/admin/bookings" },
  { name: "Transactions", href: "/dashboard/admin/transactions" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-full bg-gray-900 p-6 text-white md:w-64">
      <h2 className="mb-8 text-2xl font-bold">
        FixMate Admin
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
