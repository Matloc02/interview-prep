"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SignOutPage() {
  useEffect(() => {
    const run = async () => {
      await supabase.auth.signOut(); // Supabase logout
      window.location.href = "/api/sign-out"; // still clears cookies + redirects if needed
    };
    run();
  }, []);

  return (
    <div className="text-white text-center mt-20">
      Signing you out...
    </div>
  );
}
