
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

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
          `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load service");
        }

        setTitle(data.title || "");
        setCategory(data.category || "");
        setDescription(data.description || "");
        setCurrentImage(data.image || "");
        setServiceMode(data.serviceMode || "On-site");
        setStartingPrice(String(data.startingPrice ?? ""));
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // নতুন ছবি নির্বাচন করা
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setNewImage(file);
    }
  };

  // Preview-এর জন্য ছবির URL
  const imagePreview = newImage
    ? URL.createObjectURL(newImage)
    : currentImage;

  // Service Update করা
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("serviceMode", serviceMode);
      formData.append("startingPrice", startingPrice);

      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await fetch(
        `http://localhost:5000/api/technician/services/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update service");
      }

      toast.success("Service updated successfully!");

      router.push("/dashboard/technician/services");
      router.refresh();

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      setError(message);
      toast.error(message);

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="p-6">
        Loading service information...
      </p>
    );
  }

  if (error && !title) {
    return (
      <p className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Service
        </h1>

        <p className="mt-2 text-gray-500">
          Update your repair service information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
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

        <div>
          <label className="mb-2 block font-medium">
            Service Image
          </label>

          {imagePreview && (
            <div className="mb-3">
              <img
                src={imagePreview}
                alt="Service Preview"
                className="h-48 w-full rounded-lg border object-cover"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-lg border px-4 py-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            Select a new image only if you want to replace the current one.
          </p>
        </div>

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

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

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
