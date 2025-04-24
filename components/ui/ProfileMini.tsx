"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase/types";



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);

type ProfileMiniProps = {
  refreshSignal?: number; // trigger refetch when this number changes
};

const ProfileMini = ({ refreshSignal }: ProfileMiniProps) => {
  const [user, setUser] = useState<Database["public"]["Tables"]["users"]["Row"] | null>(null);

  const fetchUserProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) setUser(profile);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [refreshSignal]); // re-fetch on signal change

  if (!user) return null;

  return (
    <div>
      <Link href="/dashboard" className="cursor-pointer">
        <Image
          src={user.profile_image_url || "/profile.svg"}
          alt="Profile"
          width={56}
          height={56}
          className="rounded-full border border-purple-500 cursor-pointer hover:ring-2 hover:ring-purple-500"/>
      </Link>
      <Link href="/sample-interviews" className="text-sm font-medium hover:text-primary transition-colors">
        Sample Interviews
      </Link>
    </div>
  );
};

export default ProfileMini;
