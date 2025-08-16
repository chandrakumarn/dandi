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
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
