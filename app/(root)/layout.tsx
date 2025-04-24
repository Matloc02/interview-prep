import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/session";
import ProfileMini from "@/components/ui/ProfileMini";
import LogoutButton from "@/components/ui/LogoutButton";
import { ThemeToggle } from "@/components/ui/theme-provider";



// Export the getFeedbackByInterviewId function
export const getFeedbackByInterviewId = async ({ interviewId, userId }: { interviewId: string; userId: string }) => {
  // Implementation of the function
};
// Removed duplicate declaration of getCurrentUser
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
            width={56}
            height={56}
            className="rounded-full border border-purple-500 cursor-pointer hover:ring-2 hover:ring-purple-500"
          />
          <h2 className="max-w-4xl mx-auto p-1 text-primary-100">OhLura</h2>
          </Link>
          <h3 className="text-gray-300 mb-2">
          "From anxious to awesome — interview prep that works".
          </h3>

        {/* Top-right profile + logout */}
        <div className="flex items-center gap-3">
          <ProfileMini />
          <LogoutButton />
          <ThemeToggle/>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout; //main page
