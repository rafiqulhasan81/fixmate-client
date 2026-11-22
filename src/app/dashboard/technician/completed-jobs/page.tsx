
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface Booking {
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
}

export default function CompletedJobsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [amountInputs, setAmountInputs] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState("");
  const [payingId, setPayingId] = useState("");

  // Fetch Completed Jobs
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    const fetchCompletedJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/technician/bookings/requests",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load completed jobs");
        }

        const completedBookings: Booking[] = data.bookings.filter(
          (booking: Booking) => booking.status === "completed"
        );

        setBookings(completedBookings);

        const initialAmounts: Record<string, string> = {};

        completedBookings.forEach((booking) => {
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

  // Handle Final Amount Input
  const handleAmountChange = (bookingId: string, value: string) => {
    setAmountInputs((previous) => ({
      ...previous,
      [bookingId]: value,
    }));
  };

  // Save Final Amount
  const handleFinalAmountUpdate = async (bookingId: string) => {
    try {
      setSavingId(bookingId);
      setSuccess("");
      setError("");

      const amountValue = amountInputs[bookingId];
      const finalAmount = Number(amountValue);

      if (
        !amountValue?.trim() ||
        !Number.isFinite(finalAmount) ||
        finalAmount <= 0
      ) {
        setError("Please enter a valid final amount.");
        return;
      }

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

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? { ...booking, finalAmount }
            : booking
        )
      );

      setSuccess("Final amount saved successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save final amount"
      );
    } finally {
      setSavingId("");
    }
  };

  // Mark Payment as Paid
  const handleMarkAsPaid = async (bookingId: string) => {
    try {
      setPayingId(bookingId);
      setSuccess("");
      setError("");

      const booking = bookings.find(
        (item) => item._id === bookingId
      );

      if (!booking?.finalAmount || booking.finalAmount <= 0) {
        setError("Please save the final amount first.");
        return;
      }

      const confirmed = window.confirm(
        "Have you actually received the payment? Confirm only after receiving the money."
      );

      if (!confirmed) return;

      const response = await fetch(
        `http://localhost:5000/api/technician/bookings/${bookingId}/payment-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            paymentStatus: "paid",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update payment status");
      }

      setBookings((previous) =>
        previous.map((item) =>
          item._id === bookingId
            ? { ...item, paymentStatus: "paid" }
            : item
        )
      );

      setSuccess("Payment status updated successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update payment status"
      );
    } finally {
      setPayingId("");
    }
  };

  if (isPending || loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading completed jobs...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Completed Jobs
      </h1>

      <p className="mb-6 text-gray-600">
        View completed repair jobs and manage their payments.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
          {success}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="text-gray-600">No completed jobs found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  {booking.serviceTitle}
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Completed
                </span>
              </div>

              <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
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
                  {booking.preferredDate || "Not provided"}
                </p>

                <p>
                  <strong>Starting Price:</strong> ৳{booking.basePrice ?? 0}
                </p>
              </div>

              <hr className="my-5 border-gray-200" />

              {/* Final Amount */}
              <div className="mb-5">
                <label className="mb-2 block font-semibold text-gray-800">
                  Final Amount (৳)
                </label>

                <div className="flex flex-wrap gap-3">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={amountInputs[booking._id] ?? ""}
                    onChange={(e) =>
                      handleAmountChange(booking._id, e.target.value)
                    }
                    disabled={booking.paymentStatus === "paid"}
                    placeholder="Enter final amount"
                    className="w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500 disabled:bg-gray-100"
                  />

                  <button
                    onClick={() =>
                      handleFinalAmountUpdate(booking._id)
                    }
                    disabled={
                      savingId === booking._id ||
                      booking.paymentStatus === "paid"
                    }
                    className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
              </div>

              <hr className="my-5 border-gray-200" />

              {/* Payment Status */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    Payment Status
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      booking.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.paymentStatus || "unpaid"}
                  </span>
                </div>

                {booking.paymentStatus === "paid" ? (
                  <span className="font-semibold text-green-700">
                    Payment Received
                  </span>
                ) : (
                  <button
                    onClick={() => handleMarkAsPaid(booking._id)}
                    disabled={
                      !booking.finalAmount ||
                      booking.finalAmount <= 0 ||
                      payingId === booking._id
                    }
                    className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {payingId === booking._id
                      ? "Updating..."
                      : "Mark as Paid"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
