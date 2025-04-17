import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/supabase/session"; // ✅ Supabase session check
import ProfileMini from "@/components/ui/ProfileMini";
import LogoutButton from "@/components/ui/LogoutButton";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser(); // Supabase user check

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="OhLura Logo"
            width={38}
            height={32}
            className="rounded-full border border-purple-500 cursor-pointer hover:ring-2 hover:ring-purple-500"
          />
          <h2 className="text-primary-100">OhLura</h2>
        </Link>

        {/* Top-right profile + logout */}
        <div className="flex items-center gap-3">
          <ProfileMini />
          <LogoutButton />
        </div>
      </nav>

      <p className="text-gray-300 mb-6">
        "From anxious to awesome — interview prep that works".
      </p>

      {children}
    </div>
  );
};

export default Layout;
