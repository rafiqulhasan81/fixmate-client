
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AdminStats {
  totalUsers: number;
  totalTechnicians: number;
  pendingServices: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTechnicians: 0,
    pendingServices: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/overview`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        setStats(data.stats);
      } catch (error) {
        console.error("Admin dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session, isPending, router]);

  if (isPending || loading) {
    return <p className="p-8">Loading dashboard...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Admin Dashboard
      </h1>

      <p className="mb-8 text-gray-600">
        Welcome to your FixMate administration panel.
      </p>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="mt-3 text-3xl font-bold text-blue-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Total Technicians</h2>
          <p className="mt-3 text-3xl font-bold text-green-600">
            {stats.totalTechnicians}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Pending Services</h2>
          <p className="mt-3 text-3xl font-bold text-orange-600">
            {stats.pendingServices}
          </p>
        </div>

      </div>
    </main>
  );
}
