"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Home, UserRound } from "lucide-react";

export default function DashboardTopbar() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const name = user?.name || "User";
  const role = user?.role || "customer";
  const image = user?.image;

  const formattedRole =
    role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        {!isPending && (
          <div className="flex items-center gap-3">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <UserRound size={22} />
              </div>
            )}

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {name}
              </p>
              <p className="text-xs text-gray-500">
                {formattedRole}
              </p>
            </div>
          </div>
        )}

        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Home size={17} />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>
    </header>
  );
}