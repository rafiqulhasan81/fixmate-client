import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

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

interface ServiceDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

// Get Single Service from Backend API
async function getServiceDetails(id: string): Promise<Service | null> {
  try {
    const response = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Service details error:", error);
    return null;
  }
}

// Service Details Content
async function ServiceDetailsContent({
  params,
}: ServiceDetailsProps) {
  const { id } = await params;

  const service = await getServiceDetails(id);

  if (!service) {
    return (
      <p className="text-center py-20">
        Service not found.
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-6">
          {service.title}
        </h1>

        <Image
          src={service.image}
          alt={service.title}
          width={800}
          height={500}
          unoptimized
          className="w-full max-h-96 object-cover rounded-xl"
        />

        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <p>
            <strong>Category:</strong> {service.category}
          </p>

          <p>
            <strong>Description:</strong> {service.description}
          </p>

          <p>
            <strong>Service Mode:</strong> {service.serviceMode}
          </p>

          <p>
            <strong>Technician:</strong> {service.technicianName}
          </p>

          <p>
            <strong>Starting Price:</strong> ৳{service.startingPrice}
          </p>
          <Link
          href={`/booking/${service._id}`}
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Book Now
        </Link>
        </div>

      </div>
    </main>
  );
}

// Service Details Page
export default function ServiceDetailsPage({
  params,
}: ServiceDetailsProps) {
  return (
    <Suspense
      fallback={
        <p className="text-center py-20">
          Loading service details...
        </p>
      }
    >
      <ServiceDetailsContent params={params} />
    </Suspense>
  );
}
