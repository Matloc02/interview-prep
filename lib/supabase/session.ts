// lib/supabase/session.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "./types";

export function createServerSupabaseClient() {
  const cookieStore = cookies(); // ✅ Only reading, this is allowed

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const cookieStore = await cookies(); // ✅ await here
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}


// ✅ Helper to get the full current user object from Supabase
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();

  const { data: { user } ,error, } = await supabase.auth.getUser();

  if (!user || error) return null;

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || profileError) return null;

  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    profileImageURL: profile.profile_image_url,
    resumeURL: profile.resume_url,
    phone: profile.phone,
    website: profile.website,
  };
}
