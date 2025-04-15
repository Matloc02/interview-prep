"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/client"; // adjust to your client-side auth import
import { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);        
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
