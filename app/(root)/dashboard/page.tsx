import { getCurrentUser } from "@/lib/supabase/session";
import ProfileUploader from "@/components/dashboard/ProfileUploader";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <p>You must be signed in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

      <ProfileUploader
        userId={user.id}
        initialImage={user.profileImageURL || "/profile.svg"}
      />
    </div>
  );
}
