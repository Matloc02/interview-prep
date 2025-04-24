"use client";

import { supabase } from "@/lib/supabase/client"; // adjust to your client-side supabase import
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Correctly using supabase client instance
    router.push("/sign-in");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-400 hover:text-red-600"
    >
      Sign Out
    </button>
  );
}
