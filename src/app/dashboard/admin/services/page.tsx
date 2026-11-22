
"use client";

import { useEffect, useState } from "react";

interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  startingPrice: number;
  technicianName: string;
  technicianEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isAvailable: boolean;
  createdAt?: string;
}

export default function ServiceApprovalPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch services from backend
  const fetchServices = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services?status=${filter}`,
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
      console.error("Fetch services error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [filter]);

  // Approve or Reject service
  const handleStatusChange = async (
    serviceId: string,
    approvalStatus: "approved" | "rejected"
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${approvalStatus} this service?`
    );

    if (!confirmed) return;

    setUpdatingId(serviceId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${serviceId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ approvalStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update service");
      }

      alert(`Service ${approvalStatus} successfully!`);

      await fetchServices();
    } catch (error) {
      console.error("Update service error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Service Approval
      </h1>

      <p className="mb-8 text-gray-600">
        Review and manage services submitted by technicians.
      </p>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        {["pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-lg px-5 py-2 font-medium capitalize ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 shadow hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Services List */}
      {loading ? (
        <p className="py-8 text-gray-600">Loading services...</p>
      ) : services.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
          No {filter} services found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="overflow-hidden rounded-xl bg-white shadow"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {service.category}
                  </span>

                  <span className="text-sm font-medium capitalize text-gray-500">
                    {service.approvalStatus}
                  </span>
                </div>

                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  {service.title}
                </h2>

                <p className="mb-4 text-sm text-gray-600">
                  {service.description}
                </p>

                <div className="space-y-2 border-t pt-4 text-sm text-gray-700">
                  <p>
                    <strong>Technician:</strong>{" "}
                    {service.technicianName}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {service.technicianEmail}
                  </p>

                  <p>
                    <strong>Starting Price:</strong> $
                    {service.startingPrice}
                  </p>
                </div>

                {service.approvalStatus === "pending" && (
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() =>
                        handleStatusChange(service._id, "approved")
                      }
                      disabled={updatingId === service._id}
                      className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      {updatingId === service._id
                        ? "Updating..."
                        : "Approve"}
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(service._id, "rejected")
                      }
                      disabled={updatingId === service._id}
                      className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      {updatingId === service._id
                        ? "Updating..."
                        : "Reject"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
