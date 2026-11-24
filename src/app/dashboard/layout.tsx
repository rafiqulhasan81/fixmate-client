
// // import { Suspense } from "react";
// // import DashboardSidebar from "@/app/components/DashboardSidebar";

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       <Suspense
// //         fallback={
// //           <aside className="w-64 border-r bg-white p-6">
// //             Loading sidebar...
// //           </aside>
// //         }
// //       >
// //         <DashboardSidebar />
// //       </Suspense>

// //       <main className="min-w-0 flex-1 p-6">
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }

// import { Suspense } from "react";
// import DashboardSidebar from "@/app/components/DashboardSidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Dashboard Sidebar */}
//       <Suspense
//         fallback={
//           <aside className="w-64 border-r bg-white p-6">
//             Loading sidebar...
//           </aside>
//         }
//       >
//         <DashboardSidebar />
//       </Suspense>

//       {/* Main Dashboard Area */}
//       <div className="min-w-0 flex-1">
//         {/* Dashboard Topbar */}
//         <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
//           <h1 className="text-lg font-semibold text-gray-800">
//             Dashboard
//           </h1>

//           <a
//             href="/"
//             className="text-sm font-medium text-blue-600 hover:text-blue-700"
//           >
//             Back to Home
//           </a>
//         </header>

//         {/* Dashboard Content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import { Suspense } from "react";
import DashboardSidebar from "@/app/components/DashboardSidebar";
import DashboardTopbar from "@/app/components/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Dashboard Sidebar */}
      <Suspense
        fallback={
          <aside className="w-64 border-r bg-white p-6">
            Loading sidebar...
          </aside>
        }
      >
        <DashboardSidebar />
      </Suspense>

      {/* Main Dashboard Area */}
      <div className="min-w-0 flex-1">
        {/* Dashboard Topbar */}
        <DashboardTopbar />

        {/* Dashboard Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
