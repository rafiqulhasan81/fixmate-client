
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Booking Data Structure
interface Booking {
  _id: string;
  serviceTitle: string;
  serviceImage?: string;
  technicianName: string;
  technicianEmail: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
  basePrice: number;
  finalAmount?: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

// Booking Statistics Structure
interface BookingStat {
  title: string;
  count: number;
  icon: typeof ClipboardList;
  color: string;
}

export default function CustomerDashboard() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in customer's bookings
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load bookings"
          );
        }

        setBookings(data.bookings || []);

      } catch (err) {
        console.error("Fetch bookings error:", err);

        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong";

        setError(message);
        toast.error(message);

      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

  }, [session, isPending, router]);

  // Calculate booking statistics
  const bookingStats: BookingStat[] = [
    {
      title: "Total Bookings",
      count: bookings.length,
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Bookings",
      count: bookings.filter(
        (booking) => booking.status === "requested"
      ).length,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Completed Bookings",
      count: bookings.filter(
        (booking) => booking.status === "completed"
      ).length,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Cancelled Bookings",
      count: bookings.filter(
        (booking) => booking.status === "cancelled"
      ).length,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
  ];

  if (isPending || loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!session) {
    return null;
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

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

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

        {error ? (
          <p className="text-red-600 mt-3">
            Could not load recent bookings.
          </p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 mt-3">
            You have no bookings yet.
          </p>
        ) : (
          <div className="mt-5 space-y-4">

            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {booking.serviceTitle}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Technician: {booking.technicianName}
                  </p>

                  <p className="text-sm text-gray-500">
                    Preferred Date: {booking.preferredDate}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="font-semibold text-gray-900">
                    ৳{booking.basePrice}
                  </p>

                  <span className="inline-block mt-2 text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}
