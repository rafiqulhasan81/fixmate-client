
import Image from "next/image";
import Link from "next/link";

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

// Fetch Latest 6 Featured Services
async function getFeaturedServices(): Promise<Service[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/featured`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch featured services");
    }

    return await response.json();
  } catch (error) {
    console.error("Featured services error:", error);
    return [];
  }
}

// Featured Services Component
export default async function FeaturedServices() {
  const services = await getFeaturedServices();

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="font-semibold text-blue-600">
            FEATURED SERVICES
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Our Latest Repair Services
          </h2>

          <p className="mt-4 text-gray-600">
            Find trusted professionals for your home appliance repairs.
          </p>
        </div>

        {/* Service Cards */}
        {services.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No featured services available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => (
              <div
                key={service._id}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-xl"
              >

                {/* Service Image */}
                <div className="relative h-52 w-full shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Service Information */}
                <div className="flex flex-1 flex-col p-6">

                  <span className="text-sm font-semibold text-blue-600">
                    {service.category}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm text-gray-600">
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

                  {/* Price and Details Button */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t pt-5 mt-6">

                    <div>
                      <p className="text-xs text-gray-500">
                        Starting Price
                      </p>

                      <p className="text-xl font-bold text-blue-600">
                        ৳{service.startingPrice}
                      </p>
                    </div>

                    <Link
                      href={`/services/${service._id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Details
                    </Link>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* View All Services */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}
