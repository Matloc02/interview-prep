import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/supabase";

export async function getCurrentUserClient() {
  const supabase = createClientComponentClient<Database>();
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}
