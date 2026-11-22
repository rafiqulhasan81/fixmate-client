
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen md:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
