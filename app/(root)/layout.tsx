import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";
import ProfileMini from "@/components/ui/ProfileMini";
import LogoutButton from "@/components/ui/LogoutButton"; // Import LogoutButton

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} 
          className="rounded-full border border-purple-500 cursor-pointer hover:ring-2 hover:ring-purple-500"
          />

          <h2 className="text-primary-100">OhLura</h2>
        </Link>
        
        {/* Profile image added to top right */}
        <ProfileMini /><LogoutButton />
      </nav>
      
      <p className="text-gray-300 mb-6">"From anxious to awesome — interview prep that works".</p>

      {children}
    </div>
  );
};

export default Layout;
