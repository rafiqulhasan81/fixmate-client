// // "use client";

// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { authClient } from "@/lib/auth-client";

// // import {
// //   LayoutDashboard,
// //   ClipboardList,
// //   UserRound,
// //   Home,
// //   Wrench,
// //   ClipboardCheck,
// //   Users,
// //   CreditCard,
// //   Settings,
// // } from "lucide-react";

// // export default function DashboardSidebar() {
// //   const pathname = usePathname();
// //   const { data: session } = authClient.useSession();

// //   const role = session?.user?.role || "customer";

// //   const isTechnician = role === "technician";
// //   const isAdmin = role === "admin";

// //   const adminMenu = [
// //     {
// //       name: "Overview",
// //       href: "/dashboard/admin",
// //       icon: LayoutDashboard,
// //     },
// //     {
// //       name: "Manage Users",
// //       href: "/dashboard/admin/users",
// //       icon: Users,
// //     },
// //     {
// //       name: "Manage Services",
// //       href: "/dashboard/admin/services",
// //       icon: Wrench,
// //     },
// //     {
// //       name: "Manage Bookings",
// //       href: "/dashboard/admin/bookings",
// //       icon: ClipboardList,
// //     },
// //     {
// //       name: "Transactions",
// //       href: "/dashboard/admin/transactions",
// //       icon: CreditCard,
// //     },
// //     {
// //       name: "My Profile",
// //       href: "/dashboard/profile",
// //       icon: UserRound,
// //     },
// //   ];

// //   const technicianMenu = [
// //     {
// //       name: "Overview",
// //       href: "/dashboard/technician",
// //       icon: LayoutDashboard,
// //     },
// //     {
// //       name: "My Services",
// //       href: "/dashboard/technician/services",
// //       icon: Wrench,
// //     },
// //     {
// //       name: "Service Requests",
// //       href: "/dashboard/technician/requests",
// //       icon: ClipboardList,
// //     },
// //     {
// //       name: "Completed Jobs",
// //       href: "/dashboard/technician/completed-jobs",
// //       icon: ClipboardCheck,
// //     },
// //     {
// //       name: "My Profile",
// //       href: "/dashboard/profile",
// //       icon: UserRound,
// //     },
// //   ];

// //   const customerMenu = [
// //     {
// //       name: "Overview",
// //       href: "/dashboard/customer",
// //       icon: LayoutDashboard,
// //     },
// //     {
// //       name: "My Bookings",
// //       href: "/dashboard/customer/bookings",
// //       icon: ClipboardList,
// //     },
// //     {
// //       name: "My Profile",
// //       href: "/dashboard/profile",
// //       icon: UserRound,
// //     },
// //   ];

// //   const menuItems = isAdmin
// //     ? adminMenu
// //     : isTechnician
// //       ? technicianMenu
// //       : customerMenu;

// //   const panelTitle = isAdmin
// //     ? "Admin Panel"
// //     : isTechnician
// //       ? "Technician Panel"
// //       : "Customer Panel";

// //   return (
// //     <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-5">
// //       <h2 className="text-xl font-bold text-gray-900 mb-8">
// //         {panelTitle}
// //       </h2>

// //       <nav className="space-y-2">
// //         {menuItems.map((item) => {
// //           const Icon = item.icon;
// //           const isActive = pathname === item.href;

// //           return (
// //             <Link
// //               key={item.href}
// //               href={item.href}
// //               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
// //                 isActive
// //                   ? "bg-blue-600 text-white"
// //                   : "text-gray-600 hover:bg-gray-100"
// //               }`}
// //             >
// //               <Icon size={20} />
// //               <span>{item.name}</span>
// //             </Link>
// //           );
// //         })}

// //         <Link
// //           href="/"
// //           className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
// //         >
// //           <Home size={20} />
// //           <span>Back to Home</span>
// //         </Link>
// //       </nav>
// //     </aside>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   UserRound,
//   Home,
//   Wrench,
//   ClipboardCheck,
//   Users,
//   CreditCard,
//   Menu,
//   X,
// } from "lucide-react";

// export default function DashboardSidebar() {
//   const pathname = usePathname();
//   const { data: session } = authClient.useSession();
//   const [isOpen, setIsOpen] = useState(false);

//   const role = session?.user?.role || "customer";

//   const isTechnician = role === "technician";
//   const isAdmin = role === "admin";

//   const adminMenu = [
//     { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
//     { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
//     { name: "Manage Services", href: "/dashboard/admin/services", icon: Wrench },
//     { name: "Manage Bookings", href: "/dashboard/admin/bookings", icon: ClipboardList },
//     { name: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
//     { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
//   ];

//   const technicianMenu = [
//     { name: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
//     { name: "My Services", href: "/dashboard/technician/services", icon: Wrench },
//     { name: "Service Requests", href: "/dashboard/technician/requests", icon: ClipboardList },
//     { name: "Completed Jobs", href: "/dashboard/technician/completed-jobs", icon: ClipboardCheck },
//     { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
//   ];

//   const customerMenu = [
//     { name: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
//     { name: "My Bookings", href: "/dashboard/customer/bookings", icon: ClipboardList },
//     { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
//   ];

//   const menuItems = isAdmin
//     ? adminMenu
//     : isTechnician
//       ? technicianMenu
//       : customerMenu;

//   const panelTitle = isAdmin
//     ? "Admin Panel"
//     : isTechnician
//       ? "Technician Panel"
//       : "Customer Panel";

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed left-4 top-4 z-50 rounded-lg bg-blue-600 p-2 text-white shadow-md md:hidden"
//         aria-label="Toggle dashboard menu"
//       >
//         {isOpen ? <X size={22} /> : <Menu size={22} />}
//       </button>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 z-40 bg-black/40 md:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white p-5 transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <h2 className="mb-8 text-xl font-bold text-gray-900">
//           {panelTitle}
//         </h2>

//         <nav className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.href;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
//                   isActive
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <Icon size={20} />
//                 <span>{item.name}</span>
//               </Link>
//             );
//           })}

//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
//           >
//             <Home size={20} />
//             <span>Back to Home</span>
//           </Link>
//         </nav>
//       </aside>
//     </>
//   );
// }


"use client";

import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const role = session?.user?.role || "customer";
  const isTechnician = role === "technician";
  const isAdmin = role === "admin";

  const adminMenu = [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Manage Services", href: "/dashboard/admin/services", icon: Wrench },
    { name: "Manage Bookings", href: "/dashboard/admin/bookings", icon: ClipboardList },
    { name: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
    { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
  ];

  const technicianMenu = [
    { name: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
    { name: "My Services", href: "/dashboard/technician/services", icon: Wrench },
    { name: "Service Requests", href: "/dashboard/technician/requests", icon: ClipboardList },
    { name: "Completed Jobs", href: "/dashboard/technician/completed-jobs", icon: ClipboardCheck },
    { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
  ];

  const customerMenu = [
    { name: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/customer/bookings", icon: ClipboardList },
    { name: "My Profile", href: "/dashboard/profile", icon: UserRound },
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
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-blue-600 p-2 text-white shadow-md md:hidden"
        aria-label="Toggle dashboard menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white p-5 transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="mb-8 text-xl font-bold text-gray-900">
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
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
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
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
