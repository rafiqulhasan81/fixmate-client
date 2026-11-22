
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Booking = {
  _id: string;
  serviceTitle: string;
  serviceImage?: string;
  category?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  preferredDate?: string;
  problemDescription?: string;
  status: "requested" | "accepted" | "rejected" | "in-progress" | "completed";
  paymentStatus?: string;
  basePrice?: number;
  createdAt?: string;
};

export default function ServiceRequestsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const userRole = session?.user?.role;

  // Load technician's service requests
  const fetchBookings = async () => {
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
        throw new Error(data.message || "Failed to load service requests");
      }

      setBookings(data.bookings || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && userRole === "technician") {
      fetchBookings();
    } else if (!isPending && userRole && userRole !== "technician") {
      setLoading(false);
      setError("Only technicians can access this page.");
    }
  }, [isPending, userRole]);

  // Update booking status
  const handleStatusUpdate = async (
    bookingId: string,
    status: Booking["status"]
  ) => {
    const confirmMessage = `Are you sure you want to change the status to "${status}"?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setUpdatingId(bookingId);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/technician/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking status");
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: data.status }
            : booking
        )
      );

      alert(data.message || "Booking status updated successfully!");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "requested":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString();
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Loading service requests...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">Please login first</h2>
      </div>
    );
  }

  if (userRole !== "technician") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Access denied
        </h2>
        <p className="mt-2 text-gray-600">
          Only technicians can access service requests.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Service Requests
            </h1>
            <p className="mt-2 text-gray-600">
              Manage repair requests from your customers.
            </p>
          </div>

          <button
            onClick={fetchBookings}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Refresh Requests
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Requests</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "requested").length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {bookings.filter((b) => b.status === "in-progress").length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "completed").length}
            </h2>
          </div>
        </div>

        {/* Booking Requests */}
        {bookings.length === 0 ? (
          <div className="rounded-xl border bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No Service Requests Yet
            </h2>
            <p className="mt-2 text-gray-500">
              New customer requests will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                <div className="flex flex-col gap-5 p-5 md:flex-row">

                  {/* Service Image */}
                  {booking.serviceImage && (
                    <img
                      src={booking.serviceImage}
                      alt={booking.serviceTitle}
                      className="h-48 w-full rounded-lg object-cover md:h-40 md:w-52"
                    />
                  )}

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl font-bold text-gray-900">
                        {booking.serviceTitle}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Category: {booking.category || "Not specified"}
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                      <p>
                        <strong>Customer:</strong> {booking.customerName}
                      </p>

                      <p>
                        <strong>Email:</strong> {booking.customerEmail}
                      </p>

                      <p>
                        <strong>Phone:</strong>{" "}
                        {booking.customerPhone || "Not specified"}
                      </p>

                      <p>
                        <strong>Preferred Date:</strong>{" "}
                        {formatDate(booking.preferredDate)}
                      </p>

                      <p>
                        <strong>Address:</strong>{" "}
                        {booking.address || "Not specified"}
                      </p>

                      <p>
                        <strong>Service Price:</strong>{" "}
                        {booking.basePrice ?? "Not specified"}
                      </p>
                    </div>

                    {booking.problemDescription && (
                      <div className="mt-4 rounded-lg bg-gray-50 p-3">
                        <p className="text-sm font-semibold text-gray-700">
                          Customer's Problem:
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {booking.problemDescription}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-5 flex flex-wrap gap-3">

                      {booking.status === "requested" && (
                        <>
                          <button
                            disabled={updatingId === booking._id}
                            onClick={() =>
                              handleStatusUpdate(booking._id, "accepted")
                            }
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            Accept
                          </button>

                          <button
                            disabled={updatingId === booking._id}
                            onClick={() =>
                              handleStatusUpdate(booking._id, "rejected")
                            }
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {booking.status === "accepted" && (
                        <button
                          disabled={updatingId === booking._id}
                          onClick={() =>
                            handleStatusUpdate(booking._id, "in-progress")
                          }
                          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
                        >
                          Start Work
                        </button>
                      )}

                      {booking.status === "in-progress" && (
                        <button
                          disabled={updatingId === booking._id}
                          onClick={() =>
                            handleStatusUpdate(booking._id, "completed")
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          Complete
                        </button>
                      )}

                      {booking.status === "rejected" && (
                        <p className="text-sm font-medium text-red-600">
                          This request was rejected.
                        </p>
                      )}

                      {booking.status === "completed" && (
                        <p className="text-sm font-medium text-green-600">
                          This job has been completed.
                        </p>
                      )}

                      {updatingId === booking._id && (
                        <span className="self-center text-sm text-gray-500">
                          Updating...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
