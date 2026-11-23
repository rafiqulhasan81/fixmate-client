
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
  const [actionId, setActionId] = useState("");

  // Load technician's services
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/technician/services/my`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load services");
        }

        setServices(data.services);
      } catch (error) {
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

  // Delete service
  const handleDelete = async (serviceId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    try {
      setActionId(serviceId);

      const response = await fetch(
        `http://localhost:5000/api/technician/services/${serviceId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete service");
      }

      setServices((previousServices) =>
        previousServices.filter(
          (service) => service._id !== serviceId
        )
      );

      alert("Service deleted successfully!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setActionId("");
    }
  };

  // Toggle service availability
  const handleAvailability = async (
    service: Service
  ) => {
    const newAvailability = !service.isAvailable;

    try {
      setActionId(service._id);

      const response = await fetch(
        `http://localhost:5000/api/technician/services/${service._id}/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            isAvailable: newAvailability,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update availability"
        );
      }

      setServices((previousServices) =>
        previousServices.map((item) =>
          item._id === service._id
            ? { ...item, isAvailable: newAvailability }
            : item
        )
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setActionId("");
    }
  };

  if (isPending || loading) {
    return <p className="p-6">Loading services...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-4">
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
          <Wrench
            size={35}
            className="mx-auto mb-4 text-blue-600"
          />

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
                  Availability:{" "}
                  <span
                    className={
                      service.isAvailable
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    {service.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2 pt-3">
                  <Link
                    href={`/dashboard/technician/services/edit/${service._id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleAvailability(service)}
                    disabled={actionId === service._id}
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm text-white hover:bg-amber-600 disabled:opacity-50"
                  >
                    {actionId === service._id
                      ? "Please wait..."
                      : service.isAvailable
                        ? "Make Unavailable"
                        : "Make Available"}
                  </button>

                  <button
                    onClick={() => handleDelete(service._id)}
                    disabled={actionId === service._id}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
