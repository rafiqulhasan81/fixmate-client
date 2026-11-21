

import type { ReactNode } from "react";
import DashboardSidebar from "@/app/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}

