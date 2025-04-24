// app/(root)/dashboard/page.tsx

import { getCurrentUser } from "@/lib/supabase/session";
import ProfileUploader from "@/components/dashboard/ProfileUploader";
import UpdateContactForm from "@/components/dashboard/UpdateContactForm";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-8 text-center text-red-500">
        ❌ You must be signed in to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8 text-white">
      <h1 className="text-2xl font-bold">Welcome, {user.name || "User"} 👋</h1>

      <ProfileUploader
        userId={user.id}
        initialImage={user.profileImageURL || "/profile.svg"}
        initialName={user.name || ""}
        initialEmail={user.email || ""}
        initialPhone={user.phone || ""}
        initialWebsite={user.website || ""}
        initialResumeUrl={user.resumeURL || ""}
      />

      
    </div>
  );
}
