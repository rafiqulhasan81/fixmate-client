
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddServicePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [serviceMode, setServiceMode] = useState("On-site");
  const [startingPrice, setStartingPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a service image");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("serviceMode", serviceMode);
    formData.append("startingPrice", startingPrice);

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/technician/services",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add service");
      }

      alert("Service added successfully!");

      router.push("/dashboard/technician/services");

    } catch (error) {
      console.error("Add service error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Service
        </h1>

        <p className="mt-2 text-gray-500">
          Provide details about your repair service.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block font-medium">Service Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Laptop Hardware Repair"
            required
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Category</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop & PC">Laptop & PC</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Television">Television</option>
            <option value="Air Conditioner">Air Conditioner</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your repair service..."
            required
            rows={4}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Service Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            required
            className="w-full rounded-lg border p-3"
          />

          {image && (
            <p className="mt-2 text-sm text-green-600">
              Selected image: {image.name}
            </p>
          )}

          <p className="mt-1 text-sm text-gray-500">
            Maximum image size: 5 MB
          </p>
        </div>

        <div>
          <label className="mb-2 block font-medium">Service Mode</label>

          <select
            value={serviceMode}
            onChange={(e) => setServiceMode(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="On-site">On-site</option>
            <option value="Pickup & Delivery">Pickup & Delivery</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Starting Price (৳)</label>

          <input
            type="number"
            min="1"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            placeholder="Example: 1200"
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Submit Service"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border px-6 py-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
