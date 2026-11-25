
"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Suspense, useEffect, useState } from "react";

// Service Data Type
interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  serviceMode: string;
  startingPrice: number;
  technicianName: string;
}

function BookingContent() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  // Logged-in User-এর Session
  const { data: session, isPending } = authClient.useSession();

  // Service এবং Loading State
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // আজকের তারিখ
  const today = new Date().toLocaleDateString("en-CA");

  // Login না থাকলে Login Page-এ পাঠানো
  useEffect(() => {
    if (!isPending && !session) {
      router.replace(
        `/login?callbackURL=${encodeURIComponent(`/booking/${id}`)}`
      );
    }
  }, [isPending, session, router, id]);

  // Submit Booking Request
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            serviceId: id,
            phone,
            address,
            preferredDate,
            problemDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking request failed");
      }

      toast.success("Repair request submitted successfully!");

      router.push("/dashboard/customer/bookings");

    } catch (error) {
      console.error("Booking submission error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(message);

    } finally {
      setSubmitting(false);
    }
  };

  // Service-এর তথ্য আনা
  useEffect(() => {
    async function getService() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`
        );

        if (!response.ok) {
          throw new Error("Service not found");
        }

        const data = await response.json();
        setService(data);

      } catch (error) {
        console.error("Service fetch error:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Failed to load service";

        toast.error(message);

      } finally {
        setLoading(false);
      }
    }

    getService();
  }, [id]);

  // Loading
  if (isPending || loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  // Login না থাকলে
  if (!session) {
    return <p className="text-center py-20">Redirecting to login...</p>;
  }

  // Service না পাওয়া গেলে
  if (!service) {
    return <p className="text-center py-20">Service not found.</p>;
  }

  // শুধু Customer Booking করতে পারবে
  if (session.user.role !== "customer") {
    return (
      <main className="min-h-screen bg-gray-50 py-20">
        <p className="text-center text-lg font-semibold text-red-600">
          Only customers can request a repair.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Request a Repair
        </h1>

        {/* Selected Service */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <Image
            src={service.image}
            alt={service.title}
            width={800}
            height={400}
            unoptimized
            className="w-full h-64 object-cover rounded-lg"
          />

          <h2 className="text-2xl font-bold mt-5">
            {service.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {service.description}
          </p>

          <div className="mt-4 space-y-2">
            <p>Category: {service.category}</p>
            <p>Technician: {service.technicianName}</p>
            <p>Service Mode: {service.serviceMode}</p>
            <p className="font-bold text-blue-600">
              Starting Price: ৳{service.startingPrice}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Your Information
          </h2>

          {/* Name - Read Only */}
          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={session.user.name}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Email - Read Only */}
          <div>
            <label className="block font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={session.user.email}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-2">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              required
              rows={3}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block font-medium mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              min={today}
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Problem Description */}
          <div>
            <label className="block font-medium mb-2">
              Describe Your Problem
            </label>
            <textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the problem with your device or appliance (minimum 20 characters)"
              minLength={20}
              required
              rows={5}
              className="w-full border rounded-lg px-4 py-3"
            />

            <p className="text-sm text-gray-500 mt-1">
              {problemDescription.length}/20 characters minimum
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>

        </form>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
      <BookingContent />
    </Suspense>
  );
}
