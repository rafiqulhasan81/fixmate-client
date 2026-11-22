
// "use client";

// import { authClient } from "@/lib/auth-client";

// export default function TechnicianDashboard() {
//   const { data: session } = authClient.useSession();

//   const userName = session?.user?.name || "Technician";

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">
//           Technician Dashboard
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Welcome back, {userName}!
//         </p>
//       </div>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         <div className="rounded-xl bg-white p-6 shadow">
//           <h2 className="text-gray-500">Total Services</h2>
//           <p className="mt-2 text-3xl font-bold">0</p>
//         </div>

//         <div className="rounded-xl bg-white p-6 shadow">
//           <h2 className="text-gray-500">Pending Requests</h2>
//           <p className="mt-2 text-3xl font-bold">0</p>
//         </div>

//         <div className="rounded-xl bg-white p-6 shadow">
//           <h2 className="text-gray-500">Completed Jobs</h2>
//           <p className="mt-2 text-3xl font-bold">0</p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Service = {
  _id: string;
  title: string;
};

type Booking = {
  _id: string;
  status: string;
};

export default function TechnicianDashboard() {
  const { data: session } = authClient.useSession();

  const userName = session?.user?.name || "Technician";

  const [totalServices, setTotalServices] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [completedJobs, setCompletedJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user) return;

    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [servicesResponse, bookingsResponse] =
          await Promise.all([
            fetch(
              "http://localhost:5000/api/technician/services/my",
              {
                credentials: "include",
              }
            ),
            fetch(
              "http://localhost:5000/api/technician/bookings/requests",
              {
                credentials: "include",
              }
            ),
          ]);

        if (!servicesResponse.ok || !bookingsResponse.ok) {
          throw new Error("Failed to load dashboard statistics");
        }

        const servicesData = await servicesResponse.json();
        const bookingsData = await bookingsResponse.json();

        const services: Service[] = servicesData.services || [];
        const bookings: Booking[] = bookingsData.bookings || [];

        setTotalServices(services.length);

        setPendingRequests(
          bookings.filter(
            (booking) => booking.status === "requested"
          ).length
        );

        setCompletedJobs(
          bookings.filter(
            (booking) => booking.status === "completed"
          ).length
        );
      } catch (error) {
        console.error("Dashboard statistics error:", error);
        setError("Statistics load করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [session?.user]);

  const statistics = [
    {
      title: "Total Services",
      value: totalServices,
      color: "border-blue-500",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      color: "border-orange-500",
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      color: "border-green-500",
    },
  ];

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

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statistics.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl border-l-4 ${item.color} bg-white p-6 shadow`}
          >
            <h2 className="text-gray-500">
              {item.title}
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {loading ? "..." : item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
