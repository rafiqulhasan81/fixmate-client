
"use client";

import Link from "next/link";
import {
  Wrench,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  UserRoundPen,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isLoggedIn = !!session?.user;

  const user = {
    name: session?.user?.name || "User",
    role: session?.user?.role || "Customer",
    image: session?.user?.image || "",
  };

  // Sign Out Function
  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        alert(error.message);
        return;
      }

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign Out Error:", error);
      alert("Sign out failed. Please try again.");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/about" },
  ];

  if (isPending) {
    return <div className="h-20" />;
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-blue-600 text-white p-2 rounded-lg">
              <Wrench size={24} />
            </span>

            <span className="text-2xl font-bold text-gray-900">
              FixMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-3">

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">

                {/* Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="font-medium text-gray-700">
                    {user.name}
                  </span>

                  <ChevronDown size={18} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-14 w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-3">

                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">
                        {user.name}
                      </p>

                      <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      href="/dashboard/customer"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <UserRoundPen size={18} />
                      Update Profile
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>

                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-5 space-y-4">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-medium transition ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-3 pt-2">

              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 text-center border border-gray-300 rounded-lg py-2"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 text-center bg-blue-600 text-white rounded-lg py-2"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard/customer"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 text-center bg-blue-600 text-white rounded-lg py-2"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex-1 border border-red-300 text-red-600 rounded-lg py-2"
                  >
                    Sign Out
                  </button>
                </>
              )}

            </div>
          </div>
        )}

      </nav>
    </header>
  );
};

export default Navbar;
