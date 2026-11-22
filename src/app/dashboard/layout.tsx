
import { Suspense } from "react";
import DashboardSidebar from "@/app/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <aside className="w-64 border-r bg-white p-6">
            Loading sidebar...
          </aside>
        }
      >
        <DashboardSidebar />
      </Suspense>

      <main className="min-w-0 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
