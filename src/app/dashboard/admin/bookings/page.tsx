
"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  serviceTitle: string;
  category: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  preferredDate: string;
  status: string;
  paymentStatus: string;
  basePrice: number;
  finalAmount?: number;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings");
        }

        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Fetch bookings error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        All Bookings
      </h1>

      <p className="mb-8 text-gray-600">
        View and monitor all customer repair bookings.
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        {["all", "requested", "accepted", "in-progress", "completed", "rejected"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 shadow hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {loading ? (
        <p className="py-8 text-gray-600">Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Technician</th>
                <th className="p-4">Preferred Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">
                      {booking.serviceTitle}
                    </p>
                    <p className="text-gray-500">{booking.category}</p>
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-gray-900">
                      {booking.customerName}
                    </p>
                    <p className="text-gray-500">{booking.customerEmail}</p>
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-gray-900">
                      {booking.technicianName}
                    </p>
                    <p className="text-gray-500">{booking.technicianEmail}</p>
                  </td>

                  <td className="p-4 text-gray-700">
                    {booking.preferredDate}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-gray-900">
                    ${booking.finalAmount ?? booking.basePrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        Total bookings: {filteredBookings.length}
      </p>
    </div>
  );
}
