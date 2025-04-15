"use client";

import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/client";

export default function SignOutPage() {
  useEffect(() => {
    const run = async () => {
      await signOut(auth); // clear client session
      window.location.href = "/api/sign-out"; // clears cookie + redirects
    };
    run();
  }, []);

  return (
    <div className="text-white text-center mt-20">
      Signing you out...
    </div>
  );
}
