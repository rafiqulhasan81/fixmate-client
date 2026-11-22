
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Booking = {
  _id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  preferredDate?: string;
  basePrice?: number;
  status: string;
  completedAt?: string;
};

export default function CompletedJobsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    if (session.user.role !== "technician") {
      setError("Only technicians can access this page.");
      setLoading(false);
      return;
    }

    const fetchCompletedJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/technician/bookings/requests",
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load completed jobs");
        }

        const completedJobs = (data.bookings || []).filter(
          (booking: Booking) => booking.status === "completed"
        );

        setBookings(completedJobs);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedJobs();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="p-8 text-center">
        Loading completed jobs...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Completed Jobs
        </h1>

        <p className="mt-2 text-gray-600">
          View all repair jobs you have completed.
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!error && bookings.length === 0 && (
          <div className="mt-8 rounded-xl border bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No Completed Jobs Yet
            </h2>
            <p className="mt-2 text-gray-500">
              Your completed repair jobs will appear here.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {booking.serviceTitle}
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Completed
                </span>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                <p>
                  <strong>Customer:</strong> {booking.customerName}
                </p>

                <p>
                  <strong>Email:</strong> {booking.customerEmail}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {booking.customerPhone || "Not provided"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {booking.address || "Not provided"}
                </p>

                <p>
                  <strong>Preferred Date:</strong>{" "}
                  {booking.preferredDate || "Not specified"}
                </p>

                <p>
                  <strong>Service Price:</strong>{" "}
                  {booking.basePrice ?? "Not specified"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
