
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [role, setRole] = useState<"customer" | "technician">("customer");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     if (password.length < 8) {
//       toast.error("Password must be at least 8 characters!");
//       return;
//     }

//     try {
//       const { data, error } = await authClient.signUp.email({
//         name,
//         email,
//         password,
//         phone,
//         role,
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       toast.success("Registration successful!");

//       console.log(data);

//       router.push("/login");

//     } catch (error) {
//       console.error("Registration error:", error);
//       toast.error("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
//           Create Account
//         </h1>

//         <p className="text-gray-500 text-center mb-8">
//           Join FixMate and get your devices repaired.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name
//             </label>

//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>

//             <input
//               type="email"
//               placeholder="Enter your email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number
//             </label>

//             <input
//               type="tel"
//               placeholder="Enter your phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Role Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Register As
//             </label>

//             <select
//               value={role}
//               onChange={(e) =>
//                 setRole(e.target.value as "customer" | "technician")
//               }
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             >
//               <option value="customer">Customer</option>
//               <option value="technician">Technician</option>
//             </select>

//             <p className="text-xs text-gray-500 mt-2">
//               Choose Customer to request services or Technician to provide services.
//             </p>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
//           >
//             Create Account
//           </button>

//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>

//       </div>

//     </main>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // যে পেজে ফিরে যেতে হবে
  const callbackURL = searchParams.get("callbackURL") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"customer" | "technician">("customer");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        phone,
        role,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Registration successful!");

      console.log(data);

      // Signup সফল হলে নির্দিষ্ট পেজে ফিরে যাবে
      router.replace(callbackURL);
      router.refresh();

    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Join FixMate and get your devices repaired.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Register As
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "customer" | "technician")
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="customer">Customer</option>
              <option value="technician">Technician</option>
            </select>

            <p className="text-xs text-gray-500 mt-2">
              Choose Customer to request services or Technician to provide
              services.
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href={`/login?callbackURL=${encodeURIComponent(callbackURL)}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}

