"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/client";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("Check your inbox for reset instructions.");
    } catch (err) {
      setStatus("Failed to send reset email.");
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
          Forgot your password?{" "}
          <Link href="/forgot-password" className="text-purple-400 hover:underline">
            Reset it here
          </Link>
        </p>

        <p className="text-sm mt-4 text-purple-300">{status}</p>
      </div>
    </div>
  );
}
