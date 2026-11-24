
// // import AdminSidebar from "./components/AdminSidebar";

// // export default function AdminLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <div className="min-h-screen md:flex">
// //       <AdminSidebar />

// //       <main className="min-w-0 flex-1 p-6">
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }


// import DashboardSidebar from "@/app/components/DashboardSidebar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen md:flex bg-gray-50">
//       <DashboardSidebar />

//       <div className="min-w-0 flex-1">
//         {/* Dashboard Topbar */}
//         <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
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


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}