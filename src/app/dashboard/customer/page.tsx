
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const bookingStats = [
  {
    title: "Total Bookings",
    count: 0,
    icon: ClipboardList,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending Bookings",
    count: 0,
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Completed Bookings",
    count: 0,
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Cancelled Bookings",
    count: 0,
    icon: XCircle,
    color: "bg-red-100 text-red-600",
  },
];

export default function CustomerDashboard() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <section>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {session.user.name}!
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to your FixMate Customer Dashboard.
          Manage your bookings and track your repair services.
        </p>
      </section>

      {/* Booking Statistics */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Booking Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {bookingStats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <h3 className="text-3xl font-bold text-gray-900 mt-3">
                      {item.count}
                    </h3>
                  </div>

                  <div className={`p-3 rounded-lg ${item.color}`}>
                    <Icon size={25} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Recent Bookings */}
      <section className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Bookings
        </h2>

        <p className="text-gray-500 mt-3">
          You have no bookings yet.
        </p>
      </section>

    </div>
  );
}
