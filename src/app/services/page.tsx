
import { Suspense } from "react";
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

interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    serviceMode?: string;
    sort?: string;
  }>;
}

// Get All Services from Backend API
async function getAllServices(params: {
  search: string;
  category: string;
  serviceMode: string;
  sort: string;
}): Promise<Service[]> {
  try {
    const queryString = new URLSearchParams();

    if (params.search) queryString.set("search", params.search);
    if (params.category) queryString.set("category", params.category);
    if (params.serviceMode) {
      queryString.set("serviceMode", params.serviceMode);
    }
    if (params.sort) queryString.set("sort", params.sort);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const response = await fetch(
      `${apiUrl}/api/services?${queryString.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await response.json();

    return data.services || [];
  } catch (error) {
    console.error("All services error:", error);
    return [];
  }
}

// Services Content
async function ServicesContent({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;

  const search =
    typeof params.search === "string" ? params.search : "";

  const category =
    typeof params.category === "string" ? params.category : "";

  const serviceMode =
    typeof params.serviceMode === "string"
      ? params.serviceMode
      : "";

  const sort =
    typeof params.sort === "string" ? params.sort : "newest";

  // Fetch filtered and sorted services from MongoDB
  const services = await getAllServices({
    search,
    category,
    serviceMode,
    sort,
  });

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <span className="font-semibold text-blue-600">
            OUR SERVICES
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            {category
              ? `${category} Repair Services`
              : "All Repair Services"}
          </h1>

          <p className="mt-4 text-gray-600">
            Find the right repair service for your devices and appliances.
          </p>
        </div>

        {/* Search, Filter and Sort Form */}
        <form
          action="/services"
          method="GET"
          className="mb-10 grid grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow md:grid-cols-2 lg:grid-cols-5"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search services..."
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="category"
            defaultValue={category}
            placeholder="Category"
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="serviceMode"
            defaultValue={serviceMode}
            placeholder="Service Mode"
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            name="sort"
            defaultValue={sort}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Search & Filter
          </button>
        </form>

        {/* Service Cards */}
        {services.length === 0 ? (
          <p className="rounded-xl bg-white py-10 text-center text-gray-500 shadow">
            No services found. Try changing your search or filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-xl"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  unoptimized
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <span className="text-sm font-semibold text-blue-600">
                    {service.category}
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">
                    {service.title}
                  </h2>

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

                  <div className="mt-6 flex items-center justify-between gap-3 border-t pt-4">
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
      </div>
    </main>
  );
}

// Browse Services Page
export default function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-20 text-center text-gray-600">
          Loading services...
        </div>
      }
    >
      <ServicesContent searchParams={searchParams} />
    </Suspense>
  );
}
