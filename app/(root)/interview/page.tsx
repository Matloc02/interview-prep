import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/supabase/session";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <p>You must be signed in to access interview generation.</p>
      </div>
    );
  }

  return (
    <>
      <h3>Interview generation page</h3>

      <Agent
        userName={user.name}
        userId={user.id}
        profileImage={"/profile.svg"}
        type="generate"
      />
    </>
  );
};

export default Page;
