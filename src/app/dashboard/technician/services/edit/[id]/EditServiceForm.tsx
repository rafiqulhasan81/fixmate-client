
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();

  // URL থেকে Service ID সংগ্রহ
  const id = params.id as string;

  // Form-এর জন্য State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [serviceMode, setServiceMode] = useState("On-site");
  const [startingPrice, setStartingPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // পুরোনো Service তথ্য নিয়ে আসা
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/services/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load service");
        }

        // পুরোনো তথ্য Form-এ বসানো
        setTitle(data.title || "");
        setCategory(data.category || "");
        setDescription(data.description || "");
        setImage(data.image || "");
        setServiceMode(data.serviceMode || "On-site");
        setStartingPrice(String(data.startingPrice ?? ""));

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // Service Update করা
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/technician/services/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            category,
            description,
            image,
            serviceMode,
            startingPrice,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update service");
      }

      alert("Service updated successfully!");

      router.push("/dashboard/technician/services");
      router.refresh();

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading অবস্থায়
  if (loading) {
    return (
      <p className="p-6">
        Loading service information...
      </p>
    );
  }

  // Service লোড করতে সমস্যা হলে
  if (error && !title) {
    return (
      <p className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Service
        </h1>

        <p className="mt-2 text-gray-500">
          Update your repair service information.
        </p>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >

        {/* Service Title */}
        <div>
          <label className="mb-2 block font-medium">
            Service Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Laptop & PC">Laptop & PC</option>
            <option value="Mobile & Tablet">Mobile & Tablet</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="TV & Electronics">TV & Electronics</option>
            <option value="AC & Cooling">AC & Cooling</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Service Image URL */}
        <div>
          <label className="mb-2 block font-medium">
            Service Image URL
          </label>

          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Service Mode */}
        <div>
          <label className="mb-2 block font-medium">
            Service Mode
          </label>

          <select
            value={serviceMode}
            onChange={(e) => setServiceMode(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="On-site">On-site</option>
            <option value="In-shop">In-shop</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Starting Price */}
        <div>
          <label className="mb-2 block font-medium">
            Starting Price (৳)
          </label>

          <input
            type="number"
            min="1"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Service"}
          </button>

          <button
            type="button"
            onClick={() =>
              router.push("/dashboard/technician/services")
            }
            className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-100"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
}
