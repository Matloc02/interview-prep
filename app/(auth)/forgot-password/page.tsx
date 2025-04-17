"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setStatus("Failed to send reset email.");
    } else {
      setStatus("Check your inbox for reset instructions.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <div className="bg-neutral-800 p-8 rounded-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg"
        >
          Send Reset Link
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Need to go back?{" "}
          <Link href="/sign-in" className="text-purple-400 hover:underline">
            Sign in instead
          </Link>
        </p>

        <p className="text-sm mt-4 text-purple-300">{status}</p>
      </div>
    </div>
  );
}
