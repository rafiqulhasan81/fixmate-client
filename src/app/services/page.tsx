
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";


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

// Get All Services from Backend API
async function getAllServices(): Promise<Service[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    return await response.json();
  } catch (error) {
    console.error("All services error:", error);
    return [];
  }
}


// All Services Component
async function AllServices({ category }: { category?: string }) {
  const services = await getAllServices();

  const filteredServices = category
    ? services.filter((service) => service.category === category)
    : services;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold">
            OUR SERVICES
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            {category ? `${category} Repair Services` : "All Repair Services"}
          </h1>

          <p className="text-gray-600 mt-4">
            Find the right repair service for your devices and appliances.
          </p>
        </div>

        {/* Service Cards */}
        {filteredServices.length === 0 ? (
          <p className="text-center text-gray-500">
            No services available in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                    

                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  unoptimized
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">

                  <span className="text-sm font-semibold text-blue-600">
                    {service.category}
                  </span>

                  <h2 className="text-xl font-bold text-gray-900 mt-2">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Service Mode:</strong>{" "}
                      {service.serviceMode}
                    </p>

                    <p>
                      <strong>Technician:</strong>{" "}
                      {service.technicianName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t">

                    <div>
                      <p className="text-xs text-gray-500">
                        Starting From
                      </p>

                      <p className="text-xl font-bold text-blue-600">
                        ৳{service.startingPrice}
                      </p>
                    </div>

                    <Link
                      href={`/services/${service._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      View Details
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

// Services Page
interface ServicesPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

async function ServicesContent({
  searchParams,
}: ServicesPageProps) {
  const { category } = await searchParams;

  return <AllServices category={category} />;
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense
        fallback={
          <p className="text-center py-20">
            Loading services...
          </p>
        }
      >
        <ServicesContent searchParams={Promise.resolve({})} />
      </Suspense>
    </main>
  );
}
