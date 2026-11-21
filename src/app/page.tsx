
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

// Backend API থেকে Service Data সংগ্রহ
async function getFeaturedServices(): Promise<Service[]> {
  try {
    const response = await fetch(
      "http://localhost:5000/api/services/featured",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    return await response.json();
  } catch (error) {
    console.error("Featured services error:", error);
    return [];
  }
}

// Featured Services Component
async function FeaturedServices() {
  // এই অংশটি Next.js-কে জানায় যে এখানে Dynamic Data প্রয়োজন
  await connection();

  const services = await getFeaturedServices();

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold">
            OUR SERVICES
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Featured Services
          </h2>

          <p className="text-gray-600 mt-4">
            Find the right repair service for your devices and appliances.
          </p>
        </div>

        {/* Service Cards */}
        {services.length === 0 ? (
          <p className="text-center text-gray-500">
            No services available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service) => (
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

                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {service.title}
                  </h3>

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
                      href="/services"
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

// Homepage
export default function Home() {
  return (
    <main className="bg-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Trusted Repair Service Platform
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Broken Device?
              <br />
              <span className="text-blue-600">Get It Fixed</span>{" "}
              by Verified Technicians
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Find trusted technicians to repair your home appliances
              and electronic devices. Quality service, reliable support
              and hassle-free repairs with FixMate.
            </p>

            <Link
              href="/services"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition duration-300"
            >
              Explore Services →
            </Link>
          </div>

          <div className="relative w-full">
            <Image
              src="/hero-repair.png"
              alt="Technician repairing electronic devices"
              width={600}
              height={500}
              priority
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* Featured Services with Suspense */}
      <Suspense
        fallback={
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-600">
                Loading featured services...
              </p>
            </div>
          </section>
        }
      >
        <FeaturedServices />
      </Suspense>


{/* How FixMate Works Section */}
<section className="bg-white py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center mb-14">
      <span className="text-blue-600 font-semibold">
        SIMPLE PROCESS
      </span>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
        How FixMate Works
      </h2>

      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Getting your device repaired is simple.
        Follow these four easy steps.
      </p>
    </div>

    {/* Four Steps */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Step 1 */}
      <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl">
          🔍
        </div>

        <p className="text-blue-600 font-bold mt-5">
          STEP 01
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-2">
          Find a Service
        </h3>

        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          Browse our repair services and choose the right one for your device.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl">
          📝
        </div>

        <p className="text-blue-600 font-bold mt-5">
          STEP 02
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-2">
          Send a Request
        </h3>

        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          Submit your repair request with your contact details and problem description.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl">
          🛠️
        </div>

        <p className="text-blue-600 font-bold mt-5">
          STEP 03
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-2">
          Technician Fixes It
        </h3>

        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          A skilled technician works on your device and completes the repair.
        </p>
      </div>

      {/* Step 4 */}
      <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-3xl">
          💳
        </div>

        <p className="text-blue-600 font-bold mt-5">
          STEP 04
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-2">
          Pay After Completion
        </h3>

        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          Pay securely online only after your repair job is completed.
        </p>
      </div>

    </div>
  </div>
</section>


{/* Popular Categories Section */}
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center mb-14">
      <span className="text-blue-600 font-semibold">
        EXPLORE CATEGORIES
      </span>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
        Popular Categories
      </h2>

      <p className="text-gray-600 mt-4">
        Find the right expert for your device and home appliances.
      </p>
    </div>

    {/* Category Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

      {/* Smartphone */}
      <Link href="/services?category=Smartphone"
        className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
        <div className="text-4xl mb-4">📱</div>
        <h3 className="font-bold text-gray-900">Smartphone</h3>
        <p className="text-sm text-blue-600 mt-2">Explore Services →</p>
      </Link>

      {/* Laptop & PC */}
      <Link href="/services?category=Laptop%20%26%20PC"
        className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
        <div className="text-4xl mb-4">💻</div>
        <h3 className="font-bold text-gray-900">Laptop & PC</h3>
        <p className="text-sm text-blue-600 mt-2">Explore Services →</p>
      </Link>

      {/* AC */}
      <Link href="/services?category=AC"
        className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
        <div className="text-4xl mb-4">❄️</div>
        <h3 className="font-bold text-gray-900">AC</h3>
        <p className="text-sm text-blue-600 mt-2">Explore Services →</p>
      </Link>

      {/* Refrigerator */}
      <Link href="/services?category=Refrigerator"
        className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
        <div className="text-4xl mb-4">🧊</div>
        <h3 className="font-bold text-gray-900">Refrigerator</h3>
        <p className="text-sm text-blue-600 mt-2">Explore Services →</p>
      </Link>

      {/* TV */}
      <Link href="/services?category=TV"
        className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
        <div className="text-4xl mb-4">📺</div>
        <h3 className="font-bold text-gray-900">TV</h3>
        <p className="text-sm text-blue-600 mt-2">Explore Services →</p>
      </Link>

      {/* Washing Machine */}
      <Link href="/services?category=Washing%20Machine"
        className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
        <div className="text-4xl mb-4">🧺</div>
        <h3 className="font-bold text-gray-900">Washing Machine</h3>
        <p className="text-sm text-blue-600 mt-2">Explore Services →</p>
      </Link>

      {/* Electrical */}
      <Link href="/services?category=Electrical"
        className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="font-bold text-gray-900">Electrical</h3>
        <p className="text-sm text-blue-600 mt-2">Explore Services →</p>
      </Link>

    </div>
  </div>
</section>


{/* Why Choose FixMate Section */}
<section className="bg-white py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center mb-14">
      <span className="text-blue-600 font-semibold">
        WHY CHOOSE US
      </span>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
        Why Choose FixMate?
      </h2>

      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        We make device and home appliance repair simple,
        safe and convenient for everyone.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div className="bg-blue-50 p-8 rounded-2xl text-center hover:shadow-lg transition">
        <div className="text-5xl mb-5">🛡️</div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Verified Technicians
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Connect with trusted and verified technicians
          who are ready to take care of your devices.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-blue-50 p-8 rounded-2xl text-center hover:shadow-lg transition">
        <div className="text-5xl mb-5">🔧</div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Reliable Repair Service
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Get dependable repair services for your
          smartphones, computers and home appliances.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-blue-50 p-8 rounded-2xl text-center hover:shadow-lg transition">
        <div className="text-5xl mb-5">💳</div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Pay After Completion
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Pay for your service after the technician
          completes the repair work.
        </p>
      </div>

    </div>
  </div>
</section>


    </main>
  );
}
