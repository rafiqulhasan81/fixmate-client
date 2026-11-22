
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
  finalAmount?: number;
  status: string;
  paymentStatus?: string;
  completedAt?: string;
};

export default function CompletedJobsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [amountInputs, setAmountInputs] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

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

        const completedJobs: Booking[] = (data.bookings || []).filter(
          (booking: Booking) => booking.status === "completed"
        );

        setBookings(completedJobs);

        const initialAmounts: Record<string, string> = {};

        completedJobs.forEach((booking) => {
          initialAmounts[booking._id] =
            booking.finalAmount !== undefined
              ? String(booking.finalAmount)
              : "";
        });

        setAmountInputs(initialAmounts);
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

  const handleFinalAmountUpdate = async (bookingId: string) => {
    try {
      setError("");
      setSuccess("");

      const finalAmount = Number(amountInputs[bookingId]);

      if (!Number.isFinite(finalAmount) || finalAmount <= 0) {
        setError("Please enter a valid final amount.");
        return;
      }

      setSavingId(bookingId);

      const response = await fetch(
        `http://localhost:5000/api/technician/bookings/${bookingId}/final-amount`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ finalAmount }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update final amount");
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, finalAmount }
            : booking
        )
      );

      setSuccess("Final amount saved successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSavingId("");
    }
  };

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
          View completed repair jobs and manage final amounts.
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-700">
            {success}
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
                  <strong>Starting Price:</strong>{" "}
                  ৳{booking.basePrice ?? "Not specified"}
                </p>
              </div>

              <div className="mt-6 border-t pt-5">
                <h3 className="font-semibold text-gray-800">
                  Final Amount
                </h3>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={amountInputs[booking._id] ?? ""}
                    onChange={(e) =>
                      setAmountInputs((previous) => ({
                        ...previous,
                        [booking._id]: e.target.value,
                      }))
                    }
                    placeholder="Enter final amount"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 sm:max-w-xs"
                  />

                  <button
                    onClick={() => handleFinalAmountUpdate(booking._id)}
                    disabled={savingId === booking._id}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingId === booking._id
                      ? "Saving..."
                      : "Save Final Amount"}
                  </button>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  Saved Final Amount:{" "}
                  <strong>
                    {booking.finalAmount !== undefined
                      ? `৳${booking.finalAmount}`
                      : "Not set yet"}
                  </strong>
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Payment Status:{" "}
                  <strong>
                    {booking.paymentStatus || "unpaid"}
                  </strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
