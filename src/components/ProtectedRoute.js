"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If authentication check is complete and user is not signed in
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render children (will redirect)
  if (status === "unauthenticated") {
    return null;
  }

  // If authenticated, render the protected content
  return children;
}

