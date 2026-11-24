"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && (
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>
      )}

      {children}

      {!isDashboard && <Footer />}
    </>
  );
}