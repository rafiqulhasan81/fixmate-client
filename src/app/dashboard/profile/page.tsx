
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
      setPhone(
        (session.user as typeof session.user & { phone?: string }).phone || ""
      );
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { error } = await authClient.updateUser({
  name: name.trim(),
  image: image.trim() || undefined,
  phone: phone.trim(),
});

      if (error) {
        throw new Error(error.message || "Profile update failed");
      }

      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">Please login first.</h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-gray-600">
            View and manage your account information.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">

          {/* Profile Image */}
          <div className="mb-8 flex flex-col items-center">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="h-28 w-28 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-700">
                {name.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {session.user.name}
            </h2>

            <p className="text-sm text-gray-500">
              {session.user.email}
            </p>

            <span className="mt-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold capitalize text-blue-700">
              {session.user.role || "Customer"}
            </span>
          </div>

          <div className="border-t pt-7">

            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Edit Profile Information
            </h3>

            {message && (
              <div className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={session.user.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-3 text-gray-500"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Email address cannot be changed here.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Profile Image URL
                </label>

                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
