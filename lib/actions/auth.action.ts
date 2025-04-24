// lib/actions/auth.action.ts

"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SESSION_COOKIE_NAME = "ohlura_session";
const SESSION_DURATION = 60 * 60 * 24 * 7;

export async function signUp({ uid, name, email }: { uid: string; name: string; email: string }) {
  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("id", uid)
      .single();

    if (existingUser) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    const { error } = await supabase.from("users").insert({
      id: uid,
      name,
      email,
      profile_image_url: "/profile.svg",
      resume_url: "",
      created_at: new Date().toISOString(),
    });

    if (error) throw error;

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn({ email, idToken }: { email: string; idToken: string }) {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (error || !user) {
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, idToken, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return {
      success: true,
      message: "Logged in successfully.",
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
