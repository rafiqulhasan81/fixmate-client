
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Wrench } from "lucide-react";
import Link from "next/link";

interface Service {
  _id: string;
  title: string;
  category: string;
  image: string;
  serviceMode: string;
  startingPrice: number;
  approvalStatus: string;
  isAvailable: boolean;
}

export default function MyServicesPage() {
  const { data: session, isPending } = authClient.useSession();

  const [services, setServices] = useState<Service[]>([]);
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
      setError("Only technicians can view their services.");
      setLoading(false);
      return;
    }

    const fetchMyServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/technician/services/my",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load services");
        }

        setServices(data.services);
        
      } catch (error) {
        console.error("Services loading error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyServices();
  }, [session, isPending]);

  if (isPending || loading) {
    return <p className="p-6">Loading services...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
  <div>
    <div className="flex items-center gap-8">
      <h1 className="text-3xl font-bold text-gray-900">
        My Services
      </h1>

      <Link
        href="/dashboard/technician/services/add"
        className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
      >
        + Add New Service
      </Link>
    </div>

    <p className="mt-2 text-gray-500">
      Manage the repair services you provide.
    </p>
  </div>

      {services.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <Wrench size={35} className="mx-auto mb-4 text-blue-600" />

          <h2 className="text-xl font-semibold">
            No Services Yet
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't added any repair services yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-48 w-full object-cover"
              />

              <div className="space-y-3 p-5">
                <h2 className="text-xl font-semibold">
                  {service.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {service.category} · {service.serviceMode}
                </p>

                <p className="font-semibold text-blue-600">
                  Starting Price: ৳{service.startingPrice}
                </p>

                <p className="text-sm">
                  Status: {service.approvalStatus}
                </p>

                <p className="text-sm">
                  Availability: {service.isAvailable ? "Available" : "Unavailable"}
                </p>

                <div className="flex gap-3 pt-3">
                <Link
                    href={`/dashboard/technician/services/edit/${service._id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                    Edit
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
