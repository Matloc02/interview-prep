"use server";

import { createServerSupabaseClient } from "@/lib/supabase/session";
import { cookies } from "next/headers";
import { Interview, Feedback, GetFeedbackByInterviewIdParams, GetLatestInterviewsParams } from "@/types";

// Export the createInterview function
export const createInterview = async (data: {
  userId: string;
  jobTitle: string;
  jobDescription: string;
  duration: string;
  style: string;
  techstack: string[];
}) => {
  // Implementation of the function
  return { success: true }; // Example response
};

// Fetch feedback for a specific interview and user
export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  try {
    const cookieStore = cookies();
    const supabase = await createServerSupabaseClient(); // ✅

    const { interviewId, userId } = params;

    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .eq("interview_id", interviewId)
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle(); // 👈 prevents that error

    if (error || !data) {
      
      return null;
    }

    return data as Feedback;
  } catch (error) {
    console.error("🔥 Error in getFeedbackByInterviewId:", error);
    return null;
  }
}

// ✅ Add other existing exports below this as needed, like:
export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const cookieStore = cookies();
  const supabase = await createServerSupabaseClient(); // ✅


  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return null;
  return data as Interview[];
}
// ✅ Get latest finalized interviews for the current user
export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  try {
    const cookieStore = cookies();
    const supabase = await createServerSupabaseClient(); // ✅

    const { userId, limit = 20 } = params;

    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("user_id", userId)
      .eq("finalized", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.error("🔥 Error in getLatestInterviews:", error);
      return null;
    }

    return data as Interview[];
  } catch (error) {
    console.error("🔥 Exception in getLatestInterviews:", error);
    return null;
  }

}

export async function getSampleInterviews(): Promise<Interview[] | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await (await supabase)
    .from("interviews")
    .select("*")
    .eq("is_sample", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("🔥 Error fetching sample interviews:", error);
    return null;
  }

  return data as Interview[];
}