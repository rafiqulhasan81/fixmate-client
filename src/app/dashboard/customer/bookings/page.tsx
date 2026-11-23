
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Booking {
  _id: string;
  serviceTitle: string;
  serviceImage: string;
  category: string;
  basePrice: number;
  technicianName: string;
  customerPhone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings");
        }

        setBookings(data.bookings);
      } catch (error) {
        console.error("Fetch bookings error:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="p-6">Loading your bookings...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        My Bookings
      </h1>

      <p className="mt-2 text-gray-600">
        View and manage all your repair requests here.
      </p>

      {bookings.length === 0 ? (
        <p className="mt-8 text-gray-500">
          You have not made any repair requests yet.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-lg border bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {booking.serviceTitle}
              </h2>

              <img
                src={booking.serviceImage}
                alt={booking.serviceTitle}
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />

              <p className="mt-2 text-sm text-gray-600">
                Technician: {booking.technicianName}
              </p>

              <p className="text-sm text-gray-600">
                Price: ৳{booking.basePrice}
              </p>

              <p className="text-sm text-gray-600">
                Preferred Date: {booking.preferredDate}
              </p>

              <p className="text-sm text-gray-600">
                Phone: {booking.customerPhone}
              </p>

              <p className="text-sm text-gray-600">
                Address: {booking.address}
              </p>

              <p className="mt-3 text-sm">
                Problem: {booking.problemDescription}
              </p>

              <div className="mt-4 flex gap-3">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  {booking.status}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  Payment: {booking.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
