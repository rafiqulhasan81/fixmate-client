
// "use client";

// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const { data, error } = await authClient.signIn.email({
//         email,
//         password,
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       toast.success("Login successful!");
//       router.push("/");
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
//           Welcome Back
//         </h1>

//         <p className="text-gray-500 text-center mb-8">
//           Sign in to your FixMate account.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>

//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
//           >
//             Sign In
//           </button>

//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Create Account
//           </a>
//         </p>

//       </div>
//     </main>
//   );
// }


"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackURL") || "/";

  useEffect(() => {
    if (!isPending && session) {
      router.replace(callbackURL);
    }
  }, [session, isPending, callbackURL, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");
      router.replace(callbackURL);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending || session) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking your login...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Sign in to your FixMate account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Account
          </a>
        </p>
      </div>
    </main>
  );
}

