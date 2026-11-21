
"use client";

import { authClient } from "@/lib/auth-client";

export default function TechnicianDashboard() {
  const { data: session } = authClient.useSession();

  const userName = session?.user?.name || "Technician";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Technician Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back, {userName}!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Total Services</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Pending Requests</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Completed Jobs</h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
