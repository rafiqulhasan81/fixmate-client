"use client";

import Link from "next/link";
import {
  Search,
  CalendarCheck,
  Wrench,
  CreditCard,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find a Service",
    description:
      "Browse available home repair services and choose the service that matches your needs.",
    icon: Search,
  },
  {
    number: "02",
    title: "Book a Service",
    description:
      "Select your preferred service, provide the necessary details, and submit your booking request.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Get Connected",
    description:
      "A professional technician will receive your request and handle your repair job.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Complete Payment",
    description:
      "After your job is completed, make your payment securely through the platform.",
    icon: CreditCard,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 px-4 py-20 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">
          How FixMate Works
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-blue-100">
          Getting home repair services is simple with FixMate.
          Follow a few easy steps to connect with professional technicians.
        </p>
      </section>

      {/* Steps Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Four Simple Steps
          </h2>

          <p className="mt-3 text-gray-600">
            From finding a service to completing your repair.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Icon size={28} />
                </div>

                <p className="mt-6 text-sm font-bold text-blue-600">
                  STEP {step.number}
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose FixMate?
          </h2>

          <div className="mt-8 grid gap-5 text-left sm:grid-cols-2">
            {[
              "Easy service booking",
              "Professional technicians",
              "Convenient booking management",
              "Secure online payments",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="shrink-0 text-green-600" />
                <span className="font-medium text-gray-700">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Get Started?
        </h2>

        <p className="mt-3 text-gray-600">
          Find the right repair service for your home today.
        </p>

        <Link
          href="/services"
          className="mt-7 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Explore Services
        </Link>
      </section>
    </main>
  );
}