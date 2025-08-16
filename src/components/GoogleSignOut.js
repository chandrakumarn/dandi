"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function GoogleSignOut() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      
      // Sign out and redirect to home page
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      console.error("Sign-out error:", err);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-xs sm:text-sm min-h-[44px]"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
